// src/api/yahooFinance.js
import axios from 'axios';

// Função para buscar dados fundamentalistas
export const getFundamentalData = async (ticker) => {
  try {
    // Adicionar 'SA' para ações brasileiras no Yahoo Finance
    const brTicker = ticker.endsWith('.SA') ? ticker : `${ticker}.SA`;
    
    // Usando YQL como proxy (funciona bem com Yahoo Finance)
    const yqlUrl = 'https://query.yahooapis.com/v1/public/yql';
    const query = `select * from yahoo.finance.quotes where symbol in ("${brTicker}") `;
    
    const response = await axios.get(yqlUrl, {
      params: {
        q: query,
        format: 'json',
        env: 'store://datatables.org/alltableswithkeys'
      }
    });
    
    console.log('Dados fundamentalistas recebidos:', response.data);
    
    const quoteData = response.data.query.results.quote;
    
    // Formatar os dados para corresponder à estrutura esperada
    return {
      basicInfo: {
        symbol: brTicker,
        longName: quoteData.Name,
        regularMarketPrice: parseFloat(quoteData.LastTradePriceOnly),
        regularMarketChange: parseFloat(quoteData.Change),
        regularMarketChangePercent: parseFloat(quoteData.PercentChange.replace('%', '')),
        marketCap: parseFloat(quoteData.MarketCapitalization)
      },
      financials: {
        defaultKeyStatistics: {
          forwardPE: {
            raw: parseFloat(quoteData.PERatio)
          }
        },
        financialData: {
          totalRevenue: {
            raw: 0 // Não disponível via YQL básico
          }
        }
      }
    };
  } catch (error) {
    console.error('Erro ao buscar dados fundamentalistas:', error);
    
    // Plano B: Retornar dados simulados para demonstração
    console.log('Retornando dados simulados para demonstração');
    
    // Dados simulados para demonstração
    const simulatedPrice = ticker.toLowerCase().includes('petr') ? 28.75 : 
                          ticker.toLowerCase().includes('vale') ? 68.42 : 
                          ticker.toLowerCase().includes('itub') ? 32.15 : 45.50;
    
    return {
      basicInfo: {
        symbol: ticker,
        longName: ticker.includes('PETR') ? 'Petrobras' : 
                 ticker.includes('VALE') ? 'Vale' : 
                 ticker.includes('ITUB') ? 'Itaú Unibanco' : 'Empresa Brasileira',
        regularMarketPrice: simulatedPrice,
        regularMarketChange: 0.75,
        regularMarketChangePercent: 2.5,
        marketCap: 450000000000
      },
      financials: {
        defaultKeyStatistics: {
          forwardPE: {
            raw: 8.5
          }
        },
        financialData: {
          totalRevenue: {
            raw: 350000000000
          }
        }
      }
    };
  }
};

// Função para buscar dados históricos
export const getHistoricalData = async (ticker, period = '5y', interval = '1mo') => {
  try {
    // Adicionar 'SA' para ações brasileiras no Yahoo Finance
    const brTicker = ticker.endsWith('.SA') ? ticker : `${ticker}.SA`;
    
    // Para dados históricos, vamos usar uma abordagem diferente
    // Usando Alpha Vantage como alternativa (tem limite de requisições, mas é confiável)
    const alphaVantageUrl = 'https://www.alphavantage.co/query';
    const apiKey = 'demo'; // Use a chave demo para testes
    
    const response = await axios.get(alphaVantageUrl, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: brTicker,
        outputsize: 'compact',
        apikey: apiKey
      }
    }) ;
    
    console.log('Dados históricos recebidos:', response.data);
    
    // Formatar os dados para corresponder à estrutura esperada
    const timeSeriesData = response.data['Time Series (Daily)'];
    const timestamps = [];
    const prices = [];
    
    for (const date in timeSeriesData) {
      timestamps.push(new Date(date).getTime());
      prices.push(parseFloat(timeSeriesData[date]['4. close']));
    }
    
    // Inverter arrays para ordem cronológica
    timestamps.reverse();
    prices.reverse();
    
    return {
      chart: {
        result: [{
          timestamp: timestamps,
          indicators: {
            quote: [{
              close: prices
            }]
          }
        }]
      }
    };
  } catch (error) {
    console.error('Erro ao buscar dados históricos:', error);
    
    // Plano B: Retornar dados simulados para demonstração
    console.log('Retornando dados históricos simulados para demonstração');
    
    // Gerar dados históricos simulados
    const timestamps = [];
    const prices = [];
    const basePrice = ticker.toLowerCase().includes('petr') ? 28.75 : 
                     ticker.toLowerCase().includes('vale') ? 68.42 : 
                     ticker.toLowerCase().includes('itub') ? 32.15 : 45.50;
    
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      timestamps.push(date.getTime());
      
      // Gerar preço com pequena variação aleatória
      const randomVariation = (Math.random() - 0.5) * 2; // Entre -1 e 1
      prices.push(basePrice + randomVariation);
    }
    
    // Inverter arrays para ordem cronológica
    timestamps.reverse();
    prices.reverse();
    
    return {
      chart: {
        result: [{
          timestamp: timestamps,
          indicators: {
            quote: [{
              close: prices
            }]
          }
        }]
      }
    };
  }
};
