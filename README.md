# API de Notas de Serviço

Bem-vindo à API de Notas de Serviço! Este projeto foi criado para gerenciar notas de serviço de forma simples e eficiente. A API oferece um CRUD completo para usuários e notas de serviço, com integração a um banco de dados relacional.

## 🛠️ Funcionalidades

- **Gerenciamento de Usuários**:
  - Criar, listar, atualizar e excluir usuários.
- **Gerenciamento de Notas de Serviço**:
  - Criar, listar, atualizar e excluir notas.
- **Autenticação**:
  - Autenticação de usuários para proteger rotas sensíveis.

## 🚀 Tecnologias Utilizadas

- **Linguagem**: JavaScript
- **Framework**: Node.js com Express.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Outras Ferramentas**:
  - Dotenv para variáveis de ambiente
  - Express-validator para validação de dados
  - JWT para autenticação e autorização
  - Cors

## 📂 Estrutura do Projeto

```
service_notes
│
├── prisma                 # Contém arquivos relacionados ao Prisma
│
├── src                    # Contém o código-fonte da aplicação
│    │
│    ├── controllers       # Lógica de controle das requisições HTTP, onde a maior parte da manipulação de dados ocorre
│    │
│    ├── middlewares       # Funções intermediárias que manipulam a requisição e resposta antes de passar para a próxima função
│    │
│    ├── models            # Interação com banco de dados
│    │
│    ├── routes            # Define as rotas da API e mapeia para os controllers adequados
│    │
│    ├── utils             # Funções auxiliares
│    │
│    └── main.js           # Arquivo principal que inicializa a aplicação
│
├── .env                   # Armazena variáveis de ambiente
│
├── .gitignore             # Especifica quais arquivos/pastas devem ser ignorados pelo Git
│
├── package-lock.json      # Controla as versões exatas dos pacotes instalados
│
├── package.json           # Contém as dependências, scripts e outras configurações do projeto
│
└── README.md              # Documento de informações gerais sobre o projeto
```

## 🧑‍💻 Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- Gerenciador de pacotes: npm ou yarn

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/EduardoMark/services_notes.git
   cd nome-do-repositorio
   ```

2. Instale as dependências:
   Se estiver usando npm:
   ```bash
   npm install
   ```
   Ou, se estiver usando yarn:
   ```bash
   yarn install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias, como a URL de conexão com o banco de dados PostgreSQL:
   ```plaintext
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   JWT_SECRET="seu-segredo-jwt"
   ```

4. Execute as migrações do Prisma para configurar o banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   Se estiver usando npm:
   ```bash
   npm start
   ```
   Ou, se estiver usando yarn:
   ```bash
   yarn start
   ```

6. A aplicação estará rodando em [http://localhost:3000](http://localhost:3000).

## 🚧 Desenvolvimento

Se você quiser contribuir para o desenvolvimento, siga estas etapas:

1. Crie uma branch para a sua feature:
   ```bash
   git checkout -b minha-nova-feature
   ```

2. Faça suas alterações e commit:
   ```bash
   git add .
   git commit -m "Descrição da minha mudança"
   ```

3. Envie para o repositório remoto:
   ```bash
   git push origin minha-nova-feature
   ```

4. Crie um pull request explicando as alterações realizadas.

## 👨‍💻 Feito por Eduardo Marques

Este projeto foi desenvolvido por **Eduardo Marques** como parte de um estudo e prática no desenvolvimento de APIs com Node.js, Express, e integração com banco de dados PostgreSQL.

Se tiver alguma dúvida ou sugestão, fique à vontade para entrar em contato!

GitHub: [EduardoMark](https://github.com/EduardoMark)

LinkedIn: [Eduardo Marques](https://www.linkedin.com/in/eduardo-marques-negalho/)

