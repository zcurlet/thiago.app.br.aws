export const calculateFinancialHealthScore = (debtToEquity, currentRatio) => {
    let score = 0;
    
    // Debt to Equity Score (0-10) - menor é melhor
    if (debtToEquity < 0.3) score += 10;
    else if (debtToEquity < 0.5) score += 8;
    else if (debtToEquity < 0.8) score += 6;
    else if (debtToEquity < 1.2) score += 4;
    else if (debtToEquity < 2) score += 2;
    
    // Current Ratio Score (0-10) - maior é melhor
    if (currentRatio > 2) score += 10;
    else if (currentRatio > 1.5) score += 8;
    else if (currentRatio > 1.2) score += 6;
    else if (currentRatio > 1) score += 4;
    else if (currentRatio > 0.8) score += 2;
    
    // Média simples
    return score / 2;
  };
  