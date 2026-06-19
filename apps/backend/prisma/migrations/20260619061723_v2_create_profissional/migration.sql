-- CreateTable
CREATE TABLE "Profissional" (
    "id" SERIAL NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "crm" TEXT,
    "crp" TEXT,
    "crefito" TEXT,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_idUsuario_key" ON "Profissional"("idUsuario");

-- AddForeignKey
ALTER TABLE "Profissional" ADD CONSTRAINT "Profissional_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
