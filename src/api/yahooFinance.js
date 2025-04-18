// src/api/yahooFinance.js
import axios from 'axios';

// Função para buscar dados fundamentalistas
export const getFundamentalData = async (ticker) => {
  try {
    // Adicionar 'SA' para ações brasileiras no Yahoo Finance
    const brTicker = ticker.endsWith('.SA') ? ticker : `${ticker}.SA`;
    
    // Usando o proxy Beeceptor que é especificamente configurado para Yahoo Finance
    const proxyUrl = 'https://yahoo-finance-api.free.beeceptor.com';
    
    const response = await axios.get(`${proxyUrl}/get-quote`, {
      params: {
        symbol: brTicker
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }) ;
    
    return response.data;
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
    
    // Usando o proxy Beeceptor
    const proxyUrl = 'https://yahoo-finance-api.free.beeceptor.com';
    
    const response = await axios.get(`${proxyUrl}/get-history`, {
      params: {
        symbol: brTicker,
        period: period,
        interval: interval
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }) ;
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados históricos:', error);
    throw error;
  }
};
