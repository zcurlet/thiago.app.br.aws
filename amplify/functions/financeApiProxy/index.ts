import { defineFunction } from '@aws-amplify/backend';
import https from 'https';

export const financeApiProxy = defineFunction({
  name: 'financeApiProxy',
  handler: async (event)  => {
    try {
      const { arguments: args } = event;
      const { field } = event.info;
      
      let url = '';
      const symbol = args.symbol;
      
      if (!symbol) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Símbolo da ação é obrigatório' })
        };
      }
      
      // Adicionar 'SA' para ações brasileiras se não estiver presente
      const brTicker = symbol.endsWith('.SA') ? symbol : `${symbol}.SA`;
      
      // Determinar qual URL construir com base no campo GraphQL chamado
      if (field === 'getStockData') {
        const region = args.region || 'BR';
        const interval = args.interval || '1d';
        const range = args.range || '1mo';
        url = `https://query1.finance.yahoo.com/v8/finance/chart/${brTicker}?region=${region}&interval=${interval}&range=${range}`;
      } 
      else if (field === 'getFundamentalData')  {
        url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${brTicker}?modules=financialData,defaultKeyStatistics,balanceSheetHistory,cashflowStatementHistory,incomeStatementHistory`;
      }
      else if (field === 'getHistoricalData')  {
        const period = args.period || '5y';
        const interval = args.interval || '1mo';
        url = `https://query1.finance.yahoo.com/v8/finance/chart/${brTicker}?range=${period}&interval=${interval}`;
      }
      
      // Fazer a requisição para a API do Yahoo Finance
      const response = await new Promise((resolve, reject)  => {
        const req = https.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        }, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            try {
              resolve(data);
            } catch (e) {
              reject(new Error('Erro ao processar resposta: ' + e.message));
            }
          });
        });
        
        req.on('error', (e) => {
          reject(new Error('Erro na requisição: ' + e.message));
        });
        
        req.end();
      });
      
      return response;
    } catch (error) {
      console.error('Erro:', error);
      return {
        error: error.message,
        details: 'Erro interno do servidor'
      };
    }
  }
});
