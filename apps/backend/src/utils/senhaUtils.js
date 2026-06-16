import bcrypt from 'bcrypt';

export async function gerarHash(senha) {
    return bcrypt.hash(senha, 10);
}

export async function verificarSenha(senha, hash) {
    return bcrypt.compare(senha, hash);
}