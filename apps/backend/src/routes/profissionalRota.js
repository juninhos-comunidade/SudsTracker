import { Router } from "express";
import  ProfissionalController from "../controllers/ProfissionalController.js";
import { validarUsuarioAtivo } from "../middlewares/autenticacaoMiddleware.js";

const router = Router();


router.get("/", validarUsuarioAtivo, ProfissionalController.listarProfissionais); 
router.get("/usuario/:usuarioId", validarUsuarioAtivo, ProfissionalController.exibirProfissionalPorUsuario);
router.get("/paciente/:pacienteId", validarUsuarioAtivo, ProfissionalController.encontrarProfissionalPorPaciente);
router.get("/:id", validarUsuarioAtivo, ProfissionalController.exibirProfissionalPorId);
router.put("/:id", validarUsuarioAtivo, ProfissionalController.atualizarProfissional);
export default router;