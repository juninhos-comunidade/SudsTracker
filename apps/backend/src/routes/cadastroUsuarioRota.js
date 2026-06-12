import { Router } from "express";
import { cadastroUsuarioController } from "../controllers/cadastroUsuarioController.js";

const router = Router();
router.post("/cadastro", cadastroUsuarioController.cadastrarUsuario);

export default router;
