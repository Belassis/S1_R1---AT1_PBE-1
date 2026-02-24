import produtoModel from "../models/produtos.model.js";

const produtoController = {
    
    //LISTAR TODOS OS PRODUTOS
    //GET /produtos

    // listarProdutos: async (req, res)=> {
    //     try {
    //         const produtos = await produtoModel.buscarTodos();

    //         res.status(200).json(produtos);
    //     } catch (error) {
    //         console.error('Erro ao listar produtos:', error); 
    //         res.status(500).json({message: 'Erro ao buscar produtos.'});
    //     }
    // },
     
    //CRIAR UM NOVO PRODUTO
    //POST /produtos
   /*
   {
   "nomeproduto": "valor"
   "valorproduto": "0.00"
   }
   */

   listarProdutos: async(req, res) => {
    try{
        const { id_produto } = req.query;
        if (id_produto) {
            if (id_produto.length!=36) {
                return res.status(400).json({erro: 'Id do produto não encontrado'})
            }
            const produto = await produtoModel.buscarUm(id_produto);
            res.status(200).json(produto);
        }
        const produtos = await produtoModel.buscarTodos();
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({message: 'Erro ao buscar produto'})
    }
   },


    criarProduto: async (req, res)=>{
        try {
            const {nomeproduto, valorproduto} = req.body; 

            if (nomeproduto == undefined || valorproduto ==undefined || isNaN(valorproduto)){
                return res.status(400).json({erro:'Campos obrigatórios não preenchidos!'
                });
            }

            await valorproduto.inserirProduto(nomeproduto, valorproduto);
            res.status(201).json({message:"Produto Cadastrado com sucesso!"});

        } catch (error) {
            console.error('Erro ao cadastrar os produtos:', error);
            res.status(500).json({erro:'Erro no servidor ao cadastrar produto'}); 
        }
    },

    //ATUALIZAR UM  PRODUTO
    //PUT /produtos/idProduto
    //nomeProduto e precoProduto são opcionais 
   /*
   {
   "nomeproduto": "valor"
   "valorproduto": "0.00"
   }
   */

    atualizarProduto: async (req,res) => {
        try {
            const{id_produto} = req.params; 
            const {nomeproduto, valorproduto} = req.body; //eles vão vir da requisição
            
            if(id_produto.length !=36){
                return res.status(400).json({erro: 'id do produto inválido!'});
            }
            
            
            const produto = await produtoModel.buscarUm(id_produto);
            //Ver se o produto existe👇
            if (!produto || produto.length !== 1) {
               return res.status(404).json({error:'Produto não encontrado!'}); 
            }

            const produtoAtual = produto[0];

            const nomeprodutoAtualizado = nomeproduto ?? produtoAtual.nomeproduto;
            const valorprodutoAtualizado = valorproduto ?? produtoAtual.valorproduto;

            await produtoModel.atualizarProduto(id_produto, nomeprodutoAtualizado, valorprodutoAtualizado);
            
            res.status(200).json({message: 'Produto atualizado com sucesso!'})
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({erro: "Erro no servidor ao atualizar produto."})
        }
    },

    deletarProduto: async (req,res) => {
        try {
            const{id_produto} = req.params; 
            
            if(id_produto.length !=36){
                return res.status(400).json({erro: 'id do produto inválido!'});
            }
             const produto = await produtoModel.buscarUm(id_produto);
            //Ver se o produto existe👇
            if (!produto || produto.length !== 1) {
               return res.status(404).json({error:'Produto não encontrado!'}); 
            }

            await produtoModel.deletarProduto(id_produto); 
            res.status(200).json({message: 'Produto deletado com sucesso!'});
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({erro: 'Erro no servidor ao deletar o produto'}); 
        }
    }
}

export default produtoController;

