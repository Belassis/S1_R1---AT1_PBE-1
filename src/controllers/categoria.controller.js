import categoriaModel from "../models/categoria.model.js";

const categoriaController = {

  async listarCategorias(req, res) {
    try {
      const categorias = await categoriaModel.listar();
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao listar categorias" });
    }
  },

  async criarCategoria(req, res) {
    try {
      const { nomeCategoria } = req.body;

      if (!nomeCategoria) {
        return res.status(400).json({ erro: "Nome da categoria é obrigatório" });
      }

      const novaCategoria = await categoriaModel.criar({ nomeCategoria });

      return res.status(201).json(novaCategoria);

    } catch (error) {
      return res.status(500).json({ erro: "Erro ao criar categoria" });
    }
  },

  async atualizarCategoria(req, res) {
    try {
      const { idCategoria } = req.params;
      const { nomeCategoria } = req.body;

      const categoriaExistente = await categoriaModel.buscarPorId(idCategoria);

      if (!categoriaExistente) {
        return res.status(404).json({ erro: "Categoria não encontrada" });
      }

      await categoriaModel.atualizar(idCategoria, { nomeCategoria });

      return res.status(200).json({ mensagem: "Categoria atualizada com sucesso" });

    } catch (error) {
      return res.status(500).json({ erro: "Erro ao atualizar categoria" });
    }
  },

  async deletarCategoria(req, res) {
    try {
      const { idCategoria } = req.params;

      const categoriaExistente = await categoriaModel.buscarPorId(idCategoria);

      if (!categoriaExistente) {
        return res.status(404).json({ erro: "Categoria não encontrada" });
      }

      await categoriaModel.deletar(idCategoria);

      return res.status(200).json({ mensagem: "Categoria deletada com sucesso" });

    } catch (error) {
      return res.status(500).json({ erro: "Erro ao deletar categoria" });
    }
  }

};

export default categoriaController;