-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idProfissional" INTEGER NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_idUsuario_key" ON "Paciente"("idUsuario");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_idProfissional_fkey" FOREIGN KEY ("idProfissional") REFERENCES "Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
