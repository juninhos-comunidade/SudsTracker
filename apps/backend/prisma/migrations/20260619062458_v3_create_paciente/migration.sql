-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "id_profissional" INTEGER,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_idUsuario_key" ON "Paciente"("id_usuario");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_idUsuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_idProfissional_fkey" FOREIGN KEY ("id_profissional") REFERENCES "Profissional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
