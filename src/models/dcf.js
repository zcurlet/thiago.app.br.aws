// src/models/dcf.js
export const calculateDCF = (cashFlows, terminalValue, wacc) => {
  // Verificar se os dados são válidos
  if (!cashFlows || !cashFlows.length || !terminalValue || !wacc) {
    console.error('Dados inválidos para cálculo DCF');
    return null;
  }
  
  // Ajustar WACC para formato decimal
  const waccDecimal = wacc / 100;
  
  // Calcular o valor presente dos fluxos de caixa
  let presentValue = 0;
  cashFlows.forEach((cf, index) => {
    presentValue += cf / Math.pow(1 + waccDecimal, index + 1);
  });
  
  // Calcular o valor presente do valor terminal
  const terminalPV = terminalValue / Math.pow(1 + waccDecimal, cashFlows.length);
  
  // Valor total é a soma dos valores presentes
  return presentValue + terminalPV;
};
