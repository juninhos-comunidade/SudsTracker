import avaliacaoRepository from "../repositories/AvaliacaoRepository.js";
import PacienteRepository from "../repositories/pacienteRepository.js";
import profissionalRepository from "../repositories/profissionalRepository.js";


class AvaliacoesService{

    async criarAvaliacao(avaliacao){
        const novaAvaliacao = await avaliacaoRepository.criarAvaliacao(avaliacao);
        return novaAvaliacao;
    }
    async atualizarAvaliacao(id,avaliacao){
        try{   
            await this.encontrarAvaliacaoPorID(id);           
            const avaliacaoAtualizada = await avaliacaoRepository.atualizarPorId(id,avaliacao);
            return avaliacaoAtualizada;
        }catch(error){
            console.error("Erro ao atualizar avaliação:", error);
            throw error;
        }
    }
    async encontrarAvaliacaoPorID(id){
        try{
            const avaliacaoEncontrada= await avaliacaoRepository.encontrarPorId(id);
            if(!avaliacaoEncontrada){
                throw new Error(`Avaliação com id ${id} não encontrado`);
            }
            return avaliacaoEncontrada;

        }catch(error){
            console.error("Erro ao buscar avaliação:", error);
            throw error;
        }
    }
    async encontrarTodasAsAvaliacoesPorPaciente(id_paciente){
        try{
            const pacienteEncontrado = await PacienteRepository.encontrarPorId(id_paciente);
            if(!pacienteEncontrado){
                throw new Error(`Paciente com ID ${id_paciente} não encontrado.`)
            }
            return await avaliacaoRepository.encontrarTodosPorPaciente(id_paciente);
        }catch(error){
            console.error("Erro ao buscar avaliações:",error)
            throw error;
        }

    }
    async encontrarTodasAsAvaliacoesPorProfissional(id_profissional){
        try{
            const profissionalEncontrado = await profissionalRepository.encontrarPorId(id_profissional);
            if(!profissionalEncontrado){
                throw new Error(`Profissional com ID ${id_profissional} não encontrado.`)
            }
            return await avaliacaoRepository.encontrarTodosPorProfissional(id_profissional);
        }catch(error){
            console.error("Erro ao buscar avaliações:",error)
            throw error;
        }

    }
    async deletarAvaliacao(id){
        try{
            await this.encontrarAvaliacaoPorID(id);
            return await avaliacaoRepository.deletarPorId(id);
        }catch(error){
            console.error("Erro ao deletar avaliação:",error)
            throw error;                
        }

    }
    
}
export default new AvaliacoesService();
