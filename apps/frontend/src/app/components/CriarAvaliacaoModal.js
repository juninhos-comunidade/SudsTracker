'use client';
import { useState } from 'react';
import styles from './CriarAvaliacaoModal.module.css';
import { registrarAvaliacaoProfissional } from '../services/AvaliacaoService';
import { useUser } from '@/app/context/UserContext';

const TECNICAS = [
  'TCC (Terapia Cognitivo-Comportamental)',
  'Exposição Gradual',
  'Respiração Diafragmática',
  'Mindfulness',
  'Reestruturação Cognitiva',
  'EMDR',
  'Psicoeducação',
  'Relaxamento Muscular Progressivo',
];

const PONTOS_POSITIVOS = [
  'Identificou gatilhos',
  'Utilizou estratégias de enfrentamento',
  'Demonstrou abertura ao processo',
  'Cumpriu tarefas da semana',
  'Relatou melhora no sono',
  'Manteve regularidade nos registros',
];

const EVOLUCOES = ['Melhorando', 'Estável', 'Oscilando', 'Piorando'];

const obterInfoSuds = (nivel) => {
  if (nivel <= 10) return { emoji: '😌', texto: 'Muito calmo' };
  if (nivel <= 25) return { emoji: '🙂', texto: 'Levemente incomodado' };
  if (nivel <= 50) return { emoji: '😟', texto: 'Moderadamente ansioso' };
  if (nivel <= 70) return { emoji: '😰', texto: 'Bastante ansioso' };
  if (nivel <= 90) return { emoji: '😨', texto: 'Muito ansioso' };
  return { emoji: '😱', texto: 'Pânico' };
};

export default function CriarAvaliacaoModal({ onClose, paciente, profissionalId }) {
  const [etapa, setEtapa] = useState(1);
  const { perfilId } = useUser();

  // — Etapa 1
  const [tituloSessao, setTituloSessao] = useState('');
  const [tecnicasSelecionadas, setTecnicasSelecionadas] = useState([]);
  const [evolucao, setEvolucao] = useState('');
  const [pontosSelecionados, setPontosSelecionados] = useState([]);

  // — Etapa 2
  const [sudsObservado, setSudsObservado] = useState(50);
  const [objetivoSemana, setObjetivoSemana] = useState('');
  const [mensagemPaciente, setMensagemPaciente] = useState('');

  const [salvando, setSalvando] = useState(false);

  const toggleTecnica = (tecnica) => {
    setTecnicasSelecionadas((prev) =>
      prev.includes(tecnica) ? prev.filter((t) => t !== tecnica) : [...prev, tecnica]
    );
  };

  const togglePonto = (ponto) => {
    setPontosSelecionados((prev) =>
      prev.includes(ponto) ? prev.filter((p) => p !== ponto) : [...prev, ponto]
    );
  };

  const podeContinuar = tituloSessao.trim() !== '' && evolucao !== '';

  const handleSalvar = async () => {
    const idProfissional = profissionalId || perfilId;

    if (!idProfissional) {
      alert('Erro ao identificar seu perfil profissional. Tente fazer login novamente.');
      return;
    }

    if (!paciente?.id) {
      alert('Erro ao identificar o paciente. Feche o modal e tente novamente.');
      return;
    }

    setSalvando(true);

    const dadosAvaliacao = {
      id_profissional: Number(idProfissional),
      id_paciente: Number(paciente.id),
      titulo: tituloSessao,
      tecnicas_utilizadas: tecnicasSelecionadas.join(', '),
      evolucao_percebida: evolucao,
      pontos_positivos: pontosSelecionados.join(', '),
      suds_observado: Number(sudsObservado),
      objetivo_semana: objetivoSemana || null,
      mensagem_paciente: mensagemPaciente || null,
    };

    const resultado = await registrarAvaliacaoProfissional(dadosAvaliacao);

    setSalvando(false);

    if (resultado.ok) {
      alert('Avaliação registrada com sucesso!');
      onClose(true); // 💡 Passa true para sinalizar que deve recarregar as avaliações
    } else {
      alert(`Erro ao salvar: ${resultado.error}`);
    }
  };

  const { emoji, texto } = obterInfoSuds(sudsObservado);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={() => onClose(false)}>✕</button>

        <div className={styles.header}>
          <div className={styles.pacienteInfo}>
            <div className={styles.avatarMini}>
              {paciente?.usuario?.nome?.charAt(0).toUpperCase() ?? '?'}
            </div>
            <span className={styles.pacienteNome}>{paciente?.usuario?.nome ?? 'Paciente'}</span>
          </div>
          <h2>Nova Avaliação Clínica</h2>
          <p className={styles.subtitle}>Etapa {etapa} de 2</p>
        </div>

        {/* ── ETAPA 1 ── */}
        {etapa === 1 && (
          <div className={styles.etapaContainer}>

            <div className={styles.campo}>
              <label>Título da sessão <span className={styles.obrigatorio}>*</span></label>
              <input
                type="text"
                placeholder="Ex: Sessão 4 — Exposição gradual"
                value={tituloSessao}
                onChange={(e) => setTituloSessao(e.target.value)}
              />
            </div>

            <div className={styles.campo}>
              <label>Evolução percebida <span className={styles.obrigatorio}>*</span></label>
              <div className={styles.evolucaoGrid}>
                {EVOLUCOES.map((op) => (
                  <button
                    key={op}
                    type="button"
                    className={`${styles.evolucaoBtn} ${evolucao === op ? styles.evolucaoBtnAtivo : ''}`}
                    onClick={() => setEvolucao(op)}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.campo}>
              <label>Técnicas utilizadas <span className={styles.opcional}>(opcional)</span></label>
              <div className={styles.checkboxGrid}>
                {TECNICAS.map((tec) => (
                  <label key={tec} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={tecnicasSelecionadas.includes(tec)}
                      onChange={() => toggleTecnica(tec)}
                      className={styles.checkbox}
                    />
                    {tec}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.campo}>
              <label>Pontos positivos observados <span className={styles.opcional}>(opcional)</span></label>
              <div className={styles.checkboxGrid}>
                {PONTOS_POSITIVOS.map((ponto) => (
                  <label key={ponto} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={pontosSelecionados.includes(ponto)}
                      onChange={() => togglePonto(ponto)}
                      className={styles.checkbox}
                    />
                    {ponto}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.footer}>
              <button className={styles.btnSecondary} onClick={() => onClose(false)}>
                Cancelar
              </button>
              <button
                className={styles.btnPrimary}
                onClick={() => setEtapa(2)}
                disabled={!podeContinuar}
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* ── ETAPA 2 ── */}
        {etapa === 2 && (
          <div className={styles.etapaContainer}>

            <div className={styles.escalaContainer}>
              <span key={sudsObservado} className={styles.emoji}>{emoji}</span>
              <p className={styles.textoEmocao}>{texto}</p>
              <p className={styles.numeroNivel}>{sudsObservado}</p>
              <p className={styles.perguntaEscala}>
                Qual o nível SUDS que você observou no paciente? (0–100)
              </p>
              <input
                type="range"
                min="0"
                max="100"
                value={sudsObservado}
                onChange={(e) => setSudsObservado(Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.legendaSlider}>
                <span>0 — Calmo</span>
                <span>100 — Pânico</span>
              </div>
            </div>

            <div className={styles.campo}>
              <label>Objetivo para a próxima semana <span className={styles.opcional}>(opcional)</span></label>
              <input
                type="text"
                placeholder="Ex: Praticar respiração diafragmática diariamente"
                value={objetivoSemana}
                onChange={(e) => setObjetivoSemana(e.target.value)}
              />
            </div>

            <div className={styles.campo}>
              <label>Mensagem para o paciente <span className={styles.opcional}>(opcional)</span></label>
              <textarea
                rows={3}
                placeholder="Ex: Você evoluiu muito nesta semana. Continue registrando seu diário!"
                value={mensagemPaciente}
                onChange={(e) => setMensagemPaciente(e.target.value)}
              />
            </div>

            <div className={styles.footer}>
              <button className={styles.btnSecondary} onClick={() => setEtapa(1)}>
                ← Voltar
              </button>
              <button
                className={styles.btnPrimary}
                onClick={handleSalvar}
                disabled={salvando}
              >
                {salvando ? 'Salvando...' : 'Salvar Avaliação'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}