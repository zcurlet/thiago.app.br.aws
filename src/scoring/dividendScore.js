export const calculateDividendScore = (dividendYield, payoutRatio, dividendGrowth) => {
    let score = 0;
    
    // Dividend Yield Score (0-10)
    if (dividendYield > 7) score += 10;
    else if (dividendYield > 5) score += 8;
    else if (dividendYield > 3) score += 6;
    else if (dividendYield > 2) score += 4;
    else if (dividendYield > 1) score += 2;
    
    // Payout Ratio Score (0-10) - equilibrado é melhor
    if (payoutRatio > 30 && payoutRatio < 70) score += 10;
    else if (payoutRatio > 20 && payoutRatio < 80) score += 7;
    else if (payoutRatio > 10 && payoutRatio < 90) score += 4;
    else score += 1;
    
    // Dividend Growth Score (0-10)
    if (dividendGrowth > 15) score += 10;
    else if (dividendGrowth > 10) score += 8;
    else if (dividendGrowth > 5) score += 6;
    else if (dividendGrowth > 0) score += 4;
    else score += 0;
    
    // Média ponderada
    return score / 3;
  };
  