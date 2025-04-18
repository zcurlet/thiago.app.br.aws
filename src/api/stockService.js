// src/api/stockService.js
import axios from 'axios';

// Substitua esta URL pela URL do seu API Gateway quando estiver pronto
const API_URL = 'https://sua-api-gateway-url.execute-api.us-east-1.amazonaws.com/prod';

// Função temporária para teste local (usando proxy CORS) 
const getStockPriceLocal = async (symbol) => {
    try {
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
        
        const response = await axios.get(corsProxy + yahooUrl, {
            params: {
                region: 'BR',
                interval: '1d',
                range: '1mo'
            },
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }) ;
        
        return response.data;
    } catch (error) {
        console.error('Erro ao obter preço da ação:', error);
        throw error;
    }
};

// Função que usará o backend quando estiver pronto
export const getStockPrice = async (symbol) => {
    try {
        // Descomente a linha abaixo quando seu backend estiver pronto
        // const response = await axios.get(`${API_URL}/api/stock/price?symbol=${symbol}&region=BR`);
        
        // Use a função local por enquanto
        const data = await getStockPriceLocal(symbol);
        return data;
    } catch (error) {
        console.error('Erro ao obter preço da ação:', error);
        throw error;
    }
};

// Adicione mais funções conforme necessário
