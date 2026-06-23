import { Router } from "express";
import { loginUsuarioController } from "../controllers/loginUsuarioController.js";
import { UsuarioController } from '../controllers/UsuarioController.js';

const router = Router();
router.post('/login', loginUsuarioController.logarUsuario);
router.get('/email/:email', UsuarioController.buscarUsuarioPorEmail);

export default router;