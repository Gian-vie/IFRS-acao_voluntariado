const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true,
});

const sql = `
-- Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS acao_voluntarioado CHARACTER SET utf8mb4 COLLATE
utf8mb4_unicode_ci;
-- Usa o banco de dados
USE acao_voluntarioado;
-- Cria a tabela de usuários
CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role VARCHAR(50) NOT NULL DEFAULT 'user',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- crir tabela de eventos
CREATE TABLE IF NOT EXISTS eventos (
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(255) NOT NULL UNIQUE,
descricao VARCHAR(255) NOT NULL,
data_hora DATETIME NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

connection.query(sql, (err, results) => {
  if (err) {
    console.error("Erro ao criar banco de dados:", err);
  } else {
    console.log("Banco de dados e tabelas criados com sucesso!");
  }
  connection.end();
});
