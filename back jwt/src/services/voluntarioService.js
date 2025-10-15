const VoluntariosModel = require('../models/voluntariosModel');
const EventosModel = require('../models/eventosModel');

class VoluntariosService {
  static async inscrever(id_usuario, id_evento) {
    // Verifica se o evento existe
    const evento = await EventosModel.findById(id_evento);
    if (!evento) {
      throw new Error('Evento não encontrado');
    }

    // Verifica se já está inscrito
    const inscricao = await VoluntariosModel.findInscricao(id_usuario, id_evento);
    if (inscricao) {
      throw new Error('Usuário já está inscrito neste evento');
    }

    // Realiza a inscrição
    await VoluntariosModel.create({ id_usuario, id_evento });
    return { message: 'Inscrição realizada com sucesso' };
  }
}

module.exports = VoluntariosService;