// Dados estáticos para médias setoriais brasileiras
export const sectorPERatios = {
    'Bancos': 10.5,
    'Energia': 8.2,
    'Varejo': 15.3,
    'Tecnologia': 20.1,
    'Saúde': 18.7,
    'Construção': 12.4,
    'Alimentos e Bebidas': 14.8,
    'Mineração': 7.5,
    'Papel e Celulose': 9.3,
    'Telecomunicações': 11.2,
    // Adicionar mais setores conforme necessário
  };
  
  export const sectorPBRatios = {
    'Bancos': 1.8,
    'Energia': 1.5,
    'Varejo': 2.3,
    'Tecnologia': 3.2,
    'Saúde': 2.8,
    'Construção': 1.6,
    'Alimentos e Bebidas': 2.1,
    'Mineração': 1.4,
    'Papel e Celulose': 1.3,
    'Telecomunicações': 1.7,
    // Adicionar mais setores conforme necessário
  };
  
  export const sectorBetas = {
    'Bancos': 1.2,
    'Energia': 0.9,
    'Varejo': 1.1,
    'Tecnologia': 1.4,
    'Saúde': 0.8,
    'Construção': 1.3,
    'Alimentos e Bebidas': 0.7,
    'Mineração': 1.5,
    'Papel e Celulose': 1.0,
    'Telecomunicações': 0.8,
    // Adicionar mais setores conforme necessário
  };
  
  // Função para obter beta específico do setor
  export const getSectorBeta = (sector) => {
    return sectorBetas[sector] || 1.0; // Valor padrão se o setor não for encontrado
  };
  
  // Função para obter P/L médio do setor
  export const getSectorPE = (sector) => {
    return sectorPERatios[sector] || 12.0; // Valor padrão se o setor não for encontrado
  };
  
  // Função para obter P/VP médio do setor
  export const getSectorPB = (sector) => {
    return sectorPBRatios[sector] || 1.5; // Valor padrão se o setor não for encontrado
  };
  