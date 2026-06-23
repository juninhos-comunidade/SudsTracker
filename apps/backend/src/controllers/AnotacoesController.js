import AnotacoesService  from "../services/AnotacoesService.js";

function tratarErroController(res, error, mensagemLog = 'Erro no servidor') {
    console.error(`${mensagemLog}:`, error);

    if (error.code === 'P2025' || (error.message && error.message.includes('não encontrado'))) {
        return res.status(404).json({ mensagem: error.message || "Recurso não encontrado." });
    }
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
}

class AnotacoesController{

    async criarAnotacao(req, res) {
        try {
            const anotacao = req.body;
            const novaAnotacao = await AnotacoesService.criarAnotacao(anotacao);
            return res.status(201).json(novaAnotacao);
            
        } catch (error) {
            return tratarErroController(res, error, "Erro ao criar anotação");
        }
    }
    async atualizarAnotacao(req,res){
        try{
            const id = Number(req.params.id); 
            const anotacao = req.body;

            if (isNaN(id)) {
            return res.status(400).json({ error: "O ID fornecido deve ser um número válido." });
            }
            const anotacaoAtualizada = await AnotacoesService.atualizarAnotacao(id,anotacao)
            return res.status(200).json(anotacaoAtualizada);

        } catch(error){
            return tratarErroController(res, error, "Erro ao atualizar anotação")
        }
    }
    async encontrarAnotacaoPorId(req,res){
        try{    
            const id = Number(req.params.id); 
            if (isNaN(id)) {
                return res.status(400).json({ error: "O ID fornecido deve ser um número válido." });
            }
            
            const anotacaoEncontrada = await AnotacoesService.encontrarAnotacaoPorID(id);
            return res.status(200).json(anotacaoEncontrada);
        
        } catch (error){
            return tratarErroController(res, error, "Erro ao buscar anotação");
        }       
    }
    async encontrarTodasAsAnotacoesPorPaciente(req,res){
        try{    
            const pacienteId = Number(req.params.pacienteId); 
            if (isNaN(pacienteId)) {
                return res.status(400).json({ error: "O ID fornecido deve ser um número válido." });
            }
            const listaDeAnotacoesPorPaciente = await AnotacoesService.encontrarTodasAsAnotacoesPorPaciente(pacienteId);
            return res.status(200).json(listaDeAnotacoesPorPaciente);


        }catch(error){
            return tratarErroController(res,error, "Erro ao buscar anotacoes:");
        }
    }
    async deletarAnotacaoPorId(req,res){
        try{
            const id = Number(req.params.id); 
            if (isNaN(id)) {
                return res.status(400).json({ error: "O ID fornecido deve ser um número válido." });
            }
            await AnotacoesService.deletarAnotacao(id);
            return res.status(204).send();
        }catch(error){
            return tratarErroController(res,error,"Erro ao deletar anotação")
        }
    }
}export default new AnotacoesController();