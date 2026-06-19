'use client';
import { useState } from 'react';
import styles from './SudsModal.module.css';
import Image from 'next/image';

export default function SudsModal({ onClose, onSaibaMais }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAcaoFinal = (tipo) => {
    // 1. CORRIGIDO só salva SE o usuário marcou a caixinha 'Não mostrar essa apresentação ao entrar'
    if (typeof window !== 'undefined' && dontShowAgain) {
      localStorage.setItem('suds_modal_dont_show', 'true');
    }

    if (tipo === 'saiba_mais' && onSaibaMais) {
      onSaibaMais();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={() => handleAcaoFinal('fechar')}>
          ✕
        </button>

        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            {!imageError ? (
              <Image 
                src="/lua.png"  /* TEMPORÁRIO */ 
                alt="Assistente SUDS" 
                width={75}            
                height={75}           
                className={styles.avatarImage} 
                onError={() => setImageError(true)}
              />
            ) : (
              <span className={styles.avatarEmoji}>👩‍⚕️✨</span>
            )}
          </div>
          <h2>Bem-vindo ao SUDS</h2>
          <p className={styles.subtitle}>Seu acompanhamento de saúde mental</p>
        </div>

        <div className={styles.body}>
          <section className={styles.section}>
            <h3>O que é a escala SUDS?</h3>
            <p>
              SUDS é a sigla para Escala Subjetiva de Unidades de Perturbação, criada pelo
              psicólogo Joseph Wolpe e usada até hoje em terapias como exposição e
              dessensibilização. Funciona como uma régua de 0 a 100: 0 representa calma
              total e 100 representa o nível mais intenso de ansiedade ou sofrimento que
              você já sentiu.
            </p>
          </section>

          <section className={styles.section}>
            <h3>Como funciona aqui no app?</h3>
            <p>
              A cada registro, você atribui uma nota de 0 a 100 ao que está sentindo no
              momento. Com o tempo, esses registros formam um histórico que ajuda você
              (e seu profissional, se for o caso) a perceber padrões, gatilhos e a
              evolução do seu nível de perturbação.
            </p>
          </section>

          <section className={styles.section}>
            <h3>Por onde começar</h3>
            <ul>
              <li>Use o Diário SUDS para registrar como você está se sentindo</li>
              <li>Acompanhe sua evolução na aba Estatísticas</li>
              <li>Veja mais detalhes sobre a escala em Sobre SUDS</li>
              <li>Ajuste suas preferências em Configurações</li>
            </ul>
          </section>
        </div>

        {/* Caixa de Seleção Estilizada */}
        <div className={styles.checkboxSection}>
          <label htmlFor="dontShowAgain" className={styles.checkboxLabel}>
            <input
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className={styles.checkbox}
            />
            <span>Não mostrar essa apresentação ao entrar</span>
          </label>
        </div>

        <div className={styles.footer}>
          <button className={styles.btnSecondary} onClick={() => handleAcaoFinal('fechar')}>
            Entendi
          </button>
          <button className={styles.btnPrimary} onClick={() => handleAcaoFinal('saiba_mais')}>
            Saiba mais
          </button>
        </div>
      </div>
    </div>
  );
}