import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Na Vercel, as variáveis vêm do painel. Localmente, carrega do .env
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });
}

let connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  const user = process.env.DB_USER;
  const senha = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const porta = process.env.DB_PORT;
  const banco = process.env.DB_NAME;
  connectionString = `postgresql://${user}:${senha}@${host}:${porta}/${banco}?schema=public`;
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
