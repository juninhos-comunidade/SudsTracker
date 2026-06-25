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

export async function registrarAnotacao(anotacao) {
  try {
    const response = await fetch(`${API_URL}/anotacoes/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(anotacao),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('AnotacoesService.registrarAnotacao', error);
    return { ok: false, error: error?.message || 'Erro ao criar anotação. Tente novamente.' };
  }
}

export async function buscarAnotacoesPorPaciente(pacienteId) {
  try {
    const response = await fetch(`${API_URL}/anotacoes/paciente/${pacienteId}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('AnotacoesService.buscarAnotacoesPorPaciente', error);
    return { ok: false, error: error?.message || 'Erro ao buscar históricos.' };
  }
}

export async function buscarAnotacaoPorId(id) {
  try {
    const response = await fetch(`${API_URL}/anotacoes/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('AnotacoesService.buscarAnotacaoPorId', error);
    return { ok: false, error: error?.message || 'Erro ao buscar anotação.' };
  }
}

export async function atualizarAnotacao(id, anotacao) {
  try {
    const response = await fetch(`${API_URL}/anotacoes/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(anotacao),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('AnotacoesService.atualizarAnotacao', error);
    return { ok: false, error: error?.message || 'Erro ao atualizar anotação.' };
  }
}

export async function deletarAnotacao(id) {
  try {
    const response = await fetch(`${API_URL}/anotacoes/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (response.ok) {
      return { ok: true };
    }
    const data = await response.json().catch(() => null);
    return { ok: false, error: data?.message || data?.error || 'Erro ao deletar anotação.' };
  } catch (error) {
    console.error('AnotacoesService.deletarAnotacao', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}