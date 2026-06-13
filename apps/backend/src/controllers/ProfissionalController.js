import ProfissionalService from "../services/ProfissionalService.js"

export class ProfissionalController {
    async listarProfissionais(req, res) {
        try {
        const lista = await ProfissionalService.listarTodosProfissionais();
        return res.status(200).json(lista);
        } catch (error) {
        console.error('Erro ao buscar profissionais:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    async exibirProfissionalPorId(req,res){
        try {
            const { id } = req.params;
            const profissional = await ProfissionalService.exibirProfissionalPorId(id);
            return res.status(200).json(profissional);
        } 
        catch (error) {
            console.error('Erro ao buscar profissionais:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    async exibirProfissionalPorUsuario(req,res){
        try {
            const { usuarioId } = req.params;
            const profissional = await ProfissionalService.exibirProfissionalPorUsuario(usuarioId);
            return res.status(200).json(profissional);
        } 
        catch (error) {
            console.error('Erro ao buscar profissionais:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    async autalizarProfissional(req,res){
        try {
            const { id } = req.params;
            const { profissionalAtualizado } = req.body;
            const profissional = await ProfissionalService.autalizarProfissional(usuarioId);
            return res.status(200).json(profissional);
        } 
        catch (error) {
            console.error('Erro ao buscar profissionais:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
    
    
}



