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

export async function vincularPacienteAoProfissional(pacienteId, profissionalId) {
  try {
    const response = await fetch(`${API_URL}/pacientes/${pacienteId}/atribuir-profissional`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ id_profissional: Number(profissionalId) }),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('vincularPacienteAoProfissional', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}

export async function listarPacientesPorProfissional(profissionalId) {
  try {
    const response = await fetch(`${API_URL}/pacientes/profissional/${profissionalId}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('listarPacientesPorProfissional', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}