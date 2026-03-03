import pool from "../config/database.js";

const categoriaModel = {

  async listar() {
    const [rows] = await pool.query("SELECT * FROM categorias");
    return rows;
  },

  async buscarPorId(idCategoria) {
    const [rows] = await pool.query(
      "SELECT * FROM categorias WHERE idCategoria = ?",
      [idCategoria]
    );

    return rows[0];
  },

  async criar({ nomeCategoria }) {
    const [result] = await pool.query(
      "INSERT INTO categorias (nomeCategoria) VALUES (?)",
      [nomeCategoria]
    );

    return {
      idCategoria: result.insertId,
      nomeCategoria
    };
  },

  async atualizar(idCategoria, { nomeCategoria }) {
    await pool.query(
      "UPDATE categorias SET nomeCategoria = ? WHERE idCategoria = ?",
      [nomeCategoria, idCategoria]
    );
  },

  async deletar(idCategoria) {
    await pool.query(
      "DELETE FROM categorias WHERE idCategoria = ?",
      [idCategoria]
    );
  }

};

export default categoriaModel;