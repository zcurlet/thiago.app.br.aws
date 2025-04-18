export const calculateGrahamValue = (eps, bookValue, growthRate) => {
    // Fórmula de Graham: √(22.5 * EPS * BookValue)
    return Math.sqrt(22.5 * eps * bookValue);
  };
  