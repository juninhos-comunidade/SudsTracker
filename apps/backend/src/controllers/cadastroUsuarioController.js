import { cadastroUsuarioService } from "../services/cadastroUsuarioService.js";

async function cadastrarUsuario(req, res) {
  try {
    const { nome, email, senha, dataNascimento, registroProfissional,telefone,especialidade, tipoUsuario } = req.body;
    console.log(req.body);

    const novoUsuario = await cadastroUsuarioService.cadastrarUsuario({
      nome,
      email,
      senha,
      dataNascimento,
      registroProfissional,
      telefone,
      especialidade,
      tipoUsuario
    });

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (error) {
    console.error("Erro capturado no cadastro:", error);
    return res.status(500).json({ error: error.message || "Erro interno do servidor." });
  }
}

export const cadastroUsuarioController = { cadastrarUsuario };
