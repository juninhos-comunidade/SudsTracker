import prisma from '../config/database.js';

class PacienteRepository {
    // Adicione um construtor para garantir que a classe segure a referência do prisma
    constructor() {
        this.db = prisma;
    }

    async atualizarPorId(pacienteId, pacienteAtualizado) {
        return await this.db.paciente.update({
            where: { id: pacienteId },
            data: pacienteAtualizado  
        });
    }   

    async encontrarPorId(pacienteId) {
        // CORREÇÃO DE SEGURANÇA: Se por algum motivo 'this.db' falhar no carregamento inicial,
        // usamos o 'prisma' importado diretamente como garantia (fallback)
        const client = this.db || prisma;
        
        return await client.paciente.findUnique({
            where: { id: pacienteId }
        });
    }

    async encontrarPorUsuario(userId) {
        const client = this.db || prisma;
        return await client.paciente.findUnique({
            where: { id_usuario: userId }
        });
    }

    async encontrarTodosPorProfissional(profissionalId) {
        const client = this.db || prisma;
        return await client.paciente.findMany({
            where: { id_profissional: profesionalId }
        });
    }

    async encontrarTodas() {
        const client = this.db || prisma;
        return await client.paciente.findMany();
    }

    async criarPaciente(data) {
        const client = this.db || prisma;
        return await client.paciente.create(data);
    }
    
    async deletarPorId(pacienteId) {
        const client = this.db || prisma;
        return await client.paciente.delete({
            where: { id: pacienteId }
        });
    }
}

export default PacienteRepository;
