# Sistema de Ação Voluntariado IFRS

## 📋 Sobre
Sistema desenvolvido para gerenciar eventos de voluntariado no IFRS, permitindo que administradores cadastrem eventos e usuários possam se inscrever como voluntários.

## 🚀 Tecnologias

### Frontend
- React.js
- React Router DOM
- Context API
- JWT para autenticação

### Backend
- Node.js
- Express.js
- MySQL
- JWT

## 💻 Requisitos

- Node.js 14+
- MySQL 8+
- NPM ou Yarn

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/Gian-vie/IFRS-acao_voluntariado.git
```

2. Instale as dependências do frontend
```bash
cd front jwt
npm install
```

3. Instale as dependências do backend
```bash
cd back jwt
npm install
```

4. Configure o banco de dados
- Crie um banco MySQL
- Configure as credenciais no arquivo `.env`
- Execute as migrations

5. Inicie o backend
```bash
cd back jwt
npm start
```

6. Inicie o frontend
```bash
cd front jwt
npm start
```

## 🌟 Funcionalidades

### Usuários Comuns
- Visualizar eventos disponíveis
- Registrar-se no sistema
- Inscrever-se em eventos
- Visualizar inscrições realizadas

### Administradores
- Todas as funcionalidades de usuários comuns
- Criar novos eventos
- Gerenciar eventos existentes
- Visualizar lista de voluntários

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto backend:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=acao_voluntariado
JWT_SECRET=seu_secret
```

## 🤝 Contato

Gian Vieceli - gianvieceli@gmail.com

Link do Projeto: [https://github.com/Gian-vie/IFRS-acao_voluntariado.git](https://github.com/Gian-vie/IFRS-acao_voluntariado.git)