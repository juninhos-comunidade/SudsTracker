export function validarEmail(email) {
  if (!email) return null;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? null : 'Digite um e-mail válido.';
}

export function validarForcaSenha(senha) {
  if (!senha) return null;
  if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
  if (!/[A-Z]/.test(senha)) return 'A senha deve conter pelo menos uma letra maiúscula.';
  if (!/[0-9]/.test(senha)) return 'A senha deve conter pelo menos um número.';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
    return 'A senha deve conter pelo menos um caractere especial.';
  }
  return null;
}
