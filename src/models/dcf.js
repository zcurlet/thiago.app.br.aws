export const calculateDCFValue = (cashFlows, terminalValue, wacc) => {
    // Fluxo de Caixa Descontado
    let presentValue = 0;
    
    // Somar o valor presente de cada fluxo de caixa
    cashFlows.forEach((cf, index) => {
      presentValue += cf / Math.pow(1 + wacc, index + 1);
    });
    
    // Adicionar o valor terminal descontado
    presentValue += terminalValue / Math.pow(1 + wacc, cashFlows.length);
    
    return presentValue;
  };
  