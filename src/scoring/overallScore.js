export const calculateOverallScore = (profitabilityScore, financialHealthScore, dividendScore) => {
    // Pesos para cada categoria
    const weights = {
      profitability: 0.4,
      financialHealth: 0.4,
      dividend: 0.2
    };
    
    // Cálculo da pontuação geral ponderada
    return (
      profitabilityScore * weights.profitability +
      financialHealthScore * weights.financialHealth +
      dividendScore * weights.dividend
    );
  };
  