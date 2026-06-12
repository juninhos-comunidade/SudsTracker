//algoritmo hash para garantir a segurança do sistema

const bcrypt = require('bcrypt');

async function gerarHash(senha) {
    return bcrypt.hash(senha, 10);
}

async function verificarSenha(senha, hash) {
    return bcrypt.compare(senha, hash);
}

module.exports = {
    gerarHash,
    verificarSenha
};