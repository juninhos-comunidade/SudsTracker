-- DropForeignKey
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_idProfissional_fkey";

-- AlterTable
ALTER TABLE "Paciente" ALTER COLUMN "id_profissional" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_idProfissional_fkey" FOREIGN KEY ("id_profissional") REFERENCES "Profissional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
