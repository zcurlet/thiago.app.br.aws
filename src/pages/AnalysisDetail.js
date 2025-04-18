import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFundamentalData } from '../api/yahooFinance';

const AnalysisPage = () => {
  const { symbol } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fundamentalData, setFundamentalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;
      
      try {
        setLoading(true);
        setError(null);
        
        console.log('Buscando dados para o símbolo:', symbol);
        
        // Buscar dados fundamentalistas
        const data = await getFundamentalData(symbol);
        console.log('Dados fundamentalistas recebidos:', data);
        setFundamentalData(data);
        
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Não foi possível carregar os dados para análise fundamentalista.');
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) return <div>Carregando dados...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!fundamentalData) return <div>Nenhum dado disponível</div>;

  // Renderizar os dados fundamentalistas
  return (
    <div className="analysis-page">
      <h1>Análise de {symbol}</h1>
      
      <div className="stock-info">
        <h2>Informações Básicas</h2>
        <p>Preço Atual: R$ {fundamentalData.basicInfo.regularMarketPrice.toFixed(2)}</p>
        <p>Nome: {fundamentalData.basicInfo.longName}</p>
        {/* Adicione mais informações conforme necessário */}
      </div>
      
      {/* Adicione aqui os componentes para exibir a análise fundamentalista */}
    </div>
  );
};

export default AnalysisPage;
