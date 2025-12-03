require("dotenv").config(); // Carrega variáveis de ambiente
const logger = require("./src/config/logger"); // <<< 1. Importa o logger configurado


const app = require("./src/app"); // Importa o app já configurado (rotas, middlewares e tratamento de erros)
const PORT = process.env.PORT || 3000;

// Inicia o servidor Express para escutar na porta definida
app.listen(PORT, () => {
  // 2. Substitui console.log por logger.info e usa metadados estruturados
  logger.info(`Servidor iniciado com sucesso.`, {
    event: "server_startup",
    port: PORT,
    env: process.env.NODE_ENV || "development",
  });
});

// Boa prática: Registrar também o evento de erro de inicialização
app.on("error", (error) => {
  logger.error("Erro na inicialização do servidor", {
    event: "server_error",
    message: error.message,
    code: error.code,
  });
});
