import pool from "../config/db.js";

const produtoModel = {
    insert:async (pProduto) => {
        const sql = 'INSERT INTO Produtos (idCategoria, nomeproduto, valorproduto, vinculoimgaem) VALUES (?,?,?,?)';
        const values = [pProduto.idCategoria, pProduto.nomeproduto, pProduto.valorproduto, pProduto.vinculoimgaem];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },
     selecionarTodos: async () => {
        const sql = "SELECT * FROM produtos;";
        const [rows] = await pool.execute(sql);
        return rows;
    },
     criarProduto: async (req, res) => {
        try {
            const { nomeproduto, valorproduto } = req.body;
            if (nomeproduto == undefined || nomeproduto == undefined || isNaN(valorproduto)) {
                return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos!!' })
            }

            await produtoModel.inserirProduto(nomeproduto, valorproduto);

            res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
        } catch (error) {
            console.error("Erro ao criar produto: ", error)
            res.status(500).json({ erro: 'Erro no servidor ao cadastrar produto!' })
        }
    },

    atualizarProduto: async (req, res) => {
        try {
            const { idproduto } = req.params; 
            const { nomeproduto, valorproduto, vinculoimgaem} = req.body;

        
            if (idproduto.length != 36) {
                return res.status(400).json({ erro: 'id do produto inválido!' })
            }

            const produto = await produtoModel.buscarUm(idproduto);

            if (!produto || produto.length !== 1) {
                return res.status(404).json({ error: 'Produto não encontrado!' })
            }


            const produtoAtual = produto[0]; 

            const nomeprodutoAtualizado = nomeproduto ?? produtoAtual.nomeproduto;
            const valorprodutoAtualizado = valorproduto ?? produtoAtual.valorproduto;
            const vinculoimgaemAtualizado = vinculoimgaem ?? produtoAtual.vinculoimgaem;


            await produtoModel.atualizarProduto(idproduto,nomeprodutoAtualizado, valorprodutoAtualizado, vinculoimgaemAtualizado);

            return res.status(200).json({ message: 'Produto atualizado com sucesso' })
        } catch (error) {
            console.error("Erro ao criar produto: ", error)
            res.status(500).json({ erro: 'Erro no servidor ao atualizar o produto!' })
        }
    },
    deletarProduto: async (req, res) => {
        try {
            const { idproduto } = req.params; 

            if (idproduto.length != 36) {
                return res.status(400).json({ erro: 'id do produto inválido!' })
            }

            const produto = await produtoModel.buscarUm(idproduto);

            
            if (!produto || produto.length !== 1) {
                return res.status(404).json({ error: 'Produto não encontrado!!!!!' })
            }

            await produtoModel.deletarProduto(idproduto);
            return res.status(200).json({ message: "Produto deletado com sucessooo!" })
        } catch (error) {
            console.error("Erro ao criar produto: ", error)
            res.status(500).json({ erro: 'Erro no servidor ao atualizar o produto!' })
        }
    }

}

export default produtoModel;