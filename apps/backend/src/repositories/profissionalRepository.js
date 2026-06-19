import prisma from '../config/database.js';

class ProfissionalRepository {
    async atualizarPorId(profissionalId, profissionalAtualizado) {
        const id = Number(profissionalId);
        return await prisma.profissional.update({
            where: { id: Number.isNaN(id) ? profissionalId : id },
            data: profissionalAtualizado
        });
    }

    async encontrarPorId(profissionalId) {
        const id = Number(profissionalId);
        return await prisma.profissional.findUnique({
            where: { id: Number.isNaN(id) ? profissionalId : id }
        });
    }

    async encontrarPorUsuario(userId) {
        const id = Number(userId);
        return await prisma.profissional.findUnique({
            where: { id_usuario: Number.isNaN(id) ? userId : id }
        });
    }

    async encontrarPorPaciente(pacienteId) {
        const id = Number(pacienteId);
        return await prisma.profissional.findUnique({
            where: { id_paciente: Number.isNaN(id) ? pacienteId : id }
        });
    }

    async encontrarTodos() {
        return await prisma.profissional.findMany();
    }
    async criarProfissional(profissional) {
        return await prisma.profissional.create({data: profissional});
    }

    async deletarPorId(profissionalId) {
        const id = Number(profissionalId);
        return await prisma.profissional.delete({
            where: { id: Number.isNaN(id) ? profissionalId : id }
        });
    }
}

export default new ProfissionalRepository();

