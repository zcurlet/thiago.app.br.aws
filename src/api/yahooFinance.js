import { API } from 'aws-amplify';

// Função para buscar dados fundamentalistas
export const getFundamentalData = async (ticker) => {
  try {
    console.log('Buscando dados fundamentalistas para:', ticker);
    
    // Buscar dados básicos da empresa
    const stockInfoResponse = await API.get('yahooFinanceApi', '/finance', {
      queryStringParameters: {
        symbol: ticker,
        endpoint: 'quote'
      }
    });
    
    // Buscar dados financeiros detalhados
    const financialDataResponse = await API.get('yahooFinanceApi', '/finance', {
      queryStringParameters: {
        symbol: ticker,
        endpoint: 'summary'
      }
    });
    
    console.log('Dados básicos recebidos:', stockInfoResponse);
    console.log('Dados financeiros recebidos:', financialDataResponse);
    
    return {
      basicInfo: stockInfoResponse.quoteResponse.result[0],
      financials: financialDataResponse.quoteSummary.result[0]
    };
  } catch (error) {
    console.error('Erro ao buscar dados fundamentalistas:', error);
    throw error;
  }
};

// Função para buscar dados históricos
export const getHistoricalData = async (ticker, period = '5y', interval = '1mo') => {
  try {
    console.log('Buscando dados históricos para:', ticker);
    
    const response = await API.get('yahooFinanceApi', '/finance', {
      queryStringParameters: {
        symbol: ticker,
        endpoint: 'chart',
        period: period,
        interval: interval
      }
    });
    
    console.log('Dados históricos recebidos:', response);
    return response;
  } catch (error) {
    console.error('Erro ao buscar dados históricos:', error);
    throw error;
  }
};
