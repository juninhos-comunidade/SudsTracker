import pacienteRepository from "../repositories/pacienteRepository.js";
import profissionalRepository from "../repositories/profissionalRepository.js";

class ProfissionalService {
    async listarTodosProfissionais() {
        try {
            const listaDeProfissionais = await profissionalRepository.encontrarTodos();
            if (!listaDeProfissionais || listaDeProfissionais.length === 0) {
                throw new Error(`Não foram encontrados profissionais.`);
            }
            return listaDeProfissionais;
        } catch (error) {
            console.error("Erro ao buscar profissional:", error);
            throw error;
        }
    }

    async exibirProfissionalPorId(profissionalId) {
        try {
            const profissional = await profissionalRepository.encontrarPorId(profissionalId);
            if (!profissional) {
                throw new Error(`Profissional com ID ${profissionalId} não encontrado.`);
            }
            return profissional;
        } catch (error) {
            console.error("Erro ao buscar profissional:", error);
            throw error;
        }
    }

    async exibirProfissionalPorUsuario(usuarioId) {
        try {
            const profissional = await profissionalRepository.encontrarPorUsuario(usuarioId);
            if (!profissional) {
                throw new Error(`Profissional com usuário ${usuarioId} não encontrado.`);
            }
            return profissional;
        } catch (error) {
            console.error("Erro ao buscar profissional:", error);
            throw error;
        }
    }

    async encontrarProfissionalPorPaciente(pacienteId) {
        try {
            const paciente = await pacienteRepository.encontrarPorId(pacienteId);

            if (!paciente) {
                throw new Error(`Paciente com id ${pacienteId} não encontrado.`);
            }

            let profissional = null;
            if (paciente.id_profissional) {
                profissional = await profissionalRepository.encontrarPorId(paciente.id_profissional);
            }

            if (!profissional) {
                profissional = await profissionalRepository.encontrarPorPaciente(pacienteId);
            }

            if (!profissional) {
                throw new Error(`Profissional do paciente ID ${pacienteId} não encontrado.`);
            }

            return profissional;
        } catch (error) {
            console.error("Erro ao buscar profissional:", error);
            throw error;
        }
    }

    async atualizarProfissional(profissionalId, profissionalAtualizado) {
        try {
            await this.exibirProfissionalPorId(profissionalId);
            return await profissionalRepository.atualizarPorId(profissionalId, profissionalAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar profissional:", error);
            throw error;
        }
    }
}

export default new ProfissionalService();
