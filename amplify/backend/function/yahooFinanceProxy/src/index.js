const https = require('https') ;

exports.handler = async (event) => {
  try {
    // Extrair parâmetros da requisição
    const queryParams = event.queryStringParameters || {};
    const symbol = queryParams.symbol;
    const endpoint = queryParams.endpoint || 'chart'; // chart, quote, summary
    const period = queryParams.period || '1mo';
    const interval = queryParams.interval || '1d';
    
    if (!symbol) {
      return formatResponse(400, { error: 'Símbolo da ação é obrigatório' });
    }
    
    // Adicionar 'SA' para ações brasileiras se não estiver presente
    const brTicker = symbol.endsWith('.SA') ? symbol : `${symbol}.SA`;
    
    // Construir URL com base no endpoint solicitado
    let url;
    if (endpoint === 'chart') {
      url = `https://query1.finance.yahoo.com/v8/finance/chart/${brTicker}?region=BR&interval=${interval}&range=${period}`;
    } else if (endpoint === 'quote')  {
      url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${brTicker}`;
    } else if (endpoint === 'summary')  {
      url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${brTicker}?modules=financialData,defaultKeyStatistics,balanceSheetHistory,cashflowStatementHistory,incomeStatementHistory`;
    } else {
      return formatResponse(400, { error: 'Endpoint inválido' }) ;
    }
    
    console.log(`Buscando dados para ${brTicker} no endpoint ${endpoint}`);
    console.log(`URL: ${url}`);
    
    // Fazer a requisição para a API do Yahoo Finance
    const data = await fetchYahooFinanceData(url);
    return formatResponse(200, data);
  } catch (error) {
    console.error('Erro:', error);
    return formatResponse(500, { error: error.message });
  }
};

function formatResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}

function fetchYahooFinanceData(url) {
  return new Promise((resolve, reject) => {
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
          resolve(JSON.parse(data));
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
}
