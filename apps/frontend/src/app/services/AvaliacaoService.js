const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const tratarResposta = async (response) => {
  const data = await response.json().catch(() => null);

  if (response.ok) {
    return { ok: true, data };
  }

  const mensagemErro = data?.message || data?.error || 'Erro ao processar a requisição. Tente novamente.';
  return { ok: false, error: mensagemErro, data };
};

const getHeaders = () => {
  const token = localStorage.getItem('suds_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export async function registrarAvaliacaoProfissional(dadosAvaliacao) {
  try {
    const response = await fetch(`${API_URL}/avaliacoes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(dadosAvaliacao),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('registrarAvaliacaoProfissional', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}

export async function buscarAvaliacoesPorPaciente(pacienteId) {
  try {
    const response = await fetch(`${API_URL}/avaliacoes/paciente/${pacienteId}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('buscarAvaliacoesPorPaciente', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}

export async function buscarAvaliacoesPorProfissional(profissionalId) {
  try {
    const response = await fetch(`${API_URL}/avaliacoes/profissional/${profissionalId}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('buscarAvaliacoesPorProfissional', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}

export async function buscarAvaliacaoPorId(id) {
  try {
    const response = await fetch(`${API_URL}/avaliacoes/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('buscarAvaliacaoPorId', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}

export async function atualizarAvaliacao(id, dadosAvaliacao) {
  try {
    const response = await fetch(`${API_URL}/avaliacoes/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(dadosAvaliacao),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('atualizarAvaliacao', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}

export async function deletarAvaliacao(id) {
  try {
    const response = await fetch(`${API_URL}/avaliacoes/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (response.ok) {
      return { ok: true };
    }
    const data = await response.json().catch(() => null);
    return { ok: false, error: data?.message || data?.error || 'Erro ao deletar avaliação.' };
  } catch (error) {
    console.error('deletarAvaliacao', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}