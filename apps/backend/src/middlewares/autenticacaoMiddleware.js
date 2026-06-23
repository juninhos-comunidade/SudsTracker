import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function validarUsuarioAtivo(req, res, next) {

    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                erro: "Token não informado"
            });
        }

        const tokenLimpo = token.replace("Bearer ", "");

        const decoded = jwt.verify(
            tokenLimpo,
            JWT_SECRET
        );

        const usuario = await userRepository.findById(decoded.sub);

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        if (!usuario.ativo) {
            return res.status(403).json({
                erro: "Usuário desativado"
            });
        }

        req.usuario = usuario;
        next();

    } catch(error) {

        return res.status(401).json({
            erro: "Token inválido"
        });
    }
}