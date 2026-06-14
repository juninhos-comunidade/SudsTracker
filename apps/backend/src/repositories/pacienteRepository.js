import prisma from '../config/database.js';

class PacienteRepository {
    // Adicione um construtor para garantir que a classe segure a referência do prisma


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
        return await prisma.paciente.findUnique({
            where: { id_usuario: userId }
        });
    }

    async encontrarTodosPorProfissional(profissionalId) {
        return await prisma.paciente.findMany({
            where: { id_profissional: profesionalId }
        });
    }

    async encontrarTodas() {
        return await prisma.paciente.findMany();
    }

    async criarPaciente(data) {
        return await prisma.paciente.create(data);
    }
    
    async deletarPorId(pacienteId) {
        return await prisma.paciente.delete({
            where: { id: pacienteId }
        });
    }
}

export default PacienteRepository;
