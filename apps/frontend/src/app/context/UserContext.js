'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null); // 'PACIENTE' | 'PROFISSIONAL'
  const [loading, setLoading] = useState(true);
  const [showSudsModal, setShowSudsModal] = useState(false);

useEffect(() => {
    const loadUserData = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('suds_token');    
        const usuarioSalvo = localStorage.getItem('suds_user');
        const dontShowModal = localStorage.getItem('suds_modal_dont_show');

        if (token && usuarioSalvo) {
          const parsedUser = JSON.parse(usuarioSalvo);
          setUser(parsedUser);
          setTipoUsuario(parsedUser.tipoUsuario ? parsedUser.tipoUsuario.toLowerCase() : 'paciente'); 
        } else {
          setUser(null);
          setTipoUsuario(null);
        }

        if (!dontShowModal && usuarioSalvo) {
          setShowSudsModal(true);
        }
      }
      setLoading(false);
    };

 loadUserData();
}
, []); // 💡 Chaves do useEffect corrigidas e fechadas no local exato!

  // 🔑 Função usada pelos formulários de Login e Cadastro após sucesso na API
  const loginContext = (dadosLogin) => {
    if (typeof window !== 'undefined') {
      const usuarioObjeto = dadosLogin.user || dadosLogin.usuario;
      if (!usuarioObjeto) {
        console.error("Dados do usuário não encontrados no retorno da API");
        return;
      }

      const tipoDefinido = usuarioObjeto.tipoUsuario ? usuarioObjeto.tipoUsuario.toLowerCase() : 'paciente';
      localStorage.setItem('suds_token', dadosLogin.token);
      localStorage.setItem('suds_user', JSON.stringify(usuarioObjeto));
      localStorage.setItem('suds_tipo_usuario', tipoDefinido); // Cria contingência para a página ler rápido

      setUser(usuarioObjeto);
      setTipoUsuario(tipoDefinido);


       }
  };

  const fecharOModal = () => {
    setShowSudsModal(false); 
    if (typeof window !== 'undefined') {
      localStorage.setItem('suds_modal_dont_show', 'true');
    }
  };

  const logout = () => {
    setUser(null);
    setTipoUsuario(null);
    setShowSudsModal(false);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('suds_token');
      localStorage.removeItem('suds_user');
      localStorage.removeItem('suds_modal_dont_show');
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        tipoUsuario,
        loading,
        showSudsModal,
        loginContext, // 💡 Exposto para os formulários usarem
        fecharOModal,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }
  return context;
}