const EventosModel = require("../models/eventosModel");

// Controlador responsável por lidar com rotas públicas da aplicação
class PublicController {
  // Método que responde à rota pública inicial
  static home(req, res) {
    try {
      // Envia uma mensagem de boas-vindas sem exigir autenticação
      return res.status(200).send("Bem-vindo à API pública!");
    } catch (error) {
      // Em caso de erro inesperado, retorna status 500 com a mensagem do erro
      return res
        .status(500)
        .json({
          message: "Erro ao acessar a rota pública",
          error: error.message,
        });
    }
  }
  static async eventList(req, res) {
    try {
      const eventos = await EventosModel.findAll();
      console.log(res.status(200).json(eventos));
      return res.status(200).json(eventos);
    } catch (error) {
      // Em caso de erro inesperado, retorna status 500 com a mensagem do erro
      return res
        .status(500)
        .json({
          message: "Erro ao carregar a lista de eventos",
          error: error.message,
        });
    }
  }
}
// Exporta o controlador para ser utilizado nas rotas públicas
module.exports = PublicController;
