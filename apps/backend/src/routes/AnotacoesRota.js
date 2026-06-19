import AnotacoesController from "../controllers/AnotacoesController.js";
import {Router} from "express";

const router = Router();

router.post("/",AnotacoesController.criarAnotacao);
router.put("/:id",AnotacoesController.atualizarAnotacao);
router.delete("/:id",AnotacoesController.deletarAnotacaoPorId);
router.get("/:id",AnotacoesController.encontrarAnotacaoPorId);
router.get("/paciente/:pacienteId",AnotacoesController.encontrarTodasAsAnotacoesPorPaciente);

export default router;


