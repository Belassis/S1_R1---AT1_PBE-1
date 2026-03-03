import produtoController from "../controllers/produto.controller.js";
import { Router } from "express";

const produtoRoutes = Router();

produtoRoutes.post('/produtos', produtoController);
produtoRoutes.get('/produtos', produtoController);
produtoRoutes.delete('/produtos', produtoController);
produtoRoutes.put('/produtos', produtoController);


export default produtoRoutes