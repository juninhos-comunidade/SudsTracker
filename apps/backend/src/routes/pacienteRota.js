import { Router } from "express";
const router = Router();

import  PacienteController from "../controllers/pacienteController.js";

router.post("/paciente/buscar", PacienteController.exibirPacientePorId);
router.post("/paciente/atribuir", PacienteController.alterarProfissional);

export default router;