import prisma from '../config/database.js';

class anotacoesRepository {

    async atualizarPorId(anotacaoId,anotacaoAtualizada){
    return await prisma.anotacao.update({
            where: {id: anotacaoId,},
            data: anotacaoAtualizada  
        })
    }   
    async encontrarPorId(anotacaoId){
        return await prisma.anotacao.findUnique({
            where: { id: anotacaoId}
        });
    }
    async encontrarTodosPorPaciente(pacienteId){
        return await prisma.anotacao.findMany(
            {
                where: {id_paciente: pacienteId}
            }
        )
    }
    async encontrarTodas(){
        return await prisma.anotacao.findMany();

    }
    async criarAnotacao(data) {
        return await prisma.anotacao.create(data);
    }
    
    async deletarPorId(anotacaoId){
        return await prisma.anotacao.delete({
            where: {id: anotacaoId}
        });
    }
}

export default new anotacoesRepository();