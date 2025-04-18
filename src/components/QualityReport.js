import React from 'react';

const QualityReport = ({ stock, qualityData }) => {
  const {
    profitabilityScore,
    financialHealthScore,
    dividendScore,
    overallScore
  } = qualityData;
  
  // Determinar classificação geral
  let qualityRating = 'Média';
  if (overallScore > 8) qualityRating = 'Excelente';
  else if (overallScore > 6) qualityRating = 'Boa';
  else if (overallScore < 4) qualityRating = 'Ruim';
  else if (overallScore < 2) qualityRating = 'Péssima';
  
  return (
    <div className="quality-report">
      <h2>Análise de Qualidade: {stock.ticker}</h2>
      
      <div className="summary-card">
        <h3>Classificação Geral</h3>
        <div className="score-display">
          <div className="score-circle">{overallScore.toFixed(1)}</div>
          <p className={`quality-rating ${qualityRating.toLowerCase()}`}>{qualityRating}</p>
        </div>
      </div>
      
      <div className="score-breakdown">
        <h3>Detalhamento das Pontuações</h3>
        
        <div className="score-category">
          <h4>Rentabilidade</h4>
          <div className="score-bar">
            <div className="score-fill" style={{ width: `${profitabilityScore * 10}%` }}></div>
          </div>
          <p>{profitabilityScore.toFixed(1)}/10</p>
          <p>{generateProfitabilityComments(stock)}</p>
        </div>
        
        <div className="score-category">
          <h4>Saúde Financeira</h4>
          <div className="score-bar">
            <div className="score-fill" style={{ width: `${financialHealthScore * 10}%` }}></div>
          </div>
          <p>{financialHealthScore.toFixed(1)}/10</p>
          <p>{generateFinancialHealthComments(stock)}</p>
        </div>
        
        <div className="score-category">
          <h4>Dividendos</h4>
          <div className="score-bar">
            <div className="score-fill" style={{ width: `${dividendScore * 10}%` }}></div>
          </div>
          <p>{dividendScore.toFixed(1)}/10</p>
          <p>{generateDividendComments(stock)}</p>
        </div>
      </div>
      
      <div className="analysis-comments">
        <h3>Análise Detalhada</h3>
        <p>{generateQualityComments(stock, qualityData)}</p>
      </div>
    </div>
  );
};

// Funções para gerar comentários personalizados
const generateProfitabilityComments = (stock) => {
  const { roe, roic, netMargin } = stock;
  
  let comments = '';
  
  if (roe > 15 && roic > 12 && netMargin > 15) {
    comments = `${stock.ticker} demonstra excelente rentabilidade, com ROE de ${roe.toFixed(2)}%, ROIC de ${roic.toFixed(2)}% e margem líquida de ${netMargin.toFixed(2)}%.`;
  } else if (roe > 10 && roic > 8 && netMargin > 10) {
    comments = `${stock.ticker} apresenta boa rentabilidade, com ROE de ${roe.toFixed(2)}%, ROIC de ${roic.toFixed(2)}% e margem líquida de ${netMargin.toFixed(2)}%.`;
  } else if (roe > 5 && roic > 4 && netMargin > 5) {
    comments = `${stock.ticker} tem rentabilidade moderada, com ROE de ${roe.toFixed(2)}%, ROIC de ${roic.toFixed(2)}% e margem líquida de ${netMargin.toFixed(2)}%.`;
  } else {
    comments = `${stock.ticker} apresenta rentabilidade abaixo da média, com ROE de ${roe.toFixed(2)}%, ROIC de ${roic.toFixed(2)}% e margem líquida de ${netMargin.toFixed(2)}%.`;
  }
  
  return comments;
};

const generateFinancialHealthComments = (stock) => {
  const { debtToEquity, currentRatio } = stock;
  
  let comments = '';
  
  if (debtToEquity < 0.5 && currentRatio > 1.5) {
    comments = `${stock.ticker} possui excelente saúde financeira, com baixo endividamento (Dívida/Patrimônio de ${debtToEquity.toFixed(2)}) e boa liquidez corrente (${currentRatio.toFixed(2)}).`;
  } else if (debtToEquity < 1.0 && currentRatio > 1.2) {
    comments = `${stock.ticker} apresenta boa saúde financeira, com endividamento moderado (Dívida/Patrimônio de ${debtToEquity.toFixed(2)}) e liquidez corrente adequada (${currentRatio.toFixed(2)}).`;
  } else if (debtToEquity < 1.5 && currentRatio > 1.0) {
    comments = `${stock.ticker} tem saúde financeira razoável, com endividamento controlado (Dívida/Patrimônio de ${debtToEquity.toFixed(2)}) e liquidez corrente aceitável (${currentRatio.toFixed(2)}).`;
  } else {
    comments = `${stock.ticker} apresenta saúde financeira preocupante, com alto endividamento (Dívida/Patrimônio de ${debtToEquity.toFixed(2)}) e/ou baixa liquidez corrente (${currentRatio.toFixed(2)}).`;
  }
  
  return comments;
};

const generateDividendComments = (stock) => {
  const { dividendYield, payoutRatio } = stock;
  
  let comments = '';
  
  if (dividendYield > 5 && payoutRatio > 30 && payoutRatio < 70) {
    comments = `${stock.ticker} é excelente pagadora de dividendos, com yield de ${dividendYield.toFixed(2)}% e payout ratio equilibrado de ${payoutRatio.toFixed(2)}%.`;
  } else if (dividendYield > 3 && payoutRatio > 20 && payoutRatio < 80) {
    comments = `${stock.ticker} é boa pagadora de dividendos, com yield de ${dividendYield.toFixed(2)}% e payout ratio de ${payoutRatio.toFixed(2)}%.`;
  } else if (dividendYield > 1) {
    comments = `${stock.ticker} paga dividendos moderados, com yield de ${dividendYield.toFixed(2)}% e payout ratio de ${payoutRatio.toFixed(2)}%.`;
  } else {
    comments = `${stock.ticker} não é focada em dividendos, com yield baixo de ${dividendYield.toFixed(2)}% e payout ratio de ${payoutRatio.toFixed(2)}%.`;
  }
  
  return comments;
};

const generateQualityComments = (stock, qualityData) => {
  const {
    profitabilityScore,
    financialHealthScore,
    dividendScore,
    overallScore
  } = qualityData;
  
  let comments = `A análise de qualidade de ${stock.ticker} (${stock.name}) indica que esta é uma empresa de qualidade `;
  
  if (overallScore > 8) {
    comments += `excelente, com pontuação geral de ${overallScore.toFixed(1)}/10. `;
    comments += `Destaca-se principalmente em `;
  } else if (overallScore > 6) {
    comments += `boa, com pontuação geral de ${overallScore.toFixed(1)}/10. `;
    comments += `Apresenta bons resultados em `;
  } else if (overallScore > 4) {
    comments += `média, com pontuação geral de ${overallScore.toFixed(1)}/10. `;
    comments += `Tem desempenho mediano em `;
  } else {
    comments += `abaixo da média, com pontuação geral de ${overallScore.toFixed(1)}/10. `;
    comments += `Apresenta deficiências em `;
  }
  
  // Identificar pontos fortes e fracos
  const scores = [
    { name: 'rentabilidade', score: profitabilityScore },
    { name: 'saúde financeira', score: financialHealthScore },
    { name: 'dividendos', score: dividendScore }
  ];
  
  // Ordenar do maior para o menor
  scores.sort((a, b) => b.score - a.score);
  
  comments += `${scores[0].name} (${scores[0].score.toFixed(1)}/10)`;
  
  if (scores[0].score - scores[1].score < 1) {
    comments += ` e ${scores[1].name} (${scores[1].score.toFixed(1)}/10). `;
  } else {
    comments += `. `;
  }
  
  // Mencionar ponto fraco
  if (scores[2].score < 5) {
    comments += `Seu ponto mais fraco é ${scores[2].name} (${scores[2].score.toFixed(1)}/10), que merece atenção. `;
  }
  
  // Adicionar recomendação final
  if (overallScore > 7) {
    comments += `\n\nConsiderando todos os aspectos analisados, ${stock.ticker} se mostra uma empresa de alta qualidade e pode ser considerada para investimentos de longo prazo, especialmente se estiver com preço atrativo.`;
  } else if (overallScore > 5) {
    comments += `\n\nConsiderando todos os aspectos analisados, ${stock.ticker} se mostra uma empresa de qualidade razoável e pode ser considerada para investimentos, desde que com preço adequado e como parte de uma carteira diversificada.`;
  } else {
    comments += `\n\nConsiderando todos os aspectos analisados, ${stock.ticker} apresenta alguns riscos importantes e deve ser avaliada com cautela antes de qualquer investimento.`;
  }
  
  return comments;
};

export default QualityReport;
