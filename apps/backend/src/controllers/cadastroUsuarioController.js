import { cadastroUsuarioService } from "../services/cadastroUsuarioService.js";

async function cadastrarUsuario(req, res) {
  try {
    const dadosCadastro = req.body;

    const resultadoCadastro = await cadastroUsuarioService.cadastrarUsuario(dadosCadastro);

    return res.status(201).json({
      mensagem: "Cadastro realizado com sucesso",
      ...resultadoCadastro, 
    });

  } catch (error) {
      console.error("Erro capturado no cadastro:", error);
      return res.status(400).json({ error: error.message });
  }
}

export const cadastroUsuarioController = { cadastrarUsuario };
