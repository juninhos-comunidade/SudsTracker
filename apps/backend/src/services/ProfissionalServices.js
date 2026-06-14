import PacienteRepository from "../repositories/pacienteRepository";
import ProfissionalRepository from "../repositories/profissionalRepository";


export class ProfissionalSerices {

    async listarTodosProfissionais(){
        try{
            const listaDeProfissionais = await ProfissionalRepository.encontrarTodos();
            if(!listaDeProfissionais || listaDeProfissionais.length === 0){
                throw new Error(`Não foram encontrados profissionais.`);
            }
            return listaDeProfissionais;
        }catch(error){
            console.error("Erro ao buscar profissional:", error);
            throw error;
        }
    }

    async exibirProfissionalPorId(profissionalId){
        try{
            const profissional = await ProfissionalRepository.encontrarPorId(profissionalId);
            if(!profissional){
                throw new Error(`Profissional com ID ${profissionalId} não encontrado.`);
            }
        return profissional;
    }catch(error){ 
        console.error("Erro ao buscar profissional:", error);
        throw error;
    }
}
    async exibirProfissionalPorUsuario(usuarioId){
        try{
            const profissional = await ProfissionalRepository.encontrarPorUsuario(usuarioId);
            if(!profissional){
                throw new Error(`Profissional com usuário ${usuarioId} não encontrado.`);
            }
        return profissional;
        }catch (error){
            console.error("Erro ao buscar profissional:", error);
            throw error;
        }           
    }


    async encontrarProfissionalPorPaciente(pacienteId){
        try{
            const paciente = await PacienteRepository.encontrarPorId(pacienteId);

            if(!paciente){
                throw new Error(`Paciente com id ${pacienteId} não encontrado`);
            }
            const profissional = await ProfissionalRepository.encontrarPorUsuario(pacienteId);

            if(!profissional){
                throw new Error(`Profissional do paciente ID ${pacienteId} não encontrado.`);
            } 

        return profissional;
        }catch (error){
            console.error("Erro ao buscar profissional:", error);
            throw error;
        }   

    }
    
    async autalizarProfissional(profissionalId, profissionalAtualizado){
        try {
            await this.exibirProfissionalPorId(profissionalId);
            
            return await ProfissionalRepository.atualizarPorId(profissionalId, profissionalAtualizado);
        }catch (error) {
            console.error("Erro ao atualizar profissional:", error);
            throw error;
        }
    }
}