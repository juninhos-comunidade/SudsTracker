-- DropForeignKey
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_idProfissional_fkey";

-- AlterTable
ALTER TABLE "Paciente" ALTER COLUMN "idProfissional" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_idProfissional_fkey" FOREIGN KEY ("idProfissional") REFERENCES "Profissional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
