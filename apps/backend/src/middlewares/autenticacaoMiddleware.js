import jwt from "jsonwebtoken";
import {usuarioService} from "../services/UsuarioService.js";

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

        const usuario = await usuarioService.buscarPorId(decoded.sub);

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

    } catch (error) {
        if (error.message.includes("desativada")) {
            return res.status(403).json({ erro: error.message });
        }
        if (error.message.includes("cadastrado")) {
            return res.status(404).json({ erro: error.message });
        }

        // Se cair aqui, foi erro do jwt.verify (token expirado ou adulterado)
        return res.status(401).json({ erro: "Token inválido ou expirado." });
    }
}