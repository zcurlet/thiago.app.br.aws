import { API } from 'aws-amplify';

// Função para obter preço da ação
export const getStockPrice = async (symbol) => {
  try {
    console.log('Buscando preço para:', symbol);
    
    const response = await API.get('yahooFinanceApi', '/finance', {
      queryStringParameters: {
        symbol: symbol,
        endpoint: 'chart',
        period: '1mo',
        interval: '1d'
      }
    });
    
    console.log('Dados de preço recebidos:', response);
    return response;
  } catch (error) {
    console.error('Erro ao obter preço da ação:', error);
    throw error;
  }
};
