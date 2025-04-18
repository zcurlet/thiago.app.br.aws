// src/models/adaptedModels.js
import { calculateDCFValue } from './dcf';
import { calculateDividendDiscountValue } from './dividendDiscount';
import { getStockPrice } from '../api/stockService';

// Função para calcular DCF com dados da API
export const calculateDCFWithAPI = async (symbol, customParams = {}) => {
    try {
        // Obter dados da API
        const stockData = await getStockPrice(symbol);
        
        // Extrair preço atual (pode ser usado para validação)
        const currentPrice = stockData.chart.result[0].meta.regularMarketPrice;
        
        // Usar parâmetros personalizados ou valores padrão
        const cashFlows = customParams.cashFlows || [100, 110, 121, 133, 146]; // Exemplo
        const terminalValue = customParams.terminalValue || 2000; // Exemplo
        const wacc = customParams.wacc || 0.1; // 10% como exemplo
        
        // Calcular usando o modelo DCF existente
        const fairValue = calculateDCFValue(cashFlows, terminalValue, wacc);
        
        return {
            symbol,
            currentPrice,
            fairValue,
            difference: fairValue - currentPrice,
            percentageDifference: ((fairValue - currentPrice) / currentPrice) * 100
        };
    } catch (error) {
        console.error('Erro ao calcular DCF:', error);
        throw error;
    }
};

// Adicione adaptadores para outros modelos conforme necessário
