import produtoModel from "../models/produtos.model.js";

const produtoController = {

    //LISTAR TODOS OS PRODUTOS
    //GET /produtos

    /*
    Se passar ?idproduto= na query ele busca um só
    */

    listarProdutos: async (req, res) => {
        try {

            const { idproduto } = req.query;

            if (idproduto) {

                const produto = await produtoModel.buscarPorId(idproduto);

                if (!produto) {
                    return res.status(404).json({ erro: 'Produto não encontrado!' });
                }

                return res.status(200).json(produto);
            }

            const produtos = await produtoModel.listar();
            return res.status(200).json(produtos);

        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ message: 'Erro ao buscar produto' });
        }
    },


    //CRIAR UM NOVO PRODUTO
    //POST /produtos
    /*
    {
      "nomeproduto": "valor",
      "valorproduto": 0.00
    }
    */

    criarProduto: async (req, res) => {
        try {

            const { nomeproduto, valorproduto } = req.body;

            if (!nomeproduto || valorproduto === undefined || isNaN(valorproduto)) {
                return res.status(400).json({
                    erro: 'Campos obrigatórios não preenchidos ou valor inválido!'
                });
            }

            await produtoModel.criar({ nomeproduto, valorproduto });

            return res.status(201).json({ message: "Produto cadastrado com sucesso!" });

        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            return res.status(500).json({ erro: 'Erro no servidor ao cadastrar produto' });
        }
    },


    //ATUALIZAR UM PRODUTO
    //PUT /produtos/:idproduto
    //nomeproduto e valorproduto são opcionais
    /*
    {
      "nomeproduto": "valor",
      "valorproduto": 0.00
    }
    */

    atualizarProduto: async (req, res) => {
        try {

            const { idproduto } = req.params;
            const { nomeproduto, valorproduto } = req.body;

            const produtoAtual = await produtoModel.buscarPorId(idproduto);

            //Ver se o produto existe👇
            if (!produtoAtual) {
                return res.status(404).json({ error: 'Produto não encontrado!' });
            }

            const nomeprodutoAtualizado = nomeproduto ?? produtoAtual.nomeproduto;
            const valorprodutoAtualizado = valorproduto ?? produtoAtual.valorproduto;

            await produtoModel.atualizar(idproduto, {
                nomeproduto: nomeprodutoAtualizado,
                valorproduto: valorprodutoAtualizado
            });

            return res.status(200).json({ message: 'Produto atualizado com sucesso!' });

        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            return res.status(500).json({ erro: "Erro no servidor ao atualizar produto." });
        }
    },


    //DELETAR UM PRODUTO

    deletarProduto: async (req, res) => {
        try {

            const { idproduto } = req.params;

            const produto = await produtoModel.buscarPorId(idproduto);

            //Ver se o produto existe👇
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado!' });
            }

            await produtoModel.deletar(idproduto);

            return res.status(200).json({ message: 'Produto deletado com sucesso!' });

        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            return res.status(500).json({ erro: 'Erro no servidor ao deletar o produto' });
        }
    }

};

export default produtoController;