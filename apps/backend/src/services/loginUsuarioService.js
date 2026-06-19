import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
import { verificarSenha } from "../utils/senhaUtils.js";


const JWT_SECRET = process.env.JWT_SECRET;

async function logarUsuario ({ email, senha }) {
    const usuarioLogin = await userRepository.encontrarPorEmail(email);

    if (!usuarioLogin) {
        console.log('email errado')
        throw new Error("Email ou senha inválido");
    }

    const senhaValida = await verificarSenha(senha, usuarioLogin.senha);

    if(!senhaValida) {
        console.log('senha errada')
        throw new Error("Email ou senha inválido");
    }

    const token = jwt.sign(
        {
          sub: usuarioLogin.id,
          email: usuarioLogin.email,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    /*
    pega a senha do usuario ( = usuarinhoLogin) e guarda em _ 
    o resto do objeto usuario guarda em usuarioSemSenha
    retorna um objeto sem a Senha
    */ 
    const { senha: _, ...usuarioSemSenha } = usuarioLogin;

    return {
        usuario: usuarioSemSenha,
        token,
    };

}

export const loginUsuarioService = { logarUsuario };