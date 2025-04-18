import React from 'react';

const ValuationReport = ({ stock, valuationData }) => {
  const {
    grahamValue,
    peValue,
    pbValue,
    roeValue,
    dividendValue,
    dcfValue,
    currentPrice
  } = valuationData;
  
  // Calcular média dos modelos
  const averageValue = (grahamValue + peValue + pbValue + roeValue + dividendValue + dcfValue) / 6;
  
  // Calcular potencial de valorização
  const upside = ((averageValue / currentPrice) - 1) * 100;
  
  // Determinar recomendação
  let recommendation = 'Neutro';
  if (upside > 20) recommendation = 'Compra Forte';
  else if (upside > 5) recommendation = 'Compra';
  else if (upside < -20) recommendation = 'Venda Forte';
  else if (upside < -5) recommendation = 'Venda';
  
  return (
    <div className="valuation-report">
      <h2>Relatório de Valuation: {stock.ticker}</h2>
      
      <div className="summary-card">
        <h3>Resumo da Avaliação</h3>
        <p>Preço Atual: R$ {currentPrice.toFixed(2)}</p>
        <p>Preço Justo Médio: R$ {averageValue.toFixed(2)}</p>
        <p>Potencial: {upside.toFixed(2)}%</p>
        <p className={`recommendation ${recommendation.replace(' ', '-').toLowerCase()}`}>
          Recomendação: {recommendation}
        </p>
      </div>
      
      <div className="models-comparison">
        <h3>Comparação de Modelos</h3>
        <table>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Preço Justo</th>
              <th>Diferença</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Graham</td>
              <td>R$ {grahamValue.toFixed(2)}</td>
              <td>{(((grahamValue / currentPrice) - 1) * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>P/L Justo</td>
              <td>R$ {peValue.toFixed(2)}</td>
              <td>{(((peValue / currentPrice) - 1) * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>P/VP Justo</td>
              <td>R$ {pbValue.toFixed(2)}</td>
              <td>{(((pbValue / currentPrice) - 1) * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Baseado em ROE</td>
              <td>R$ {roeValue.toFixed(2)}</td>
              <td>{(((roeValue / currentPrice) - 1) * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Desconto de Dividendos</td>
              <td>R$ {dividendValue.toFixed(2)}</td>
              <td>{(((dividendValue / currentPrice) - 1) * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Fluxo de Caixa Descontado</td>
              <td>R$ {dcfValue.toFixed(2)}</td>
              <td>{(((dcfValue / currentPrice) - 1) * 100).toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="analysis-comments">
        <h3>Análise Detalhada</h3>
        <p>{generateValuationComments(stock, valuationData)}</p>
      </div>
    </div>
  );
};

// Função para gerar comentários personalizados
const generateValuationComments = (stock, valuationData) => {
  const {
    grahamValue,
    peValue,
    pbValue,
    roeValue,
    dividendValue,
    dcfValue,
    currentPrice
  } = valuationData;
  
  // Calcular média dos modelos
  const averageValue = (grahamValue + peValue + pbValue + roeValue + dividendValue + dcfValue) / 6;
  
  // Calcular potencial de valorização
  const upside = ((averageValue / currentPrice) - 1) * 100;
  
  let comments = `A análise fundamentalista de ${stock.ticker} (${stock.name}) indica `;
  
  if (upside > 20) {
    comments += `um potencial de valorização significativo de ${upside.toFixed(2)}%. `;
    comments += `A maioria dos modelos de valuation sugere que a ação está substancialmente subvalorizada no preço atual. `;
  } else if (upside > 5) {
    comments += `um potencial de valorização moderado de ${upside.toFixed(2)}%. `;
    comments += `Alguns modelos de valuation indicam que a ação está ligeiramente subvalorizada no preço atual. `;
  } else if (upside < -20) {
    comments += `um potencial de desvalorização significativo de ${Math.abs(upside).toFixed(2)}%. `;
    comments += `A maioria dos modelos de valuation sugere que a ação está substancialmente sobrevalorizada no preço atual. `;
  } else if (upside < -5) {
    comments += `um potencial de desvalorização moderado de ${Math.abs(upside).toFixed(2)}%. `;
    comments += `Alguns modelos de valuation indicam que a ação está ligeiramente sobrevalorizada no preço atual. `;
  } else {
    comments += `que a ação está próxima do seu valor justo, com um potencial de ${upside.toFixed(2)}%. `;
    comments += `A maioria dos modelos de valuation sugere que a ação está precificada adequadamente no momento. `;
  }
  
  // Adicionar comentários específicos sobre cada modelo
  comments += `\n\nO modelo de Graham, que considera o valor intrínseco baseado em lucros e patrimônio, indica um preço justo de R$${grahamValue.toFixed(2)}. `;
  comments += `O modelo de P/L justo, baseado na média setorial, sugere um preço de R$${peValue.toFixed(2)}. `;
  comments += `Já o modelo baseado em P/VP setorial aponta para R$${pbValue.toFixed(2)}. `;
  comments += `\n\nConsiderando o ROE e o custo de capital, o valor justo seria de R$${roeValue.toFixed(2)}. `;
  comments += `O modelo de desconto de dividendos, que valoriza os pagamentos futuros aos acionistas, indica R$${dividendValue.toFixed(2)}. `;
  comments += `Por fim, a análise de fluxo de caixa descontado, que é mais abrangente, sugere um valor de R$${dcfValue.toFixed(2)}.`;
  
  return comments;
};

export default ValuationReport;
