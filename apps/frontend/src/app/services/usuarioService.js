const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const tratarResposta = async (response) => {
  const data = await response.json().catch(() => null);

  if (response.ok) {
    return { ok: true, data };
  }

  const mensagemErro = data?.message || data?.error || 'Erro ao processar a requisição. Tente novamente.';
  return { ok: false, error: mensagemErro, data };
};

export async function cadastrarUsuario(payload) {
  try {
    const response = await fetch(`${API_URL}/usuarios/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('usuarioService.cadastrarUsuario', error);
    return { ok: false, error: error?.message || 'Erro ao criar conta. Tente novamente.' };
  }
}

export async function loginUsuario(payload) {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('usuarioService.loginUsuario', error);
    return { ok: false, error: error?.message || 'Erro ao fazer login. Tente novamente.' };
  }
}
