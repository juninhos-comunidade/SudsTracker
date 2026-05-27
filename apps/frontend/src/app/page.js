'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function HomePage() {
  const [tipoUsuario, setTipoUsuario] = useState('paciente');
  const [abaPrincipal, setAbaPrincipal] = useState('cadastro');
  const [modoEscuro, setModoEscuro] = useState(true); 

  return (
    <div className={styles.containerLogin}>
      {/* LADO ESQUERDO */}
      <div className={styles.ladoEsquerdo}>
        <div className={styles.conteudoSobreposto}>
          <h1 className={styles.titulo}>SUDS</h1>
          <p className={styles.slogan}>O controle da sua jornada de saúde mental na palma da sua mão.</p>
          <Image 
            src="/logo7.png" 
            alt="SUDS Logo" 
            width={400}
            height={400}
            className={styles.logo}
          />
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
                {modoEscuro ? '🌙' : '☀️'}
              </span>
            </label>
          </div>

          {/* ABAS */}
          <div className={`${styles.abas} ${modoEscuro ? styles.dark : styles.light}`}>
            <button 
              className={`${styles.abaBtn} ${abaPrincipal === 'cadastro' ? styles.abaAtiva : ''}`}
              onClick={() => setAbaPrincipal('cadastro')}
            >
              Cadastre-se
            </button>
            <button 
              className={`${styles.abaBtn} ${abaPrincipal === 'login' ? styles.abaAtiva : ''}`}
              onClick={() => setAbaPrincipal('login')}
            >
              Login
            </button>
          </div>

          {/* ABA CADASTRO */}
          {abaPrincipal === 'cadastro' && (
            <div className={styles.conteudoAba}>
              <h2>Cadastre-se</h2>
              
              <div className={styles.seletorUsuario}>
                <button 
                  className={`${styles.botaoUsuario} ${tipoUsuario === 'paciente' ? styles.ativo : ''}`}
                  onClick={() => setTipoUsuario('paciente')}
                >
                  Paciente
                </button>
                <button 
                  className={`${styles.botaoUsuario} ${tipoUsuario === 'profissional' ? styles.ativo : ''}`}
                  onClick={() => setTipoUsuario('profissional')}
                >
                  Profissional
                </button>
              </div>

              <form className={`${styles.formularioVidro} ${modoEscuro ? styles.dark : styles.light}`}>
                <div className={styles.grupoInput}>
                  <label>Nome</label>
                  <input type="text" placeholder="Digite seu nome completo" required />
                </div>

                <div className={styles.grupoInput}>
                  <label>Data de Nascimento</label>
                  <input type="date" required />
                </div>

                <div className={styles.grupoInput}>
                  <label>E-mail</label>
                  <input type="email" placeholder="seuemail@exemplo.com" required />
                </div>

                <div className={styles.grupoInput}>
                  <label>Senha</label>
                  <input type="password" placeholder="Crie uma senha segura" required />
                </div>

                {tipoUsuario === 'profissional' && (
                  <div className={styles.grupoInput}>
                    <label>CRM / CRP / Registro Profissional</label>
                    <input type="text" placeholder="Seu número de registro" required />
                  </div>
                )}

                <button type="submit" className={styles.botaoEnviar}>Criar Conta</button>
              </form>
            </div>
          )}

          {/* ABA LOGIN */}
          {abaPrincipal === 'login' && (
            <div className={styles.conteudoAba}>
              <h2>Entrar</h2>
              
              <form className={`${styles.formularioVidro} ${modoEscuro ? styles.dark : styles.light}`}>
                <div className={styles.grupoInput}>
                  <label>E-mail</label>
                  <input type="email" placeholder="seuemail@exemplo.com" required />
                </div>
                <div className={styles.grupoInput}>
                  <label>Senha</label>
                  <input type="password" placeholder="Sua senha" required />
                </div>
                <button type="submit" className={styles.botaoEnviar}>Entrar</button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}