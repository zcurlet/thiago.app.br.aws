import axios from 'axios';

// Função para obter preço da ação (usando proxy CORS)
export const getStockPrice = async (symbol) => {
  try {
    // Adicionar 'SA' para ações brasileiras no Yahoo Finance se não estiver presente
    const brTicker = symbol.endsWith('.SA') ? symbol : `${symbol}.SA`;
    
    // Usando o proxy CORS.io que é mais confiável
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${brTicker}?region=BR&interval=1d&range=1mo`;
    
    console.log('Buscando dados para:', brTicker) ;
    console.log('URL completa:', corsProxy + encodeURIComponent(yahooUrl));
    
    const response = await axios.get(corsProxy + encodeURIComponent(yahooUrl));
    
    console.log('Resposta recebida:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter preço da ação:', error);
    console.error('Detalhes do erro:', error.response ? error.response.data : 'Sem detalhes');
    throw error;
  }
};
