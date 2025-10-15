const db = require("../config/database");

class VoluntariosModel {
  // Cria uma nova inscrição de voluntário
  static async create({ id_usuario, id_evento }) {
    try {
      const [result] = await db.query(
        "INSERT INTO inscricoes_eventos (id_usuario, id_evento) VALUES (?, ?)",
        [id_usuario, id_evento]
      );
      return result.insertId;
    } catch (error) {
      // Se der erro de chave duplicada (usuário já inscrito)
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Usuário já está inscrito neste evento');
      }
      throw error;
    }
  }

  // Verifica se um usuário já está inscrito em um evento
  static async findInscricao(id_usuario, id_evento) {
    const [rows] = await db.query(
      "SELECT * FROM inscricoes_eventos WHERE id_usuario = ? AND id_evento = ?",
      [id_usuario, id_evento]
    );
    return rows[0];
  }

  // Lista todas as inscrições de um usuário
  static async findByUser(id_usuario) {
    const [rows] = await db.query(`
      SELECT e.* 
      FROM eventos e
      INNER JOIN inscricoes_eventos ie ON e.id = ie.id_evento
      WHERE ie.id_usuario = ?
    `, [id_usuario]);
    return rows;
  }

  // Lista todos os voluntários de um evento
  static async findByEvent(id_evento) {
    const [rows] = await db.query(`
      SELECT u.id, u.email 
      FROM users u
      INNER JOIN inscricoes_eventos ie ON u.id = ie.id_usuario
      WHERE ie.id_evento = ?
    `, [id_evento]);
    return rows;
  }
}

module.exports = VoluntariosModel;