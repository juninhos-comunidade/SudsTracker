const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';


const tratarResposta = async (response) => {
  const data = await response.json().catch(() => null);

  if (response.ok) {
    return { ok: true, data };
  }

  const mensagemErro = data?.message || data?.error || 'Erro ao processar a requisição. Tente novamente.';
  return { ok: false, error: mensagemErro, data };
};

export async function vincularPacienteAoProfissional(pacienteId, profissionalId) {
  try {
    const response = await fetch(`${API_URL}/pacientes/${pacienteId}/atribuir-profissional`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_profissional: Number(profissionalId) }),
    });

    const data = await response.json().catch(() => null);
    if (response.ok) return { ok: true, data };
    return { ok: false, error: data?.error || 'Erro ao vincular paciente.' };
  } catch (error) {
    console.error('vincularPacienteAoProfissional', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}