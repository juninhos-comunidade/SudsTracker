import AnotacoesController from "../controllers/AnotacoesController.js";
import {Router} from "express";
import { validarUsuarioAtivo } from "../middlewares/autenticacaoMiddleware.js";

const router = Router();

router.post("/", validarUsuarioAtivo, AnotacoesController.criarAnotacao);
router.get("/paciente/:pacienteId", validarUsuarioAtivo, AnotacoesController.encontrarTodasAsAnotacoesPorPaciente);
router.put("/:id", validarUsuarioAtivo, AnotacoesController.atualizarAnotacao);
router.delete("/:id", validarUsuarioAtivo, AnotacoesController.deletarAnotacaoPorId);
router.get("/:id", validarUsuarioAtivo, AnotacoesController.encontrarAnotacaoPorId);

export default router;


