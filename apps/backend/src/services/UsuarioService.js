import userRepository from "../repositories/userRepository.js";
async function buscarPorEmail(email) {
  if (!email) {
    throw new Error("O e-mail é obrigatório para realizar a busca.");
  }

  const usuario = await userRepository.encontrarPorEmail(email.trim().toLowerCase());

  if (!usuario) {
    throw new Error("Nenhum usuário cadastrado com este e-mail.");
  }
   if (!usuario.ativo) {
    throw new Error("Esta conta está desativada.");
  }

  const { senha: _, ...usuarioSemSenha } = usuario;
  return usuarioSemSenha;
}
async function buscarPorId(usuarioId) {
  if (!usuarioId) {
    throw new Error("O id é obrigatório para realizar a busca.");
  }

  const usuario = await userRepository.encontrarPorId(usuarioId);

  if (!usuario) {
    throw new Error("Nenhum usuário cadastrado com este id.");
  }
   if (!usuario.ativo) {
    throw new Error("Esta conta está desativada.");
  }
  const { senha: _, ...usuarioSemSenha } = usuario;
  return usuarioSemSenha;
}

// Lembre-se de exportar a função junto com as outras:
export const usuarioService = { buscarPorEmail, buscarPorId };