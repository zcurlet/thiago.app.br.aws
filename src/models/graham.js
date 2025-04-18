// src/models/graham.js
export const calculateGraham = (eps, bookValue) => {
  // Verificar se os dados são válidos
  if (!eps || !bookValue || eps <= 0 || bookValue <= 0) {
    console.error('Dados inválidos para modelo de Graham');
    return null;
  }
  
  // Fórmula de Graham: √(22.5 * EPS * BookValue)
  return Math.sqrt(22.5 * eps * bookValue);
};
