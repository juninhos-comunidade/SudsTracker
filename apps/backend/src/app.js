import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cadastroUsuarioRota from "./routes/cadastroUsuarioRota.js";
import loginUsuarioRota from "./routes/loginUsuarioRota.js";
import pacienteRota from "./routes/pacienteRota.js";
import profissionalRota from "./routes/profissionalRota.js"
import AnotacoesRota from "./routes/AnotacoesRota.js";
import AvaliacoesRota from "./routes/AvaliacoesRota.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}
const app = express();
const PORT = process.env.PORT || 5001;

//permite conexao entre front e backend com portas diferentes
app.use(cors());

//converte texto bruto do json em objetos javascript
app.use(express.json());

app.use("/api/cadastro", cadastroUsuarioRota);
app.use("/api/usuarios", loginUsuarioRota);
app.use("/api/anotacoes",AnotacoesRota);
app.use("/api/avaliacoes",AvaliacoesRota);
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

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
  });
}

export default app;
