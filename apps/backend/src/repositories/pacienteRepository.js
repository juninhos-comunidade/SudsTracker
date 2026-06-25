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
        return await prisma.paciente.findFirst(
            {where: 
                { 
                    id_usuario: String(userId)
                },
                include: {
                    usuario:{
                        select: {
                            id: true,
                            nome: true,
                            dataNascimento: true,
                            email: true,
                            tipoUsuario: true,
                            createdAt: true,
                            updatedAt: true,
                            } 
                        }
                    }
                });
    }

    async encontrarTodosPorProfissional(profissionalId) {
        const id = Number(profissionalId);
        return await prisma.paciente.findMany({
            where: { id_profissional: Number.isNaN(id) ? profissionalId : id },
            include: {
                    usuario:{
                        select: {
                            id: true,
                            nome: true,
                            dataNascimento: true,
                            email: true,
                            tipoUsuario: true,
                            createdAt: true,
                            updatedAt: true,
                            } 
                        }
                    }
        
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
