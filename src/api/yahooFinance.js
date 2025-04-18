import axios from 'axios';

// Função para buscar dados fundamentalistas
export const getFundamentalData = async (ticker) => {
  try {
    // Adicionar 'SA' para ações brasileiras no Yahoo Finance
    const brTicker = ticker.endsWith('.SA') ? ticker : `${ticker}.SA`;
    
    // Usando o proxy CORS.io que é mais confiável
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    // Buscar dados básicos da empresa
    const stockInfoUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${brTicker}`;
    const stockInfoResponse = await axios.get(corsProxy + encodeURIComponent(stockInfoUrl) );
    
    // Buscar dados financeiros
    const financialDataUrl = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${brTicker}?modules=financialData,defaultKeyStatistics,balanceSheetHistory,cashflowStatementHistory,incomeStatementHistory`;
    const financialDataResponse = await axios.get(corsProxy + encodeURIComponent(financialDataUrl) );
    
    console.log('Dados básicos recebidos:', stockInfoResponse.data);
    console.log('Dados financeiros recebidos:', financialDataResponse.data);
    
    return {
      basicInfo: stockInfoResponse.data.quoteResponse.result[0],
      financials: financialDataResponse.data.quoteSummary.result[0]
    };
  } catch (error) {
    console.error('Erro ao buscar dados fundamentalistas:', error);
    throw error;
  }
};

// Função para buscar dados históricos
export const getHistoricalData = async (ticker, period = '5y', interval = '1mo') => {
  try {
    // Adicionar 'SA' para ações brasileiras no Yahoo Finance
    const brTicker = ticker.endsWith('.SA') ? ticker : `${ticker}.SA`;
    
    // Usando o proxy CORS.io que é mais confiável
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${brTicker}?range=${period}&interval=${interval}`;
    
    const response = await axios.get(corsProxy + encodeURIComponent(url) );
    console.log('Dados históricos recebidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados históricos:', error);
    throw error;
  }
};
