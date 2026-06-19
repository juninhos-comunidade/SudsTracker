import { loginUsuarioService } from '../services/loginUsuarioService.js';

async function logarUsuario(req, res) {
  try{
    const { email, senha } = req.body;
    console.log(req.body);


    const loginUsuario = await loginUsuarioService.logarUsuario({ email, senha });

    res.status(200).json({
      mensagem: "Login realizado com sucesso",
      ...loginUsuario,
    });

  } catch(error) {
      console.error("Erro capturado no login:", error);
      return res.status(401).json({ error: error.message })
  }
}

export const loginUsuarioController = { logarUsuario };