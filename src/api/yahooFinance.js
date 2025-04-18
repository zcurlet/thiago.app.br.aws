import axios from 'axios';

// Função para buscar dados fundamentalistas
export const getFundamentalData = async (ticker) => {
  try {
    // Adicionar 'SA' para ações brasileiras no Yahoo Finance
    const brTicker = ticker.endsWith('.SA') ? ticker : `${ticker}.SA`;
    
    // Buscar dados básicos da empresa
    const stockInfo = await axios.get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${brTicker}`) ;
    
    // Buscar dados financeiros
    const financialData = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${brTicker}?modules=financialData,incomeStatementHistory,balanceSheetHistory,cashflowStatementHistory,defaultKeyStatistics`) ;
    
    return {
      basicInfo: stockInfo.data.quoteResponse.result[0],
      financials: financialData.data.quoteSummary.result[0]
    };
  } catch (error) {
    console.error('Erro ao buscar dados fundamentalistas:', error);
    throw error;
  }
};

// Função para buscar dados históricos
export const getHistoricalData = async (ticker, period = '5y', interval = '1mo') => {
  try {
    const brTicker = ticker.endsWith('.SA') ? ticker : `${ticker}.SA`;
    const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${brTicker}?range=${period}&interval=${interval}`) ;
    return response.data.chart.result[0];
  } catch (error) {
    console.error('Erro ao buscar dados históricos:', error);
    throw error;
  }
};
