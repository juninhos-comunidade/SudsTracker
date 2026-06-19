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
        const anotacao = req.body;
        const {id} = req.params;

        try{
            const anotacaoAtualizada = await AnotacoesService.atualizarAnotacao(id,anotacao)
            return res.status(200).json(anotacaoAtualizada);

        } catch(error){
            return tratarErroController(res, error, "Erro ao atualizar anotação")
        }
    }
    async encontrarAnotacaoPorId(req,res){
        try{    
            const {id} = req.params;
            const anotacaoEncontrada = await AnotacoesService.encontrarAnotacaoPorID(id);
            return res.status(200).json(anotacaoEncontrada);
        
        } catch (error){
            return tratarErroController(res, error, "Erro ao buscar anotação");
        }       
    }
    async encontrarTodasAsAnotacoesPorPaciente(req,res){
        try{    
            const {pacienteId} = req.params;
            const listaDeAnotacoesPorPaciente = await AnotacoesService.encontrarTodasAsAnotacoesPorPaciente(pacienteId);
            return res.status(200).json(listaDeAnotacoesPorPaciente);


        }catch(error){
            return tratarErroController(res,error, "Erro ao buscar anotacoes:");
        }
    }
    async deletarAnotacaoPorId(req,res){
        try{
            const {id} = req.params;
            await AnotacoesService.deletarAnotacao(id);
            return res.status(204).send();
        }catch(error){
            return tratarErroController(res,error,"Erro ao deletar anotação")
        }
    }
}export default new AnotacoesController();