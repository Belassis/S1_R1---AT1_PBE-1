import imagemController from "../controllers/imagem.controller.js";
import uploadImage from "../middlewares/uploadImage.middlware.js";
import { Router } from "express";

const imagemRoutes = Router();

imagemRoutes.post('/produtos/imagens', uploadImage, imagemController.upload);


export default imagemRoutes