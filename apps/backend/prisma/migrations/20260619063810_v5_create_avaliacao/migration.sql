-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" SERIAL NOT NULL,
    "idPaciente" INTEGER NOT NULL,
    "idProfissional" INTEGER NOT NULL,
    "resultado" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_idProfissional_fkey" FOREIGN KEY ("idProfissional") REFERENCES "Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
