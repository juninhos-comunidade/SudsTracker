-- CreateTable
CREATE TABLE "Profissional" (
    "id" SERIAL NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "crm" TEXT,
    "crp" TEXT,
    "crefito" TEXT,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "Profissional_idUsuario_key" ON "Profissional"("id_usuario");

-- AddForeignKey
ALTER TABLE "Profissional" ADD CONSTRAINT "Profissional_idUsuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
