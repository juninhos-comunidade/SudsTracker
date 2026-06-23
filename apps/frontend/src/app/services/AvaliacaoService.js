const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function registrarAvaliacaoProfissional(dadosAvaliacao) {
  try {
    const response = await fetch(`${API_URL}/avaliacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAvaliacao),
    });

    const data = await response.json().catch(() => null);
    if (response.ok) return { ok: true, data };
    return { ok: false, error: data?.error || 'Erro ao salvar avaliação.' };
  } catch (error) {
    console.error('registrarAvaliacaoProfissional', error);
    return { ok: false, error: 'Falha na conexão com o servidor.' };
  }
}
