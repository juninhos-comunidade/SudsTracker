import { Router } from "express";
import  ProfissionalController from "../controllers/ProfissionalController.js";

const router = Router();


router.get("/", ProfissionalController.listarProfissionais); 
router.get("/:id", ProfissionalController.exibirProfissionalPorId);
router.get("/usuario/:usuarioId", ProfissionalController.exibirProfissionalPorUsuario);
router.get("/paciente/:pacienteId",ProfissionalController.encontrarProfissionalPorPaciente);
router.put("/:id", ProfissionalController.atualizarProfissional);
export default router;