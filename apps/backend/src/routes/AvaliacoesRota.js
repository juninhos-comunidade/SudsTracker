import AvaliacoesController from "../controllers/AvaliacoesController.js";
import {Router} from "express";
import { validarUsuarioAtivo } from "../middlewares/autenticacaoMiddleware.js";

const router = Router();

router.post("/", validarUsuarioAtivo, AvaliacoesController.criarAvaliacao);
router.get("/paciente/:pacienteId", validarUsuarioAtivo, AvaliacoesController.encontrarTodasAsAvaliacoesPorPaciente);
router.get("/profissional/:profissionalId", validarUsuarioAtivo, AvaliacoesController.encontrarTodasAsAvaliacoesPorProfissional);
router.put("/:id", validarUsuarioAtivo, AvaliacoesController.atualizarAvaliacao);
router.delete("/:id", validarUsuarioAtivo, AvaliacoesController.deletarAvaliacaoPorId);
router.get("/:id", validarUsuarioAtivo, AvaliacoesController.encontrarAvaliacaoPorId);

export default router;


