import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFundamentalData, getHistoricalData } from '../api/yahooFinance';
import { calculateGrahamValue } from '../models/graham';
import { calculatePEBasedValue } from '../models/peRatio';
import { calculatePBBasedValue } from '../models/pbRatio';
import { calculateROEBasedValue } from '../models/roeModel';
import { calculateDividendDiscountValue } from '../models/dividendDiscount';
import { calculateDCFValue } from '../models/dcf';
import { calculateProfitabilityScore } from '../scoring/profitabilityScore';
import { calculateFinancialHealthScore } from '../scoring/financialHealthScore';
import { calculateDividendScore } from '../scoring/dividendScore';
import { calculateOverallScore } from '../scoring/overallScore';
import { getSectorBeta, getSectorPE, getSectorPB } from '../utils/sectorData';
import ValuationReport from '../components/ValuationReport';
import QualityReport from '../components/QualityReport';
import '../styles/fundamentalAnalysis.css';

const FundamentalAnalysis = () => {
  const { ticker } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [valuationData, setValuationData] = useState(null);
  const [qualityData, setQualityData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar dados fundamentalistas
        const fundamentalData = await getFundamentalData(ticker);
        
        // Buscar dados históricos
        const historicalData = await getHistoricalData(ticker);
        
        // Combinar os dados
        const stockData = {
          ticker,
          name: fundamentalData.basicInfo.longName || fundamentalData.basicInfo.shortName,
          sector: fundamentalData.basicInfo.sector || 'Não classificado',
          currentPrice: fundamentalData.basicInfo.regularMarketPrice,
          eps: fundamentalData.financials.defaultKeyStatistics.trailingEps || 1,
          bookValue: fundamentalData.financials.defaultKeyStatistics.bookValue || 1,
          roe: (fundamentalData.financials.financialData.returnOnEquity || 0.1) * 100,
          roic: (fundamentalData.financials.financialData.returnOnAssets || 0.05) * 100 * 1.5, // Aproximação
          netMargin: (fundamentalData.financials.financialData.profitMargins || 0.05) * 100,
          debtToEquity: fundamentalData.financials.financialData.debtToEquity || 1,
          currentRatio: fundamentalData.financials.financialData.currentRatio || 1,
          dividendYield: (fundamentalData.financials.defaultKeyStatistics.dividendYield || 0.02) * 100,
          payoutRatio: (fundamentalData.financials.defaultKeyStatistics.payoutRatio || 0.3) * 100,
          // Outros dados necessários
        };
        
        setStockData(stockData);
        
        // Calcular dados de valuation
        const sectorPE = getSectorPE(stockData.sector);
        const sectorPB = getSectorPB(stockData.sector);
        const sectorBeta = getSectorBeta(stockData.sector);
        
        // Taxa livre de risco (Selic)
        const riskFreeRate = 10.5; // Ajustar conforme necessário
        
        // Prêmio de risco de mercado
        const marketRiskPremium = 5.0;
        
        // Custo de capital próprio (CAPM)
        const costOfEquity = riskFreeRate + sectorBeta * marketRiskPremium;
        
        // Estimativa de crescimento
        const growthRate = Math.min(stockData.roe * (1 - stockData.payoutRatio / 100) / 100, 0.15);
        
        // Calcular valores justos usando diferentes modelos
        const grahamValue = calculateGrahamValue(stockData.eps, stockData.bookValue, growthRate);
        const peValue = calculatePEBasedValue(stockData.eps, sectorPE);
        const pbValue = calculatePBBasedValue(stockData.bookValue, sectorPB);
        const roeValue = calculateROEBasedValue(stockData.bookValue, stockData.roe / 100, costOfEquity / 100);
        
        // Estimativa de dividendo atual
        const currentDividend = stockData.currentPrice * (stockData.dividendYield / 100);
        
        const dividendValue = calculateDividendDiscountValue(
          currentDividend,
          growthRate,
          costOfEquity / 100
        );
        
        // Simplificação para DCF (na prática, precisaríamos de projeções detalhadas)
        // Aqui estamos usando uma abordagem simplificada
        const cashFlows = [
          fundamentalData.financials.cashflowStatementHistory?.cashflowStatements[0]?.totalCashFromOperatingActivities * 0.7 || stockData.eps * 1.5,
          (fundamentalData.financials.cashflowStatementHistory?.cashflowStatements[0]?.totalCashFromOperatingActivities * 0.7 || stockData.eps * 1.5) * (1 + growthRate),
          (fundamentalData.financials.cashflowStatementHistory?.cashflowStatements[0]?.totalCashFromOperatingActivities * 0.7 || stockData.eps * 1.5) * Math.pow(1 + growthRate, 2),
          (fundamentalData.financials.cashflowStatementHistory?.cashflowStatements[0]?.totalCashFromOperatingActivities * 0.7 || stockData.eps * 1.5) * Math.pow(1 + growthRate, 3),
          (fundamentalData.financials.cashflowStatementHistory?.cashflowStatements[0]?.totalCashFromOperatingActivities * 0.7 || stockData.eps * 1.5) * Math.pow(1 + growthRate, 4)
        ];
        
        // Valor terminal (Gordon Growth)
        const terminalValue = cashFlows[4] * (1 + growthRate) / (costOfEquity / 100 - growthRate);
        
        // WACC simplificado (na prática, precisaríamos calcular com mais detalhes)
        const wacc = costOfEquity / 100 * 0.7 + (riskFreeRate / 100) * 0.3 * 0.66; // Assumindo 30% de dívida e 34% de imposto
        
        const dcfValue = calculateDCFValue(cashFlows, terminalValue, wacc);
        
        const valuationData = {
          grahamValue,
          peValue,
          pbValue,
          roeValue,
          dividendValue,
          dcfValue,
          currentPrice: stockData.currentPrice
        };
        
        setValuationData(valuationData);
        
        // Calcular scores de qualidade
        const profitabilityScore = calculateProfitabilityScore(
          stockData.roe,
          stockData.roic,
          stockData.netMargin
        );
        
        const financialHealthScore = calculateFinancialHealthScore(
          stockData.debtToEquity,
          stockData.currentRatio
        );
        
        // Estimativa de crescimento de dividendos
        const dividendGrowth = growthRate * 100;
        
        const dividendScore = calculateDividendScore(
          stockData.dividendYield,
          stockData.payoutRatio,
          dividendGrowth
        );
        
        const overallScore = calculateOverallScore(
          profitabilityScore,
          financialHealthScore,
          dividendScore
        );
        
        const qualityData = {
          profitabilityScore,
          financialHealthScore,
          dividendScore,
          overallScore
        };
        
        setQualityData(qualityData);
        
      } catch (error) {
        console.error('Erro ao analisar ação:', error);
        setError('Não foi possível carregar os dados para análise fundamentalista.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [ticker]);
  
  if (loading) return <div>Carregando análise fundamentalista...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!stockData) return <div>Nenhum dado disponível para análise.</div>;
  
  return (
    <div className="fundamental-analysis-page">
      <h1>Análise Fundamentalista: {stockData.ticker} - {stockData.name}</h1>
      
      <div className="analysis-tabs">
        <div className="tab-content">
          <ValuationReport stock={stockData} valuationData={valuationData} />
          <QualityReport stock={stockData} qualityData={qualityData} />
        </div>
      </div>
    </div>
  );
};

export default FundamentalAnalysis;
