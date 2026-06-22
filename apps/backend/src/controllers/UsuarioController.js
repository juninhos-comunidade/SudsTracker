import {usuarioService} from "../services/UsuarioService.js"
async function buscarUsuarioPorEmail(req, res) {
  try {
    const { email } = req.params; 

    const usuario = await usuarioService.buscarPorEmail(email);

    return res.status(200).json({
      mensagem: "Usuário localizado com sucesso",
      usuario
    });
  } catch (error) {
    console.error("Erro ao buscar usuário por e-mail:", error);
    return res.status(404).json({ error: error.message });
  }
}

// Lembre-se de incluir no export do topo ou do final:
export const UsuarioController = { buscarUsuarioPorEmail };