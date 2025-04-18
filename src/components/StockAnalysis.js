// src/components/StockAnalysis.js
import React, { useState } from 'react';
import { calculateDCFWithAPI } from '../models/adaptedModels';

const StockAnalysis = () => {
    const [symbol, setSymbol] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    
    // Parâmetros personalizados para o modelo DCF
    const [cashFlows, setCashFlows] = useState([100, 110, 121, 133, 146]);
    const [terminalValue, setTerminalValue] = useState(2000);
    const [wacc, setWacc] = useState(0.1);
    
    const handleAnalyze = async () => {
        if (!symbol) {
            setError('Por favor, insira um símbolo de ação');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            const customParams = {
                cashFlows,
                terminalValue,
                wacc
            };
            
            const analysisResult = await calculateDCFWithAPI(symbol, customParams);
            setResult(analysisResult);
        } catch (err) {
            setError('Erro ao analisar ação: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="stock-analysis">
            <h2>Análise Fundamentalista</h2>
            
            <div className="input-group">
                <label>Símbolo da Ação (ex: PETR4.SA):</label>
                <input 
                    type="text" 
                    value={symbol} 
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="PETR4.SA"
                />
            </div>
            
            <h3>Parâmetros do Modelo DCF</h3>
            
            <div className="input-group">
                <label>WACC (%):</label>
                <input 
                    type="number" 
                    value={wacc * 100} 
                    onChange={(e) => setWacc(parseFloat(e.target.value) / 100)}
                    step="0.1"
                />
            </div>
            
            <div className="input-group">
                <label>Valor Terminal:</label>
                <input 
                    type="number" 
                    value={terminalValue} 
                    onChange={(e) => setTerminalValue(parseFloat(e.target.value))}
                />
            </div>
            
            <button onClick={handleAnalyze} disabled={loading}>
                {loading ? 'Analisando...' : 'Analisar'}
            </button>
            
            {error && <div className="error">{error}</div>}
            
            {result && (
                <div className="result">
                    <h3>Resultado da Análise para {result.symbol}</h3>
                    <p>Preço Atual: R$ {result.currentPrice.toFixed(2)}</p>
                    <p>Valor Justo (DCF): R$ {result.fairValue.toFixed(2)}</p>
                    <p>Diferença: R$ {result.difference.toFixed(2)} ({result.percentageDifference.toFixed(2)}%)</p>
                    <p>
                        Recomendação: 
                        {result.percentageDifference > 20 ? (
                            <span className="buy">Comprar</span>
                        ) : result.percentageDifference < -20 ? (
                            <span className="sell">Vender</span>
                        ) : (
                            <span className="hold">Manter</span>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default StockAnalysis;
