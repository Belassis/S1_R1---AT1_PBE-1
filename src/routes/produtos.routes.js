const express  = require("express")
const router = express.Router(); 
const {} = require("../controllers/produtoController");
const produtoController = require("../controllers/produtoController");

router.get("/produtos", produtoController.listarProdutos);

router.post("/produtos", produtoController.criarProduto);

router.put("/produtos/:idProduto", produtoController.atualizarProduto);

router.delete("/produtos/:idProduto", produtoController.deletarProduto);

export default produtoController;