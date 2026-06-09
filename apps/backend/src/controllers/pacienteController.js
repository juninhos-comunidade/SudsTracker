import pacienteService from "../services/pacienteService.js";

const PacienteController = {
  async alterarProfissional(req, res) {
    try {
      const {
        id_paciente,
        id_profissional    
      } = req.body;
      
      console.log(req.body);
      const pacienteAtualizado = await pacienteService.atribuirProfissional(id_paciente,{id_profissional});
    
      return res.status(200).json({
        mensagem: "Profissional atribuido com sucesso",
        profissional: id_profissional
      });
    } catch (error) {


      console.error("Erro capturado no atribuição:", error);
      if (error.code === 'P2025' || error.message?.includes("records that were required but not found")) {
      return res.status(404).json({ 
        error: "Operação inválida: O paciente ou o profissional informado não existe." 
      });
      }else{
        return res
          .status(500)
          .json({ error: error.message || "Erro interno do servidor." });
      }
    }
  },
  async exibirPacientePorId(req, res){
    try {
      const {id_paciente} = req.body;
      console.log(req.body);

      const paciente = await pacienteService.encontrarPacientePorId({id_paciente});

      if (!paciente) {
        return res.status(404).json({ mensagem: "Paciente não encontrado." });
      }

      return res.status(200).json({
        mensagem: "paciente encontrado com sucesso",
        profissional: paciente}
      )
    } catch(error){
      console.error("Erro capturado no atribuição:", error);
      return res
        .status(500)
        .json({ error: error.message || "Erro interno do servidor." });

      }
  }
};
export default PacienteController;
