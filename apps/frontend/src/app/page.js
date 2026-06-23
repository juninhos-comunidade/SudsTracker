'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import CadastroForm from './auth/CadastroForm';
import LoginForm from './auth/LoginForm';
import { UserProvider } from '@/app/context/UserContext'
export default function AuthPage() {
  const [abaPrincipal, setAbaPrincipal] = useState('cadastro');
  const [modoEscuro, setModoEscuro] = useState(false);

  return (
    <UserProvider>
      <div className={styles.containerLogin}>
        {/* LADO ESQUERDO */}
        <div className={styles.ladoEsquerdo}>
          <div className={styles.conteudoSobreposto}>
            <h1 className={styles.titulo}>SUDS</h1>
            <p className={styles.slogan}>Explore o universo da sua mente.</p>
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className={`${styles.ladoDireito} ${modoEscuro ? styles.dark : styles.light}`}>
          <div className={styles.caixaFormulario}>
            {/* BOTÃO MODO ESCURO - TOGGLE */}
            <div className={`${styles.toggleSwitch} ${modoEscuro ? styles.switchDark : styles.switchLight}`}>
              <input
                type="checkbox"
                className={styles.toggleInput}
                checked={modoEscuro}
                onChange={() => setModoEscuro(!modoEscuro)}
                id="modoToggle"
              />
              <label htmlFor="modoToggle" className={styles.toggleLabel}>
                <span className={styles.toggleThumb}>
                  {modoEscuro ? (
                    <Image src="/lua.png" alt="Modo Escuro" width={30} height={30} />
                  ) : (
                    <Image src="/sol.png" alt="Modo Claro" width={35} height={35} />
                  )}
                </span>
              </label>
            </div>

            {/* ABAS */}
            <div className={`${styles.abas} ${modoEscuro ? styles.dark : styles.light}`}>
              <button
                type="button"
                className={`${styles.abaBtn} ${abaPrincipal === 'cadastro' ? styles.abaAtiva : ''}`}
                onClick={() => setAbaPrincipal('cadastro')}
              >
                Cadastre-se
              </button>
              <button
                type="button"
                className={`${styles.abaBtn} ${abaPrincipal === 'login' ? styles.abaAtiva : ''}`}
                onClick={() => setAbaPrincipal('login')}
              >
                Login
              </button>
            </div>

            {abaPrincipal === 'cadastro' && (
              <div className={styles.conteudoAba}>
                <h2>Cadastre-se</h2>
                <CadastroForm modoEscuro={modoEscuro} />
              </div>
            )}

            {abaPrincipal === 'login' && (
              <div className={styles.conteudoAba}>
                <h2>Entrar</h2>
                <LoginForm modoEscuro={modoEscuro} />
              </div>
            )}
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
