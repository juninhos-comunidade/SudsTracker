import { Router } from "express";
const router = Router();

import usuariosController from "../controllers/cadastroUsuarioController.js";

router.post("/", usuariosController.cadastrarUsuario);

export default router;
