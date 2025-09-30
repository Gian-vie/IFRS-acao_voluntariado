const eventosModel = require("../models/eventosModel"); // Model responsável pelo acesso à tabela de usuários no banco
// Classe que contém os serviços relacionados ao evento, como registro e login
class EventosService {
  // Método para registrar um novo evento
  static async registerEvent(evento) {
    const { titulo, descricao, data, hora } = evento;
    // Verifica se o evento já está cadastrado
    const existing = await eventosModel.findByTitle(titulo);
    if (existing) {
      throw new Error("Já existe um evento com este título");
    }
    const data_hora = `${data} ${hora}:00`;
    // Cria o novo evento e retorna seu ID
    const id = await eventosModel.create({
      titulo,
      descricao,
      data: data_hora,
    });
    // Retorna os dados de sucesso (sem lançar erro)
    return { message: "Evento registrado com sucesso", id };
  }
}
module.exports = EventosService;
