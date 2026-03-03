import categoriaModel from "../models/categoria.model.js";

const categoriaController = {
    cadastrarCategoria: async (req, res) => {
        try {
            const { descricaoCategoria } = req.body;

            if (!descricaoCategoria) {
                return res.status(400).json({ message: 'Descrição da categoria é obrigatória' });
            }

            const result = await categoriaModel.insert({ descricaoCategoria });

            if (result.insertId > 0) {
                return res.status(201).json({ 
                    message: 'Categoria cadastrada com sucesso',
                    idCategoria: result.insertId
                });
            }
            return res.status(400).json({ message: 'Erro ao cadastrar categoria' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

    listarCategorias: async (req, res) => {
        try {
            const categorias = await categoriaModel.buscarCategoria();
            return res.status(200).json(categorias);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

    buscarCategoria: async (req, res) => {
        try {
            const { idCategoria } = req.params;
            const categoria = await categoriaModel;

            if (!categoria) {
                return res.status(404).json({ message: 'Acho que a sua categoria não encontrada!' });
            }

            return res.status(200).json(categoria);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor!', errorMessage: error.message });
        }
    },
    editarCategoria: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricaoCategoria } = req.body;

            if (!descricaoCategoria) {
                return res.status(400).json({ message: 'Descrição não ´preenchida!' });
            }

            const categoriaExistente = await categoriaModel.selectById(id);
            if (!categoriaExistente) {
                return res.status(404).json({ message: 'Acho que a sua categoria não encontrada!' });
            }

            await categoriaModel.update({ idCategoria: id, descricaoCategoria });

            return res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor!', errorMessage: error.message });
        }
    },
    excluirCategoria: async (req, res) => {
        try {
            const { idCategoria } = req.params;

            const categoriaExistente = await categoriaModel.selectById(id);
            if (!categoriaExistente) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            await categoriaModel.delete(id);

            return res.status(200).json({ message: 'Categoria excluída com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    }
}

export default categoriaController;
