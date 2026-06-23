import { parse, isValid, isFuture, differenceInYears } from "date-fns";
import UserRepository from "../repositories/userRepository.js";
import { gerarHash } from "../utils/senhaUtils.js";
import jwt from 'jsonwebtoken';

async function cadastrarUsuario(dadosUsuario) {
  const { nome, email, senha, dataNascimento, registroProfissional, tipoUsuario, telefone ,especialidade} = dadosUsuario;

  const dataNascimentoObjDate = await validaUsuario(dadosUsuario);

  const senhaCriptografada = await gerarHash(senha);

  const emailFormatado = email ? String(email).trim().toLowerCase() : "";

  const dadosParaCriar = {
      nome,
      email: emailFormatado,
      senha: senhaCriptografada,
      dataNascimento: dataNascimentoObjDate,
      tipoUsuario: tipoUsuario
    };
  const tipoPadronizado = tipoUsuario.toUpperCase();

  if (tipoPadronizado === "PROFISSIONAL") {
    dadosParaCriar.profissional = {
      create: {
        telefone: telefone,
        crp: registroProfissional,
        especialidade: especialidade
      }
    };
  } else if (tipoPadronizado === "PACIENTE") {
    dadosParaCriar.paciente = {
      create: {} // Cria o registro na tabela Paciente vinculado a este Usuario
    };
  }
  const novoUsuario = await UserRepository.criarUsuario(dadosParaCriar);
  const { senha: _, ...usuarioSemSenha } = novoUsuario;
  const secretKey = process.env.JWT_SECRET
  const token = jwt.sign(
    { sub: novoUsuario.id, email: novoUsuario.email },
    secretKey,
    { expiresIn: "1h" }
  );
  return {
    user: usuarioSemSenha,
    token
  };
}

async function validaUsuario(dadosUsuario) {
  const { nome, email, senha, dataNascimento, registroProfissional, tipoUsuario } = dadosUsuario;

  const emailPadrao = email ? String(email).trim().toLowerCase() : "";

  if (!nome || String(nome).trim() === "") {
    throw new Error("Nome é obrigatório.");
  }

   if (!dataNascimento) {
    throw new Error("Data de nascimento é obrigatória.");
  }

  const dataNascimentoObjDate = parse(dataNascimento, "dd/MM/yyyy", new Date());
  if (!isValid(dataNascimentoObjDate) || isFuture(dataNascimentoObjDate)) {
    throw new Error("Data de nascimento inválida.");
  }

  const dataHoje = new Date();
  const idade = differenceInYears(dataHoje, dataNascimentoObjDate);

  if (idade < 18) {
    console.log(idade)
    throw new Error("Data de nascimento inválida. Usuário precisa ter 18 ou mais anos de idade");
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPadrao);

  if (!emailPadrao || !emailValido) {
    throw new Error("Email inválido");
  }

  const senhaValida =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);

  if (!senha || !senhaValida) {
    throw new Error(
      "Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.",
    );
  }

  const tipoValido = ["paciente", "profissional"];
  const tipoPadronizado = tipoUsuario ? String(tipoUsuario).toLowerCase() : "";
  if(!tipoValido.includes(tipoPadronizado)) {
    throw new Error("Tipo de usuário inválido.") 
  }  

  if (tipoPadronizado === "profissional" && !registroProfissional) {
      throw new Error(
      "Profissionais precisam informar seu Registro Profissional.",
    );
  }

  const validaUsuarioExistente = await UserRepository.encontrarPorEmail(emailPadrao);

  if (validaUsuarioExistente) {
    throw new Error('Já existe um usuário cadastrado com esse Email.');
  }

  return dataNascimentoObjDate;
}

export const cadastroUsuarioService = { cadastrarUsuario };
