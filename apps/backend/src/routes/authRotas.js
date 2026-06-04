import { Router } from "express";
import { autenticacaoController } from "../controllers/authController.js";

const router = Router();
const authController = new autenticacaoController();
router.post('/login', authController.autenticarUsuario);

export default router;