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
        const idNum = Number(pacienteId);
        
        return await prisma.profissional.findFirst({
            where: {
                pacientes: { 
                    some: { // 💡 Avisa ao Prisma para buscar "algum" registro na lista que cumpra a regra
                        id: Number.isNaN(idNum) ? pacienteId : idNum
                    }
                    
                }
            }
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

