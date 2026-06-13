import { Router } from "express";
import { loginUsuarioController } from "../controllers/loginUsuarioController.js";

const router = Router();
router.post('/login', loginUsuarioController.logarUsuario);

export default router;