export const calculateDividendDiscountValue = (currentDividend, growthRate, discountRate) => {
    // Modelo de Desconto de Dividendos (Gordon Growth Model)
    return currentDividend * (1 + growthRate) / (discountRate - growthRate);
  };
  