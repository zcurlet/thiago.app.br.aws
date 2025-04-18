// src/models/dividendDiscount.js
export const calculateDividendDiscount = (currentDividend, growthRate, requiredReturn) => {
  // Verificar se os dados são válidos
  if (currentDividend <= 0 || growthRate >= requiredReturn) {
    console.error('Dados inválidos para modelo de desconto de dividendos');
    return null;
  }
  
  // Converter taxas para formato decimal
  const g = growthRate / 100;
  const r = requiredReturn / 100;
  
  // Aplicar o modelo de Gordon (crescimento constante)
  return currentDividend * (1 + g) / (r - g);
};
