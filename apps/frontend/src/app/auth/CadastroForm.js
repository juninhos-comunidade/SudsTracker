'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';
import InputField from '../components/InputField';
import DatePickerField from '../components/DatePickerField';
import MensagemErro from '../components/MensagemErro';
import { validarEmail, validarForcaSenha } from '../utils/validacao';
import { cadastrarUsuario } from '../services/usuarioService';
import { useUser } from '@/app/context/UserContext'
export default function CadastroForm({ modoEscuro }) {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState('paciente');
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const { loginContext } = useUser(); 
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmarSenhaCadastro, setConfirmarSenhaCadastro] = useState('');
  const [registroProfissional, setRegistroProfissional] = useState('');
  const [erros, setErros] = useState({});
  const [erroCadastro, setErroCadastro] = useState('');
  const [sucessoCadastro, setSucessoCadastro] = useState('');
  const [carregando, setCarregando] = useState(false);

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
    setErroCadastro('');
    setSucessoCadastro('');
  };

  const handleEmailCadastroChange = (valor) => {
    setEmailCadastro(valor);
    if (valor && validarEmail(valor)) {
      setErro('emailCadastro', 'Digite um e-mail válido.');
    } else {
      limparErro('emailCadastro');
    }
  };

  const handleSenhaCadastroChange = (valor) => {
    setSenhaCadastro(valor);
    const erroForca = validarForcaSenha(valor);

    if (valor && erroForca) {
      setErro('senhaCadastro', erroForca);
    } else {
      limparErro('senhaCadastro');
    }

    if (confirmarSenhaCadastro && valor !== confirmarSenhaCadastro) {
      setErro('confirmarSenha', 'As senhas não coincidem.');
    } else if (confirmarSenhaCadastro) {
      limparErro('confirmarSenha');
    }
  };

  const handleConfirmarSenhaChange = (valor) => {
    setConfirmarSenhaCadastro(valor);
    if (valor && valor !== senhaCadastro) {
      setErro('confirmarSenha', 'As senhas não coincidem.');
    } else {
      limparErro('confirmarSenha');
    }
  };

  const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    limparTodosErros();

    let temErro = false;

    if (!nomeCadastro.trim()) {
      setErro('nome', 'O nome é obrigatório.');
      temErro = true;
    }

    if (!dataNascimento) {
      setErro('dataNascimento', 'A data de nascimento é obrigatória.');
      temErro = true;
    }

    if (!emailCadastro) {
      setErro('emailCadastro', 'O e-mail é obrigatório.');
      temErro = true;
    } else if (validarEmail(emailCadastro)) {
      setErro('emailCadastro', 'Digite um e-mail válido.');
      temErro = true;
    }

    const erroForca = validarForcaSenha(senhaCadastro);
    if (!senhaCadastro) {
      setErro('senhaCadastro', 'A senha é obrigatória.');
      temErro = true;
    } else if (erroForca) {
      setErro('senhaCadastro', erroForca);
      temErro = true;
    }

    if (!confirmarSenhaCadastro) {
      setErro('confirmarSenha', 'Confirme sua senha.');
      temErro = true;
    } else if (senhaCadastro !== confirmarSenhaCadastro) {
      setErro('confirmarSenha', 'As senhas não coincidem.');
      temErro = true;
    }

    if (tipoUsuario === 'profissional' && !registroProfissional.trim()) {
      setErro('registroProfissional', 'Informe seu CRM/CRP/Registro Profissional.');
      temErro = true;
    }

    if (temErro) return;

    setCarregando(true);

    try {
      const resposta = await cadastrarUsuario({
        nome: nomeCadastro,
        dataNascimento,
        email: emailCadastro.trim().toLowerCase(),
        senha: senhaCadastro,
        tipoUsuario,
        telefone: tipoUsuario === 'profissional' ? telefone.trim() : null,
        especialidade: tipoUsuario === 'profissional' ? especialidade.trim() : null,
        registroProfissional:
          tipoUsuario === 'profissional' ? registroProfissional.trim() : null,
      });

      if (!resposta.ok) {
        setErroCadastro(resposta.error);
        return;
      }
      loginContext(resposta.data); 
      setSucessoCadastro('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => router.push('/home'), 1500);
    } catch (erro) {
      console.error('Erro ao cadastrar:', erro);
      setErroCadastro(erro?.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className={styles.seletorUsuario}>
        <button
          className={`${styles.botaoUsuario} ${tipoUsuario === 'paciente' ? styles.ativo : ''}`}
          onClick={() => setTipoUsuario('paciente')}
          type="button"
        >
          Paciente
        </button>
        <button
          className={`${styles.botaoUsuario} ${tipoUsuario === 'profissional' ? styles.ativo : ''}`}
          onClick={() => setTipoUsuario('profissional')}
          type="button"
        >
          Profissional
        </button>
      </div>

      <form
        className={`${styles.formularioVidro} ${modoEscuro ? styles.dark : styles.light}`}
        onSubmit={handleSubmitCadastro}
      >
        <MensagemErro mensagem={erroCadastro} tipo="erro" modoEscuro={modoEscuro} />
        <MensagemErro mensagem={sucessoCadastro} tipo="sucesso" modoEscuro={modoEscuro} />

        <InputField
          label="Nome"
          id="nomeCadastro"
          type="text"
          placeholder="Digite seu nome completo"
          value={nomeCadastro}
          onChange={(e) => {
            setNomeCadastro(e.target.value);
            if (e.target.value.trim()) limparErro('nome');
          }}
          erro={erros.nome}
          modoEscuro={modoEscuro}
        />

        <DatePickerField
          label="Data de Nascimento"
          id="dataNascimento"
          value={dataNascimento}
          onChange={(data) => {
            setDataNascimento(data);
            limparErro('dataNascimento');
          }}
          erro={erros.dataNascimento}
          modoEscuro={modoEscuro}
        />

        <InputField
          label="E-mail"
          id="emailCadastro"
          type="email"
          placeholder="suds@exemplo.com"
          value={emailCadastro}
          onChange={(e) => handleEmailCadastroChange(e.target.value)}
          erro={erros.emailCadastro}
          modoEscuro={modoEscuro}
        />

        <InputField
          label="Senha"
          id="senhaCadastro"
          type="password"
          placeholder="Mín. 8 caracteres, 1 maiúscula e 1 número"
          value={senhaCadastro}
          onChange={(e) => handleSenhaCadastroChange(e.target.value)}
          erro={erros.senhaCadastro}
          modoEscuro={modoEscuro}
        />

        <InputField
          label="Confirmar Senha"
          id="confirmarSenhaCadastro"
          type="password"
          placeholder="Repita sua senha"
          value={confirmarSenhaCadastro}
          onChange={(e) => handleConfirmarSenhaChange(e.target.value)}
          erro={erros.confirmarSenha}
          modoEscuro={modoEscuro}
        />

        {tipoUsuario === 'profissional' && (
          <>
        {/* INPUT DE TELEFONE */}
          <InputField
            label="Telefone Comercial"
            id="telefone"
            type="text"
            placeholder="(XX) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            modoEscuro={modoEscuro}
          />

          <InputField
            label="Especialidade Clínica"
            id="especialidade"
            type="text"
            placeholder="Ex: TCC, Psicanálise, Hospitalar..."
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            modoEscuro={modoEscuro}
          />

          <InputField
            label="CRM / CRP / Registro Profissional"
            id="registroProfissional"
            type="text"
            placeholder="Seu número de registro"
            value={registroProfissional}
            onChange={(e) => {
              setRegistroProfissional(e.target.value);
              if (e.target.value.trim()) limparErro('registroProfissional');
            }}
            erro={erros.registroProfissional}
            modoEscuro={modoEscuro}
          />
        </>
        )}

        <button
          type="submit"
          className={styles.botaoEnviar}
          disabled={carregando}
        >
          {carregando ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </form>
    </>
  );
}
