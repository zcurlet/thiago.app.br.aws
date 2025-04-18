export const calculateProfitabilityScore = (roe, roic, netMargin) => {
    let score = 0;
    
    // ROE Score (0-10)
    if (roe > 20) score += 10;
    else if (roe > 15) score += 8;
    else if (roe > 10) score += 6;
    else if (roe > 5) score += 4;
    else if (roe > 0) score += 2;
    
    // ROIC Score (0-10)
    if (roic > 15) score += 10;
    else if (roic > 12) score += 8;
    else if (roic > 9) score += 6;
    else if (roic > 6) score += 4;
    else if (roic > 3) score += 2;
    
    // Net Margin Score (0-10)
    if (netMargin > 20) score += 10;
    else if (netMargin > 15) score += 8;
    else if (netMargin > 10) score += 6;
    else if (netMargin > 5) score += 4;
    else if (netMargin > 0) score += 2;
    
    // Média ponderada
    return score / 3;
  };
  