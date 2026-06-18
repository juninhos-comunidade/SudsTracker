import AnotacoesRepository from "../repositories/AnotacoesRepository.js";
import PacienteRepository from "../repositories/pacienteRepository.js";

const anotacaoRepository = new AnotacoesRepository();

class AnotacoesService{

    async criarAnotacao(anotacao){
        const novaAnotacao = await anotacaoRepository.criarAnotacao(anotacao);
        return novaAnotacao;
    }
    async atualizarAnotacao(id, anotacao){
        try{   
            await this.encontrarAnotacaoPorID(id);           
            const anotacaoAtualizada = await anotacaoRepository.atualizarAnotacao(id,anotacao);
            return anotacaoAtualizada;
        }catch(error){
            console.error("Erro ao atualizar anotação:", error);
            throw error;
        }
    }

    async encontrarAnotacaoPorID(id){
        try{
            const anotacaoEncontrada= await anotacaoRepository.encontrarPorId(id);
            if(!anotacaoEncontrada){
                throw new Error(`Anotação com id ${id} não encontrado`);
            }
            return anotacaoEncontrada;

        }catch(error){
            console.error("Erro ao buscar anotação:", error);
            throw error;
        }
    }
    async encontrarTodasAsAnotacoesPorPaciente(id_paciente){
        try{
            const pacienteEncontrado = await PacienteRepository.encontrarPorId(id_paciente);
            if(!pacienteEncontrado){
                throw new Error(`Paciente com ID ${id_paciente} não encontrado.`)
            }
            return await anotacaoRepository.encontrarTodasAsAnotacoesPorPaciente(id_paciente);
        }catch(error){
            console.error("Erro ao buscar anotações:",error)
            throw error;
        }

    }

    async deletarAnotacao(id){
        try{
            await this.encontrarAnotacaoPorID(id);
            return await anotacaoRepository.deletarAnotacao(id);
        }catch(error){
            console.error("Erro ao deletar anotação:",error)
            throw error;                
        }

    }
    
}
export default new AnotacoesService();
