'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import { useTheme } from '@/app/context/ThemeContext';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const { logout } = useUser();
  const { modoEscuro, toggleModoEscuro } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    router.push('/');
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          {/* Lado Esquerdo: Apenas utilitários para não repetir a Sidebar */}
          <div className={styles.leftNav}>
            <a href="/suporte" className={styles.navItem}>
              Suporte
            </a>
          </div>

          {/* Lado Direito: Modo Escuro (Futuro) + Botão Sair */}
          <div className={styles.rightNav}>
            <button
              className={styles.themeToggle}
              onClick={toggleModoEscuro}
              title="Alternar tema"
            >
              <Image
  src={modoEscuro ? '/sol.png' : '/lua.png'}
  alt={modoEscuro ? 'Modo claro' : 'Modo escuro'}
  width={45}
  height={45}
  style={{ 
    borderRadius: '50%',
    transform: modoEscuro ? 'scale(1.08)' : 'scale(1)'
  }}
/>
            </button>
            
            <button 
              onClick={() => setShowLogoutModal(true)} 
              className={styles.btnTopLogout}
            >
              Sair
            </button>
          </div>
        </nav>
      </header>

      
        {/* MODAL DE LOGOUT */}
{showLogoutModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalCard}>
      <span className={styles.modalEmoji}>💜</span>
      <h3 className={styles.modalTitle}>Ah, você já vai?</h3>
      <p className={styles.modalText}>
        Tem certeza que deseja sair do seu Diário SUDS por hoje? Seus progressos continuam salvos com segurança.
      </p>
      <div className={styles.modalActions}>
        <button className={styles.btnCancel} onClick={() => setShowLogoutModal(false)}>
          Voltar ao painel
        </button>
        <button className={styles.btnConfirm} onClick={handleConfirmLogout}>
          Sim, quero sair
        </button>
      </div>
    </div>
  </div>
)}

  
    </>
  );
}