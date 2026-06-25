'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';
import InputField from '../components/InputField';
import MensagemErro from '../components/MensagemErro';
import { validarEmail } from '../utils/validacao';
import { loginUsuario } from '../services/usuarioService';
import { useUser } from '@/app/context/UserContext'; 

export default function LoginForm({ modoEscuro }) {
  const router = useRouter();
  const { loginContext } = useUser(); 
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  const [sucessoLogin, setSucessoLogin] = useState('');
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState({});

  const setErro = (campo, mensagem) =>
    setErros((prev) => ({ ...prev, [campo]: mensagem }));

  const limparErro = (campo) =>
    setErros((prev) => {
      const novo = { ...prev };
      delete novo[campo];
      return novo;
    });

  const limparTodosErros = () => {
    setErros({});
    setErroLogin('');
    setSucessoLogin('');
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    limparTodosErros();

    let temErro = false;

    if (!emailLogin) {
      setErro('emailLogin', 'O e-mail é obrigatório.');
      temErro = true;
    } else if (validarEmail(emailLogin)) {
      setErro('emailLogin', 'Digite um e-mail válido.');
      temErro = true;
    }

    if (!senhaLogin) {
      setErro('senhaLogin', 'A senha é obrigatória.');
      temErro = true;
    }

    if (temErro) return;

    setCarregando(true);

    try {
      const resposta = await loginUsuario({
        email: emailLogin,
        senha: senhaLogin,
      });

      if (!resposta.ok) {
        setErroLogin(resposta.error || 'Email ou senha incorretos. Tente novamente.');
        return;
      }
      await loginContext(resposta.data); 

      setSucessoLogin('Login realizado! Redirecionando...');
      setTimeout(() => router.push('/home'), 1500);
    } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      setErroLogin('Email ou senha incorretos. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form
      className={`${styles.formularioVidro} ${modoEscuro ? styles.dark : styles.light}`}
      onSubmit={handleSubmitLogin}
    >
      <MensagemErro mensagem={erroLogin} tipo="erro" modoEscuro={modoEscuro} />
      <MensagemErro mensagem={sucessoLogin} tipo="sucesso" modoEscuro={modoEscuro} />

      <InputField
        label="E-mail"
        id="emailLogin"
        type="email"
        placeholder="suds@exemplo.com"
        value={emailLogin}
        onChange={(e) => {
          setEmailLogin(e.target.value);
          limparErro('emailLogin');
        }}
        erro={erros.emailLogin}
        modoEscuro={modoEscuro}
      />

      <InputField
        label="Senha"
        id="senhaLogin"
        type="password"
        placeholder="Sua senha"
        value={senhaLogin}
        onChange={(e) => {
          setSenhaLogin(e.target.value);
          limparErro('senhaLogin');
        }}
        erro={erros.senhaLogin}
        modoEscuro={modoEscuro}
      />

      <div className={styles.grupoCheckbox}>
        <input
          type="checkbox"
          id="esqueceuSenha"
          checked={esqueceuSenha}
          onChange={() => setEsqueceuSenha(!esqueceuSenha)}
          className={`${styles.checkboxEsqueceu} ${esqueceuSenha ? styles.marcado : ''}`}
        />
        <label htmlFor="esqueceuSenha" className={styles.labelCheckbox}>
          Esqueceu a senha?
        </label>
      </div>

      <button type="submit" className={styles.botaoEnviar} disabled={carregando}>
        {carregando ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
