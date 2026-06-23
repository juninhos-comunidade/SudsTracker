import prisma from '../config/database.js';

class avaliacaoRepository {

    async atualizarPorId(avaliacaoId,avaliacaoAtualizada){
    return await prisma.avaliacao.update({
            where: {id: avaliacaoId,},
            data: avaliacaoAtualizada  
        })
    }   
    async encontrarPorId(avaliacaoId){
        return await prisma.avaliacao.findUnique({
            where: { id: avaliacaoId}
        });
    }
    async encontrarTodosPorPaciente(pacienteId){
        return await prisma.avaliacao.findMany(
            {
                where: {id_paciente: pacienteId}
            }
        )
    }
    async encontrarTodosPorProfissional(profissionalId){
        return await prisma.avaliacao.findMany(
            {
                where: {id_profissional: profissionalId}
            }
        )
    }
    async encontrarTodas(){
        return await prisma.avaliacao.findMany();

    }
    async criarAvaliacao(avaliacao) {
        return await prisma.avaliacao.create({data: avaliacao});
    }
    
    async deletarPorId(avaliacaoId){
        return await prisma.avaliacao.delete({
            where: {id: avaliacaoId}
        });
    }
}

export default new avaliacaoRepository();