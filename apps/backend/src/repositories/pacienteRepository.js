import prisma from '../config/database.js';

class PacienteRepository {
    async atualizarPorId(pacienteId, pacienteAtualizado) {
        return await prisma.paciente.update({
            where: { id: pacienteId },
            data: pacienteAtualizado
        });
    }

    async encontrarPorId(pacienteId) {
        return await prisma.paciente.findUnique({
            where: { id: pacienteId }
        });
    }

    async encontrarPorUsuario(userId) {
        const id = Number(userId);
        return await prisma.paciente.findUnique({
            where: { id_usuario: Number.isNaN(id) ? userId : id }
        });
    }

    async encontrarTodosPorProfissional(profissionalId) {
        const id = Number(profissionalId);
        return await prisma.paciente.findMany({
            where: { id_profissional: Number.isNaN(id) ? profissionalId : id }
        });
    }

    async encontrarTodas() {
        return await prisma.paciente.findMany();
    }

    async criarPaciente(paciente) {
        return await prisma.paciente.create({data: paciente});
    }

    async deletarPorId(pacienteId) {
        return await prisma.paciente.delete({
            where: { id: pacienteId }
        });
    }
}

export default new PacienteRepository();
