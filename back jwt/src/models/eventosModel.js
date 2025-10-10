const db = require("../config/database");
// Importa a conexão pool com o banco de dados
class EventosModel {
  // Busca um evento pelo ID
  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM eventos WHERE id = ?", [id]);
    return rows[0];
  }
  // Busca todos os eventos
  static async findAll() {
    const [rows] = await db.query(`
  SELECT
    id,
    titulo,
    descricao,
    data,
    hora
  FROM
    eventos
  ORDER BY
    data ASC, hora ASC`);
    return rows;
  }
  // Busca um evento pelo título
  static async findByTitle(titulo) {
    const [rows] = await db.query("SELECT * FROM eventos WHERE titulo = ?", [
      titulo,
    ]);
    return rows[0];
  }
  // Cria um novo evento
  static async create(eventos) {
    const { titulo, descricao, data, hora } = eventos;
    const [result] = await db.query(
      "INSERT INTO eventos (titulo, descricao, data, hora) VALUES (?, ?, ?, ?)",
      [titulo, descricao, data, hora]
    );
    return result.insertId; // Retorna o ID do evento criado
  }
}
module.exports = EventosModel;
// Exporta a classe EventosModel para ser usada nos services
