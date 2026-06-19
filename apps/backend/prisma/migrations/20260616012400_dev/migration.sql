.-- CreateTable
CREATE TABLE "Paciente" (
    "id" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_profissional" INTEGER,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_id_usuario_key" ON "Paciente"("id_usuario");
