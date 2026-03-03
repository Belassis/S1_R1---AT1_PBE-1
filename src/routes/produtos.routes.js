import { Router } from "express";
import produtoController from "../controllers/produto.controller.js";

const router = Router();
router.get("/produtos", produtoController.listarProdutos);

router.post("/produtos", produtoController.criarProduto);
router.put("/produtos/:idproduto", produtoController.atualizarProduto);
router.delete("/produtos/:idproduto", produtoController.deletarProduto);

export default router;