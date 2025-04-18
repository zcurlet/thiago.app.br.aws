import { API } from 'aws-amplify';

export const getStockData = async (symbol) => {
  try {
    const response = await API.get('financeApi', '/finance', {
      queryStringParameters: {
        symbol: symbol,
        region: 'BR',
        interval: '1d',
        range: '1mo'
      }
    });
    
    return response;
  } catch (error) {
    console.error('Erro ao obter dados da ação:', error);
    throw error;
  }
};

// Adicione outras funções conforme necessário para diferentes tipos de dados financeiros
