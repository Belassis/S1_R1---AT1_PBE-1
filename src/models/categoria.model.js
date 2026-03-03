import pool from "../config/db.js";

const categoriaModel = {
    Cadastrar: async (pCategoria) => {
        const sql = 'INSERT INTO categoria (descricaoCategoria) VALUES (?)';
        const values = [pCategoria.descricaoCategoria];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },
    SelecionarTodos: async () => {
        const sql = "SELECT * FROM categoria ORDER BY idCategoria DESC";
        const [rows] = await pool.execute(sql);
        return rows;
    },

    Atualizar: async (pCategoria) => {
        const sql = 'UPDATE categoria SET descricaoCategoria = ? WHERE idCategoria = ?';
        const values = [pCategoria.descricaoCategoria, pCategoria.idCategoria];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },

    Deletar: async (idCategoria) => {
        const sql = 'DELETE FROM categoria WHERE idCategoria = ?';
        const [rows] = await pool.execute(sql, [idCategoria]);
        return rows;
    }
}

export default categoriaModel; 