'use client';
import { useState } from 'react';
import styles from './NovoRegistroModal.module.css';
import { registrarAnotacao } from '../services/AnotacoesService';
import { buscarPacientePorUsuarioId } from "../services/usuarioService";
import { useUser } from '@/app/context/UserContext'; 
export default function NovoRegistroModal({ onClose, modoEscuro = false }) {
 const [etapa, setEtapa] = useState(1);
 const { user } = useUser(); 


  // Respostas da Etapa 1
  const [comoFoiSeuDia, setComoFoiSeuDia] = useState('');
  const [gatilhos, setGatilhos] = useState('');
  const [estrategias, setEstrategias] = useState('');

  // Resposta da Etapa 2
  const [nivelSuds, setNivelSuds] = useState(5);

  const obterInfoEmocao = (nivel) => {
    if (nivel <= 1) return { emoji: '😌', texto: 'Calmo' };
    if (nivel <= 3) return { emoji: '🙂', texto: 'Levemente incomodado' };
    if (nivel <= 5) return { emoji: '😟', texto: 'Moderadamente ansioso' };
    if (nivel <= 7) return { emoji: '😰', texto: 'Bastante ansioso' };
    if (nivel <= 9) return { emoji: '😨', texto: 'Muito ansioso' };
    return { emoji: '😱', texto: 'Pânico' };
  };

  const { emoji, texto } = obterInfoEmocao(nivelSuds);

  const avancarEtapa = () => {
    setEtapa(2);
  };

  const voltarEtapa = () => {
    setEtapa(1);
  };



 const handleSalvar = async () => {
    const perfil = await buscarPacientePorUsuarioId(user.id);

     if (!perfil.ok || !perfil.data) {
      alert("Erro ao identificar seu perfil de paciente. Tente fazer login novamente.");
      return;
    }

    const dadosNovaAnotacao = {
      id_paciente: Number(perfil.data.id), 
      intensidade: Number(nivelSuds), 
      sentimento: texto, 
      anotacao: comoFoiSeuDia,
      gatilhos: gatilhos || "Nenhum", 
      estrategias: estrategias || "Nenhuma"
    };

    // 1. Envia os dados apenas para a API do Backend
    const resultado = await registrarAnotacao(dadosNovaAnotacao);

    if (resultado.ok) {
        alert("Anotação registrada com sucesso no banco de dados!");
        onClose(); // Fecha o modal
        window.location.reload(); // Recarrega a página para atualizar os dados vindos do banco
    } else {
        // Se o banco falhar, avisa o usuário e não fecha o modal para ele não perder o texto digitado
        alert(`Erro ao salvar no banco de dados: ${resultado.error}`);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.header}>
          <h2>Nova Entrada no Diário</h2>
          <p className={styles.subtitle}>Etapa {etapa} de 2</p>
        </div>

        {etapa === 1 && (
          <div>
            <div className={styles.campo}>
              <label>Como foi seu dia? O que você está sentindo?</label>
              <textarea
                rows={4}
                placeholder="Escreva sobre suas emoções, pensamentos e experiências do dia..."
                value={comoFoiSeuDia}
                onChange={(e) => setComoFoiSeuDia(e.target.value)}
              />
            </div>

            <div className={styles.campo}>
              <label>
                Gatilhos ou situações estressantes <span className={styles.opcional}>(opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: reunião importante, discussão, prazo apertado..."
                value={gatilhos}
                onChange={(e) => setGatilhos(e.target.value)}
              />
            </div>

            <div className={styles.campo}>
              <label>
                Estratégias que você usou <span className={styles.opcional}>(opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: respiração profunda, meditação, caminhada..."
                value={estrategias}
                onChange={(e) => setEstrategias(e.target.value)}
              />
            </div>

            <div className={styles.footer}>
              <button className={styles.btnSecondary} onClick={onClose}>
                Cancelar
              </button>
              <button className={styles.btnPrimary} onClick={avancarEtapa}>
                Continuar →
              </button>
            </div>
          </div>
        )}

        {etapa === 2 && (
          <div>
            <div className={styles.escalaContainer}>
              <span key={nivelSuds} className={styles.emoji}>
                {emoji}
              </span>
              <p className={styles.textoEmocao}>{texto}</p>
              <p className={styles.numeroNivel}>{nivelSuds}</p>

              <p className={styles.perguntaEscala}>
                Como você está se sentindo agora? (Escala SUDS 0-10)
              </p>

              <input
                type="range"
                min="0"
                max="10"
                value={nivelSuds}
                onChange={(e) => setNivelSuds(Number(e.target.value))}
                className={styles.slider}
              />

              <div className={styles.legendaSlider}>
                <span>0 - Calmo</span>
                <span>10 - Pânico</span>
              </div>
            </div>

            <div className={styles.footer}>
              <button className={styles.btnSecondary} onClick={voltarEtapa}>
                ← Voltar
              </button>
              <button className={styles.btnPrimary} onClick={handleSalvar}>
                Salvar Registro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}