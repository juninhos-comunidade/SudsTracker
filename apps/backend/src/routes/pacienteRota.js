import { Router } from "express";
const router = Router();

import  PacienteController from "../controllers/pacienteController.js";
router.get("/", PacienteController.listarPacientes);
router.get("/:id", PacienteController.exibirPacientePorId);
router.get("/usuario/:idUsuario", PacienteController.exibirPacientePorUsuario);
router.get("/profissional/:profissionalId", PacienteController.listarPacientesPorProfissional);
router.put("/:id/atribuir-profissional", PacienteController.alterarProfissional);

export default router;