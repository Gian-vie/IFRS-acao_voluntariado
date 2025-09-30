const EventosService = require("../services/eventosService");

// Controlador responsável por lidar com rotas protegidas por autenticação JWT
class ProtectedController {
  // Método que responde ao painel do usuário autenticado
  static dashboard(req, res) {
    try {
      // Responde com uma mensagem usando o e-mail do usuário autenticado
      return res.status(200).json({
        message: `Bem-vindo ao painel,
        ${req.user.email}`,
      });
    } catch (error) {
      // Em caso de erro inesperado, retorna erro interno do servidor
      return res
        .status(500)
        .json({ message: "Erro ao acessar o painel", error: error.message });
    }
  }
  // Método exclusivo para usuários com permissão de admin
  static adminOnly(req, res) {
    try {
      // Responde com uma mensagem personalizada usando o e-mail do administrador autenticado
      return res.status(200).json({
        message: `Bem-vindo à área admin,
        ${req.user.email}`,
      });
    } catch (error) {
      // Em caso de erro inesperado, retorna erro interno do servidor
      return res
        .status(500)
        .json({
          message: "Erro ao acessar a área admin",
          error: error.message,
        });
    }
  }
  //metodo estatic que trata o registro de um novo evento
  static async registerEvent(req, res) {
    try {
      // Chama o serviço para registrar o evento, passando os dados da requisição
      const result = await EventosService.registerEvent(req.body);
      // Retorna status 201 (Criado) com os dados retornados pelo serviço
      return res.status(201).json(result);
    } catch (error) {
      // Em caso de erro (ex: evento já existe), retorna status 409 (Conflito) com a mensagem do erro
      return res.status(409).json({ message: error.message });
    }
  }
}
// Exporta o controlador para ser utilizado nas rotas protegidas
module.exports = ProtectedController;
