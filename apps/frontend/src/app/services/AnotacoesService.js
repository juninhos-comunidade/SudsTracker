const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const tratarResposta = async (response) => {
  const data = await response.json().catch(() => null);

  if (response.ok) {
    return { ok: true, data };
  }

  const mensagemErro = data?.message || data?.error || 'Erro ao processar a requisição. Tente novamente.';
  return { ok: false, error: mensagemErro, data };
};

export async function registrarAnotacao(anotacao) {
  try {
    const response = await fetch(`${API_URL}/anotacoes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
    });

    return await tratarResposta(response);
  } catch (error) {
    console.error('AnotacoesService.buscarAnotacoesPorPaciente', error);
    return { ok: false, error: error?.message || 'Erro ao buscar históricos.' };
  }
}