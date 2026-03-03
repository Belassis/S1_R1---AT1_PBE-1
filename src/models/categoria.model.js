import pool from "../config/db.js";

const categoriaModel = {
    criarCategoria: async (pCategoria) => {
        const sql = 'INSERT INTO categoria (descricaoCategoria) VALUES (?)';
        const values = [pCategoria.descricaoCategoria];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },
    listarCategorias: async () => {
        const sql = "SELECT * FROM categoria ORDER BY idCategoria DESC";
        const [rows] = await pool.execute(sql);
        return rows;
    },

    atualizarCategoria: async (pCategoria) => {
        const sql = 'UPDATE categoria SET descricaoCategoria = ? WHERE idCategoria = ?';
        const values = [pCategoria.descricaoCategoria, pCategoria.idCategoria];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },

    deletarCategoria: async (idCategoria) => {
        const sql = 'DELETE FROM categoria WHERE idCategoria = ?';
        const [rows] = await pool.execute(sql, [idCategoria]);
        return rows;
    }
}

export default categoriaModel; 