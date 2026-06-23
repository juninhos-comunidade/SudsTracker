import pacienteService from "../services/pacienteService.js";


function tratarErroController(res, error, mensagemLog = 'Erro no servidor') {
    console.error(`${mensagemLog}:`, error);

    if (error.code === 'P2025' || (error.message && error.message.includes('não encontrado'))) {
        return res.status(404).json({ mensagem: error.message || "Recurso não encontrado." });
    }
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
}


const PacienteController = {
  async alterarProfissional(req, res) {
    try {
      const id = Number(req.params.id); 
            if (isNaN(id)) {
                return res.status(400).json({ error: "O ID fornecido deve ser um número válido." });
            }
      const { id_profissional } = req.body;

      const pacienteAtualizado = await pacienteService.atribuirProfissional(id, { id_profissional });
    
      return res.status(200).json({
        mensagem: "Profissional atribuído com sucesso",
        paciente: pacienteAtualizado
      });
    } catch (error) {
        return tratarErroController(res, error, "Erro ao atribuir profissional");
    }
  },
  
  async exibirPacientePorUsuario(req, res) {
    try {
      const idUsuario = (req.params.idUsuario); 
    
      const paciente = await pacienteService.encontrarPacientePorUsuario(idUsuario);
      return res.status(200).json(paciente);
    } catch (error) {
      return tratarErroController(res, error, "Erro ao buscar paciente por usuário");
    }
  },
   async listarPacientesPorProfissional(req, res) {
    try {
      const profissionalId = Number(req.params.profissionalId); 
      if (isNaN(profissionalId)) {
        return res.status(400).json({ error: "O ID fornecido deve ser um número válido." });
      }
      const lista = await pacienteService.listarPacientesPorProfissional(profissionalId);
      return res.status(200).json(lista);
    } catch (error) {
      return tratarErroController(res, error, "Erro ao listar pacientes por profissional");
    }
  },

  async listarPacientes(req, res) {
    try {
      const pacientes = await pacienteService.listarPacientes();
      return res.status(200).json(pacientes);
    } catch (error) {
      return tratarErroController(res, error, "Erro ao listar pacientes");
    }
  },

  async exibirPacientePorId(req, res) {
    try {
      const id = Number(req.params.id); 
      if (isNaN(id)) {
        return res.status(400).json({ error: "O ID fornecido deve ser um número válido." });
      }
      const paciente = await pacienteService.encontrarPacientePorId(id);

      if (!paciente) {
        return res.status(404).json({ mensagem: "Paciente não encontrado." });
      }

      return res.status(200).json(paciente);
    } catch (error) {
      return tratarErroController(res, error, "Erro ao buscar paciente por id");
    }
  }
};
export default PacienteController;
