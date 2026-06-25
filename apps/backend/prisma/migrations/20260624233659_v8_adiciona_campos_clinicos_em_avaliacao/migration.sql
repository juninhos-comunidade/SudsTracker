/*
  Warnings:

  - You are about to drop the column `resultado` on the `Avaliacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Avaliacao" DROP COLUMN "resultado",
ADD COLUMN     "evolucao_percebida" TEXT,
ADD COLUMN     "mensagem_paciente" TEXT,
ADD COLUMN     "objetivo_semana" TEXT,
ADD COLUMN     "pontos_positivos" TEXT,
ADD COLUMN     "suds_observado" INTEGER,
ADD COLUMN     "tecnicas_utilizadas" TEXT,
ADD COLUMN     "titulo" TEXT;

-- RenameForeignKey
ALTER TABLE "Anotacao" RENAME CONSTRAINT "Anotacao_idPaciente_fkey" TO "Anotacao_id_paciente_fkey";

-- RenameForeignKey
ALTER TABLE "Avaliacao" RENAME CONSTRAINT "Avaliacao_idPaciente_fkey" TO "Avaliacao_id_paciente_fkey";

-- RenameForeignKey
ALTER TABLE "Avaliacao" RENAME CONSTRAINT "Avaliacao_idProfissional_fkey" TO "Avaliacao_id_profissional_fkey";

-- RenameForeignKey
ALTER TABLE "Paciente" RENAME CONSTRAINT "Paciente_idProfissional_fkey" TO "Paciente_id_profissional_fkey";

-- RenameForeignKey
ALTER TABLE "Paciente" RENAME CONSTRAINT "Paciente_idUsuario_fkey" TO "Paciente_id_usuario_fkey";

-- RenameForeignKey
ALTER TABLE "Profissional" RENAME CONSTRAINT "Profissional_idUsuario_fkey" TO "Profissional_id_usuario_fkey";

-- RenameIndex
ALTER INDEX "Paciente_idUsuario_key" RENAME TO "Paciente_id_usuario_key";

-- RenameIndex
ALTER INDEX "Profissional_idUsuario_key" RENAME TO "Profissional_id_usuario_key";
