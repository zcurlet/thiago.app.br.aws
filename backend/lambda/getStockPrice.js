// backend/lambda/getStockPrice.js
const axios = require('axios');

exports.handler = async (event) => {
    try {
        const symbol = event.queryStringParameters.symbol;
        const region = event.queryStringParameters.region || 'BR';
        
        // Chamar a API do Yahoo Finance
        const response = await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/' + symbol, {
            params: {
                region: region,
                interval: '1d',
                range: '1mo'
            },
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        }) ;
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
