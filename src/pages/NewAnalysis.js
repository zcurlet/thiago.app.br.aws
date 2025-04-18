import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewAnalysis = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState(null);
  const [analysisData, setAnalysisData] = useState({
    comentario: '',
    recomendacao: 'NEUTRO'
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ticker) {
      toast.error('Por favor, digite um ticker válido');
      return;
    }

    setSearchLoading(true);
    try {
      // Simulando busca de dados para demonstração
      // Em uma implementação real, isso viria da API GraphQL do Amplify
      setTimeout(() => {
        const mockData = {
          ticker: ticker.toUpperCase(),
          nome: ticker.toUpperCase() === 'PETR4' ? 'Petrobras PN' : 
                ticker.toUpperCase() === 'VALE3' ? 'Vale ON' : 
                ticker.toUpperCase() === 'ITUB4' ? 'Itaú Unibanco PN' : 
                `${ticker.toUpperCase()} S.A.`,
          preco_atual: 34.45,
          indicadores: {
            p_l: 3.2,
            p_vp: 0.9,
            roe: 28.5,
            dividend_yield: 12.8,
            margem_liquida: 25.4,
            divida_liquida_ebitda: 1.2
          }
        };
        setStockData(mockData);
        setSearchLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao buscar dados da ação:', error);
      toast.error('Erro ao buscar dados da ação');
      setSearchLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnalysisData({
      ...analysisData,
      [name]: value
    });
  };

  const calculateFairPrice = () => {
    // Simulação de cálculo de preço justo baseado nos indicadores
    // Em uma implementação real, isso usaria modelos financeiros mais complexos
    if (!stockData) return null;

    const { p_l, p_vp, roe, dividend_yield } = stockData.indicadores;
    
    // Fórmula simplificada para demonstração
    const fairPrice = stockData.preco_atual * (1 + ((roe / 100) - (p_l / 20) + (dividend_yield / 100) - (p_vp / 2)) / 5);
    
    const upside = ((fairPrice / stockData.preco_atual) - 1) * 100;
    
    let recomendacao = 'NEUTRO';
    if (upside > 15) recomendacao = 'COMPRA';
    else if (upside < -15) recomendacao = 'VENDA';
    
    return {
      valor: fairPrice,
      upside,
      recomendacao
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stockData) {
      toast.error('Por favor, busque uma ação primeiro');
      return;
    }

    setLoading(true);
    try {
      const fairPrice = calculateFairPrice();
      
      // Simulando salvamento da análise
      // Em uma implementação real, isso usaria a API GraphQL do Amplify
      setTimeout(() => {
        toast.success('Análise salva com sucesso!');
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar análise:', error);
      toast.error('Erro ao salvar análise');
    } finally {
      setLoading(false);
    }
  };

  const fairPrice = stockData ? calculateFairPrice() : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors mr-4"
        >
          ← Voltar
        </button>
        <h1 className="text-3xl font-bold text-blue-600">Nova Análise Fundamentalista</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Buscar Ação</h2>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Digite o ticker da ação (ex: PETR4)"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            required
          />
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${
              searchLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={searchLoading}
          >
            {searchLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      {stockData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {stockData.ticker} - {stockData.nome}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Preço Atual:</span>
                  <span className="font-medium">R$ {stockData.preco_atual.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">P/L:</span>
                  <span className="font-medium">{stockData.indicadores.p_l.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">P/VP:</span>
                  <span className="font-medium">{stockData.indicadores.p_vp.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROE:</span>
                  <span className="font-medium">{stockData.indicadores.roe.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dividend Yield:</span>
                  <span className="font-medium">
                    {stockData.indicadores.dividend_yield.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Margem Líquida:</span>
                  <span className="font-medium">
                    {stockData.indicadores.margem_liquida.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dívida Líquida/EBITDA:</span>
                  <span className="font-medium">
                    {stockData.indicadores.divida_liquida_ebitda.toFixed(2)}x
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Preço Justo Calculado</h2>
              {fairPrice && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preço Justo:</span>
                    <span className="font-medium">R$ {fairPrice.valor.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upside:</span>
                    <span
                      className={`font-medium ${
                        fairPrice.upside > 0
                          ? 'text-green-600'
                          : fairPrice.upside < 0
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {fairPrice.upside > 0 ? '+' : ''}
                      {fairPrice.upside.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recomendação:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        fairPrice.recomendacao === 'COMPRA'
                          ? 'bg-green-100 text-green-800'
                          : fairPrice.recomendacao === 'VENDA'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {fairPrice.recomendacao}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sua Análise</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="recomendacao">
                  Sua Recomendação
                </label>
                <select
                  id="recomendacao"
                  name="recomendacao"
                  value={analysisData.recomendacao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COMPRA">COMPRA</option>
                  <option value="NEUTRO">NEUTRO</option>
                  <option value="VENDA">VENDA</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="comentario">
                  Comentários
                </label>
                <textarea
                  id="comentario"
                  name="comentario"
                  value={analysisData.comentario}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Adicione seus comentários sobre a análise..."
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Análise'}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default NewAnalysis;
