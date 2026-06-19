import { Router } from "express";
import { cadastroUsuarioController } from "../controllers/cadastroUsuarioController.js";

const router = Router();

import usuariosController from "../controllers/cadastroUsuarioController.js";

router.post("/", usuariosController.cadastrarUsuario);

export default router;
