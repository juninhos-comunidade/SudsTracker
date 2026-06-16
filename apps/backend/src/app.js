import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cadastroUsuarioRota from "./routes/cadastroUsuarioRota.js";
<<<<<<< HEAD
import autenticacaoUsuarioRota from "./routes/autenticacaoUsuarioRota.js";
import pacienteRota from "./routes/pacienteRota.js";
import profissionalRota from "./routes/profissionalRota.js"
dotenv.config();
=======
import loginUsuarioRota from "./routes/loginUsuarioRota.js";

dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });
>>>>>>> develop
const app = express();
const PORT = process.env.PORT || 5001;

//permite conexao entre front e backend com portas diferentes
app.use(cors());

//converte texto bruto do json em objetos javascript
app.use(express.json());

app.use("/api/cadastro", cadastroUsuarioRota);
app.use("/api/usuarios", autenticacaoUsuarioRota);
app.use("/api/pacientes", pacienteRota)
app.use("/api/profissionais",profissionalRota)
// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).json({ error: 'Erro na requisição.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
