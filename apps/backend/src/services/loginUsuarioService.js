import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';


const JWT_SECRET = process.env.JWT_SECRET;

async function logarUsuario ({ email, senha }) {
    const usuarioLogin = await userRepository.findByEmail(email);

    if (!usuarioLogin) {
        console.log('email errado')
        throw new Error("Email ou senha inválido");
    }

    //use o bcrypt pra comparar
    const senhaValida = senha === usuarioLogin.senha;

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

// mock
// async function logarUsuario ({ email, senha }) {
//   const userMock = {
//     id: 1,
//     nome: 'User Mock',
//     email: 'suds@exemplo.com',
//     tipoUsuario: 'paciente',
//   };

//   if (email !== 'suds@exemplo.com' || senha !== 'Suds123@') {
//     throw new Error('Email ou senha inválidos');
//   }

//   const token = 'mock-jwt-token-111111';

//   return {
//     usuario: userMock,
//     token,
//   };
// }

export const loginUsuarioService = { logarUsuario };