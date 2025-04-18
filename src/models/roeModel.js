export const calculateROEBasedValue = (bookValue, roe, costOfEquity) => {
    // Modelo baseado em ROE e custo de capital
    return bookValue * (roe / costOfEquity);
  };
  