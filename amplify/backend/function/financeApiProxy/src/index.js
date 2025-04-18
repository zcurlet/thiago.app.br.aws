const https = require('https') ;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    try {
        // Extrair parâmetros da requisição
        const queryParams = event.queryStringParameters || {};
        const symbol = queryParams.symbol;
        
        if (!symbol) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Símbolo da ação é obrigatório' })
            };
        }
        
        // Construir URL para a API do Yahoo Finance
        const region = queryParams.region || 'BR';
        const interval = queryParams.interval || '1d';
        const range = queryParams.range || '1mo';
        
        const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=${region}&interval=${interval}&range=${range}`;
        
        // Fazer a requisição para a API do Yahoo Finance usando https nativo
        const yahooData = await new Promise((resolve, reject)  => {
            const req = https.get(yahooUrl, {
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
        
        // Retornar os dados para o cliente
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(yahooData)
        };
    } catch (error) {
        console.error('Erro:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: error.message,
                details: 'Erro interno do servidor'
            })
        };
    }
};
