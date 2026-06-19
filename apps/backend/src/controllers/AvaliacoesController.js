import AvaliacoesService  from "../services/AvaliacoesService.js";

function tratarErroController(res, error, mensagemLog = 'Erro no servidor') {
    console.error(`${mensagemLog}:`, error);

    if (error.code === 'P2025' || (error.message && error.message.includes('não encontrado'))) {
        return res.status(404).json({ mensagem: error.message || "Recurso não encontrado." });
    }
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
}

class AvaliacoesController{

    async criarAvaliacao(req, res) {
        try {
            const avaliacao = req.body;
            const novaAvaliacao = await AvaliacoesService.criarAvaliacao(avaliacao);
            return res.status(201).json(novaAvaliacao);
            
        } catch (error) {
            return tratarErroController(res, error, "Erro ao criar avaliação");
        }
    }
    async atualizarAvaliacao(req,res){
        const avaliacao = req.body;
        const {id} = req.params;

        try{
            const avaliacaoAtualizada = await AvaliacoesService.atualizarAvaliacao(id,avaliacao)
            return res.status(200).json(avaliacaoAtualizada);

        } catch(error){
            return tratarErroController(res, error, "Erro ao atualizar avaliação")
        }
    }
    async encontrarAvaliacaoPorId(req,res){
        try{    
            const {id} = req.params;
            const avaliacaoEncontrada = await AvaliacoesService.encontrarAvaliacaoPorId(id);
            return res.status(200).json(avaliacaoEncontrada);
        
        } catch (error){
            return tratarErroController(res, error, "Erro ao buscar avaliação");
        }       
    }
    async encontrarTodasAsAvaliacoesPorPaciente(req,res){
        try{    
            const {pacienteId} = req.params;
            const listaDeAvaliacoesPorPaciente = await AvaliacoesService.encontrarTodasAsAvaliacoesPorPaciente(pacienteId);
            return res.status(200).json(listaDeAvaliacoesPorPaciente);


        }catch(error){
            return tratarErroController(res,error, "Erro ao buscar avaliações:");
        }
    }
    async encontrarTodasAsAvaliacoesPorProfissional(req,res){
        try{    
            const {profissionalId} = req.params;
            const listaDeAvalicaoesPorProfissional = await AvaliacoesService.encontrarTodasAsAvaliacoesPorProfissional(profissionalId);
            return res.status(200).json(listaDeAvalicaoesPorProfissional);


        }catch(error){
            return tratarErroController(res,error, "Erro ao buscar avaliações:");
        }
    }    
    async deletarAvaliacaoPorId(req,res){
        try{
            const {id} = req.params;
            await AvaliacoesService.deletarAvaliacaoPorId(id);
            return res.status(204).send();
        }catch(error){
            return tratarErroController(res,error,"Erro ao deletar avaliação")
        }
    }
}export default new AvaliacoesController();