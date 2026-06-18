import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";
import pg from "pg";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), "../backend/.env") });

const user = process.env.DB_USER;
const senha = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const porta = process.env.DB_PORT;
const banco = process.env.DB_NAME;

const urlDinamica = `postgresql://${user}:${senha}@${host}:${porta}/${banco}?schema=public`;
const pool = new pg.Pool({ connectionString: urlDinamica });

const adapter = new PrismaPg(pool);
console.log("🔍 URL Gerada:", urlDinamica);

const prisma = new PrismaClient({ adapter });

export default prisma;
