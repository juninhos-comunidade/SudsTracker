import { Router } from 'express';
const router = Router();

import usuariosController from '../controllers/usuariosController';

router.post('/cadastro', usuariosController.cadastrarUsuario);
router.post('/login', usuariosController.logarUsuario);

export default router;
