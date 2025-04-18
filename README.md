# Assistente Financeiro - Guia de Implantação AWS Amplify

Este documento fornece instruções para implantar o Assistente Financeiro na AWS Amplify.

## Visão Geral

O Assistente Financeiro é uma aplicação React que permite aos usuários realizar análises fundamentalistas de ações brasileiras. A aplicação utiliza AWS Amplify para autenticação, armazenamento de dados e hospedagem.

## Pré-requisitos

- Conta na AWS
- Conhecimento básico de Git e GitHub
- Node.js e npm instalados localmente (apenas para desenvolvimento)

## Passos para Implantação

### 1. Criar um Repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login
2. Clique em "New" para criar um novo repositório
3. Nomeie o repositório (ex: "assistente-financeiro")
4. Escolha a visibilidade (público ou privado)
5. Clique em "Create repository"

### 2. Fazer Upload do Código para o GitHub

1. Clone o repositório vazio localmente:
   ```bash
   git clone https://github.com/seu-usuario/assistente-financeiro.git
   ```

2. Extraia os arquivos do projeto para a pasta clonada
3. Adicione, faça commit e envie os arquivos:
   ```bash
   git add .
   git commit -m "Versão inicial do Assistente Financeiro"
   git push -u origin main
   ```

### 3. Configurar o AWS Amplify

1. Acesse o [Console da AWS](https://aws.amazon.com/console/)
2. Pesquise por "Amplify" e selecione o serviço
3. Clique em "New app" > "Host web app"
4. Selecione GitHub como provedor de repositório
5. Autorize o acesso ao GitHub se solicitado
6. Selecione o repositório e a branch (geralmente "main")
7. Clique em "Next"

### 4. Configurar a Build

1. Mantenha as configurações padrão de build
2. Clique em "Next"
3. Revise as configurações e clique em "Save and deploy"

### 5. Adicionar Autenticação

1. Após a implantação inicial, vá para a guia "Backend environments"
2. Clique em "Add" na seção "Authentication"
3. Selecione "Manual configuration"
4. Configure as opções de autenticação:
   - Authentication service: Cognito
   - Configure sign-in: Email, Username
   - Configure security requirements: Password requirements (mínimo 8 caracteres)
   - Configure MFA: Off (ou conforme sua preferência)
5. Clique em "Save and deploy"

### 6. Configurar Domínio Personalizado (Opcional)

1. Vá para a guia "Domain management"
2. Clique em "Add domain"
3. Digite seu domínio personalizado
4. Siga as instruções para verificar a propriedade do domínio
5. Clique em "Save"

## Uso da Aplicação

Após a implantação, você pode acessar a aplicação através da URL fornecida pelo Amplify ou pelo seu domínio personalizado.

### Criar Usuário Administrador

Para criar um usuário administrador:

1. Acesse o console da AWS
2. Vá para Amazon Cognito > User Pools
3. Selecione o pool de usuários criado pelo Amplify
4. Vá para "Users and groups"
5. Clique em "Create user"
6. Preencha os detalhes do usuário:
   - Username: admin
   - Email: seu-email@exemplo.com
   - Temporary password: Admin123!
   - Marque "Mark email as verified"
7. Clique em "Create user"

## Solução de Problemas

Se encontrar problemas durante a implantação:

1. Verifique os logs de build no console do Amplify
2. Certifique-se de que todas as dependências estão corretamente listadas no package.json
3. Verifique se o arquivo aws-exports.js está sendo gerado corretamente
4. Confirme que o pool de usuários do Cognito foi configurado corretamente

## Recursos Adicionais

- [Documentação do AWS Amplify](https://docs.amplify.aws/)
- [Guia de Autenticação com React](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)
- [Documentação do Amazon Cognito](https://docs.aws.amazon.com/cognito/)
