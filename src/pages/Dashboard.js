import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout, isAuthenticated, loading } = useContext(AuthContext);
  const [analyses, setAnalyses] = useState([]);
  const [loadingAnalyses, setLoadingAnalyses] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    } else if (isAuthenticated) {
      fetchAnalyses();
    }
  }, [isAuthenticated, loading, navigate]);

  const fetchAnalyses = async () => {
    setLoadingAnalyses(true);
    try {
      // Simulando dados de análises para demonstração
      // Em uma implementação real, isso viria da API GraphQL do Amplify
      setTimeout(() => {
        setAnalyses([
          {
            id: '1',
            ticker: 'PETR4',
            nome: 'Petrobras PN',
            data_analise: new Date().toISOString(),
            preco_justo: {
              media: 38.75,
              upside: 12.5,
              recomendacao: 'COMPRA'
            }
          },
          {
            id: '2',
            ticker: 'VALE3',
            nome: 'Vale ON',
            data_analise: new Date().toISOString(),
            preco_justo: {
              media: 72.30,
              upside: 5.2,
              recomendacao: 'NEUTRO'
            }
          },
          {
            id: '3',
            ticker: 'ITUB4',
            nome: 'Itaú Unibanco PN',
            data_analise: new Date().toISOString(),
            preco_justo: {
              media: 35.40,
              upside: 8.1,
              recomendacao: 'COMPRA'
            }
          }
        ]);
        setLoadingAnalyses(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao buscar análises:', error);
      toast.error('Erro ao carregar análises');
      setLoadingAnalyses(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
        <div className="flex items-center">
          <span className="mr-4 text-gray-700">
            Olá, {user?.attributes?.email || user?.username || 'Usuário'}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Suas Análises</h2>
          <Link
            to="/analysis/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nova Análise
          </Link>
        </div>

        {loadingAnalyses ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : analyses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-4 font-semibold">Ticker</th>
                  <th className="py-3 px-4 font-semibold">Empresa</th>
                  <th className="py-3 px-4 font-semibold">Data da Análise</th>
                  <th className="py-3 px-4 font-semibold">Preço Justo</th>
                  <th className="py-3 px-4 font-semibold">Upside</th>
                  <th className="py-3 px-4 font-semibold">Recomendação</th>
                  <th className="py-3 px-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {analyses.map((analysis) => (
                  <tr key={analysis.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{analysis.ticker}</td>
                    <td className="py-3 px-4">{analysis.nome}</td>
                    <td className="py-3 px-4">
                      {new Date(analysis.data_analise).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">R$ {analysis.preco_justo.media.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`${
                          analysis.preco_justo.upside > 0
                            ? 'text-green-600'
                            : analysis.preco_justo.upside < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {analysis.preco_justo.upside > 0 ? '+' : ''}
                        {analysis.preco_justo.upside.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          analysis.preco_justo.recomendacao === 'COMPRA'
                            ? 'bg-green-100 text-green-800'
                            : analysis.preco_justo.recomendacao === 'VENDA'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {analysis.preco_justo.recomendacao}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/analysis/${analysis.id}`}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Você ainda não possui análises salvas.</p>
            <Link
              to="/analysis/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Criar Primeira Análise
            </Link>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Análise Rápida</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Digite o ticker da ação (ex: PETR4)"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          />
          <button
            onClick={() => navigate('/analysis/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Analisar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
