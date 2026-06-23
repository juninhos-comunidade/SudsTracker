import { Router } from "express";
import  PacienteController from "../controllers/pacienteController.js";
import { validarUsuarioAtivo } from "../middlewares/autenticacaoMiddleware.js";
const router = Router();

router.get("/", validarUsuarioAtivo, PacienteController.listarPacientes); 
router.get("/usuario/:idUsuario", validarUsuarioAtivo, PacienteController.exibirPacientePorUsuario);
router.get("/profissional/:profissionalId", validarUsuarioAtivo, PacienteController.listarPacientesPorProfissional);
router.get("/:id", validarUsuarioAtivo, PacienteController.exibirPacientePorId); 
router.put("/:id/atribuir-profissional", validarUsuarioAtivo, PacienteController.alterarProfissional);

export default router;