import produtoController from "../controllers/produto.controller.js";
import uploadImage from "../middlewares/uploadImage.middlware.js";
import { Router } from "express";

const produtoRoutes = Router();

produtoRoutes.post('/produtos/imagens', uploadImage, produtoController.upload);


export default produtoRoutes