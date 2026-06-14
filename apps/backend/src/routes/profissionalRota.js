import { Router } from "express";
const router = Router();

import  ProfissionalController from "../controllers/ProfissionalController.js";

router.get("/", ProfissionalController.listarProfissionais); 
router.get("/:id", ProfissionalController.exibirProfissionalPorId);
router.get("/usuario/:usuarioId", ProfissionalController.exibirProfissionalPorUsuario);
router.get("/paciente/:pacienteId",ProfissionalController.exibirProfissionalPorPaciente);
router.put("/:id", ProfissionalController.atualizarProfissional);
export default router;