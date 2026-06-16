import pacienteRepository from '../repositories/pacienteRepository.js';

class PacienteService {
    async atribuirProfissional(pacienteID, { id_profissional }) {
        const pacienteAtualizado = await pacienteRepository.atualizarPorId(
            pacienteID,
            {
                id_profissional: Number(id_profissional)
            }
        );
        return pacienteAtualizado;
    }

    async encontrarPacientePorId(pacienteId) {
        const paciente = await pacienteRepository.encontrarPorId(pacienteId);
        return paciente;
    }

    async listarPacientes() {
        const pacientes = await pacienteRepository.encontrarTodas();
        return pacientes;
    }

    async listarPacientesPorProfissional(profissionalID) {
        const pacientes = await pacienteRepository.encontrarTodosPorProfissional(profissionalID);
        return pacientes;
    }

    async encontrarPacientePorUsuario(usuarioId) {
        const paciente = await pacienteRepository.encontrarPorUsuario(usuarioId);
        return paciente;
    }
}

const pacienteService = new PacienteService();
export default pacienteService;
