import AvaliacoesController from "../controllers/AvaliacoesController.js";
import {Router} from "express";

const router = Router();

router.post("/",AvaliacoesController.criarAvaliacao);
router.put("/:id",AvaliacoesController.atualizarAvaliacao);
router.delete("/:id",AvaliacoesController.deletarAvaliacaoPorId);
router.get("/:id",AvaliacoesController.encontrarAvaliacaoPorId);
router.get("/paciente/:pacienteId",AvaliacoesController.encontrarTodasAsAvaliacoesPorPaciente);
router.get("/profissional/:profissionalId",AvaliacoesController.encontrarTodasAsAvaliacoesPorProfissional);

export default router;


