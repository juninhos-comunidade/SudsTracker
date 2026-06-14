import prisma from '../config/database.js';

class profissionalRepository {

    async atualizarPorId(profissionalId,profissionalAtualizado){
    return await prisma.profissional.update({
            where: {id: profissionalId,},
            data: profissionalAtualizado  
        });
    }   
    async encontrarPorId(profissionalId){
        return await prisma.profissional.findUnique({
            where: { id: profissionalId}
        });
    }
    async encontrarPorUsuario(userId){
        return await prisma.profissional.findUnique({
                where: {id_usuario: userId}
            });
    }

    async encontrarPorPaciente(pacienteId){
        return await prisma.profissional.findUnique({
                where: {id_paciente: pacienteId}
            });
    }
    async encontrarTodos(){
        return await prisma.profissional.findMany();

    }
    async criarProfissional(data) {
        return await prisma.profissional.create(data);
    }
    
    async deletarPorId(profissionalId){
        return await prisma.profissional.delete({
            where: {id: profissionalId}
        });
    }
}

export default new profissionalRepository();