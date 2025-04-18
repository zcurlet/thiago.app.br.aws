import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AnalysisDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      // Simulando dados de análise para demonstração
      // Em uma implementação real, isso viria da API GraphQL do Amplify
      setTimeout(() => {
        const mockAnalysis = {
          id,
          ticker: 'PETR4',
          nome: 'Petrobras PN',
          data_analise: new Date().toISOString(),
          preco_atual: 34.45,
          preco_justo: {
            media: 38.75,
            upside: 12.5,
            recomendacao: 'COMPRA'
          },
          indicadores: {
            p_l: 3.2,
            p_vp: 0.9,
            roe: 28.5,
            dividend_yield: 12.8,
            margem_liquida: 25.4,
            divida_liquida_ebitda: 1.2
          },
          analise_detalhada: `A Petrobras apresenta indicadores financeiros sólidos, com baixo P/L e P/VP abaixo de 1, indicando possível subavaliação. 
          O ROE de 28.5% demonstra boa eficiência na geração de lucros, enquanto o dividend yield de 12.8% é bastante atrativo para investidores focados em renda. 
          A margem líquida de 25.4% evidencia boa lucratividade, e a relação dívida líquida/EBITDA de 1.2x mostra endividamento controlado.
          
          Considerando o cenário atual do petróleo e as perspectivas de distribuição de dividendos, a ação apresenta um upside potencial de 12.5%, 
          com preço justo estimado em R$ 38.75, justificando a recomendação de COMPRA.`
        };
        setAnalysis(mockAnalysis);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao buscar análise:', error);
      toast.error('Erro ao carregar dados da análise');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Análise não encontrada</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para o Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors mr-4"
        >
          ← Voltar
        </button>
        <h1 className="text-3xl font-bold text-blue-600">
          Análise de {analysis.ticker} - {analysis.nome}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Data da Análise:</span>
              <span className="font-medium">
                {new Date(analysis.data_analise).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Preço Atual:</span>
              <span className="font-medium">R$ {analysis.preco_atual.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Preço Justo:</span>
              <span className="font-medium">R$ {analysis.preco_justo.media.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Upside:</span>
              <span
                className={`font-medium ${
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
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Recomendação:</span>
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
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Indicadores</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">P/L:</span>
              <span className="font-medium">{analysis.indicadores.p_l.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">P/VP:</span>
              <span className="font-medium">{analysis.indicadores.p_vp.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ROE:</span>
              <span className="font-medium">{analysis.indicadores.roe.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dividend Yield:</span>
              <span className="font-medium">{analysis.indicadores.dividend_yield.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Margem Líquida:</span>
              <span className="font-medium">{analysis.indicadores.margem_liquida.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dívida Líquida/EBITDA:</span>
              <span className="font-medium">
                {analysis.indicadores.divida_liquida_ebitda.toFixed(2)}x
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ações</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate(`/analysis/edit/${id}`)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-2"
            >
              Editar Análise
            </button>
            <button
              onClick={() => {
                toast.success('Análise compartilhada com sucesso!');
              }}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mb-2"
            >
              Compartilhar
            </button>
            <button
              onClick={() => {
                if (window.confirm('Tem certeza que deseja excluir esta análise?')) {
                  toast.success('Análise excluída com sucesso!');
                  navigate('/dashboard');
                }
              }}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Análise Detalhada</h2>
        <div className="prose max-w-none">
          {analysis.analise_detalhada.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetail;
