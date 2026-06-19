-- CreateTable
CREATE TABLE "Anotacao" (
    "id" SERIAL NOT NULL,
    "idPaciente" INTEGER NOT NULL,
    "intensidade" INTEGER NOT NULL,
    "sentimento" TEXT NOT NULL,
    "anotacao" TEXT NOT NULL,
    "gatilhos" TEXT NOT NULL,
    "estrategias" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anotacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Anotacao" ADD CONSTRAINT "Anotacao_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
