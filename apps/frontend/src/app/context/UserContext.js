'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { buscarPacientePorUsuarioId, buscarProfissionalPorUsuarioId } from '@/app/services/usuarioService';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null); // 'PACIENTE' | 'PROFISSIONAL'
  const [loading, setLoading] = useState(true);
  const [showSudsModal, setShowSudsModal] = useState(false);
  const [perfilId, setPerfilId] = useState(null);

const buscarPerfilId = async (usuarioId, tipo) => {
  if (tipo === 'paciente') {
    const resultado = await buscarPacientePorUsuarioId(usuarioId);
    return resultado.ok ? resultado.data?.id : null;
  }

  if (tipo === 'profissional') {
    const resultado = await buscarProfissionalPorUsuarioId(usuarioId);
    return resultado.ok ? resultado.data?.id : null;
  }

  return null;
};

useEffect(() => {
    const loadUserData = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('suds_token');    
        const usuarioSalvo = localStorage.getItem('suds_user');
        const dontShowModal = localStorage.getItem('suds_modal_dont_show');

        if (token && usuarioSalvo) {
          const parsedUser = JSON.parse(usuarioSalvo);
          setUser(parsedUser);
          const tipoFinal = parsedUser.tipoUsuario ? parsedUser.tipoUsuario.toLowerCase() : 'paciente';
          setTipoUsuario(tipoFinal);

          const idDoPerfil = await buscarPerfilId(parsedUser.id, tipoFinal);
          setPerfilId(idDoPerfil);
        } else {
          setUser(null);
          setTipoUsuario(null);
          setPerfilId(null);
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
  const loginContext = async (dadosLogin) => {
    if (typeof window !== 'undefined') {
      const usuarioObjeto = dadosLogin.user || dadosLogin.usuario;
      if (!usuarioObjeto) {
        console.error("Dados do usuário não encontrados no retorno da API");
        return;
      }

      const tipoDefinido = usuarioObjeto.tipoUsuario ? usuarioObjeto.tipoUsuario.toLowerCase() : 'paciente';
      localStorage.setItem('suds_token', dadosLogin.token);
      localStorage.setItem('suds_user', JSON.stringify(usuarioObjeto));
      localStorage.setItem('suds_tipo_usuario', tipoDefinido);

      setUser(usuarioObjeto);
      setTipoUsuario(tipoDefinido);

      const idDoPerfil = await buscarPerfilId(usuarioObjeto.id, tipoDefinido);
      setPerfilId(idDoPerfil);
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
        perfilId,
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