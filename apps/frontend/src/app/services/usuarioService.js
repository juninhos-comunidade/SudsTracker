const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
    const response = await fetch(`${API_URL}/cadastro`, {
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
export async function buscarPacientePorUsuarioId(usuarioId) {
  try {
    const response = await fetch(`${API_URL}/pacientes/usuario/${usuarioId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json().catch(() => null);
    if (response.ok) {
      return { ok: true, data };
    }
    return { ok: false, error: data?.error || 'Erro ao buscar perfil do paciente.' };
  } catch (error) {
    console.error('buscarPacientePorUsuarioId', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}
export async function buscarProfissionalPorUsuarioId(usuarioId) {
  try {
    const response = await fetch(`${API_URL}/profissionais/usuario/${usuarioId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await tratarResposta(response);
  } catch (error) {
    console.error('buscarProfissionalPorUsuarioId', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}
export async function buscarUsuarioPorEmail(email) {
  try {
    const response = await fetch(`${API_URL}/usuarios/email/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await tratarResposta(response);
  } catch (error) {
    console.error('buscarUsuarioPorEmail', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}
