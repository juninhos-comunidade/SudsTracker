import styles from './InputField.module.css';
import { useState } from 'react';

export default function InputField({ label, id, type = 'text', placeholder, value, onChange, erro, modoEscuro = false }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const ehCampoSenha = type === 'password';
  const tipoInput = ehCampoSenha && mostrarSenha ? 'text' : type;
  const corIcone = modoEscuro ? '#fff' : '#333';

  return (
    <div className={styles.grupoInput}>
      <label
        htmlFor={id}
        className={modoEscuro ? styles.labelDark : styles.labelLight}
      >
        {label}
      </label>
       <div className={styles.wrapperInput}>
          <input
            id={id}
            type={tipoInput}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            aria-invalid={!!erro}
            className={modoEscuro ? styles.inputDark : styles.inputLight}
          />
          {ehCampoSenha && (
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className={styles.botaoOlho}
            aria-label={mostrarSenha ? 'Esconder senha' : 'Mostrar senha'}
          >
            {mostrarSenha ? (
              // Olho fechado
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={corIcone} strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/>
              </svg>
            ) : (
              // Olho aberto
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={corIcone} strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        )}
        </div>
      {erro && (
        <span className={`${styles.erroInline} ${modoEscuro ? styles.erroInlineDark : styles.erroInlineLight}`}>
          ⚠️ {erro}
        </span>
      )}
    </div>
  );
}