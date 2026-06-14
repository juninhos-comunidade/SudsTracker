import ProfissionalService from "../services/ProfissionalService.js"

function tratarErroController(res, error, mensagemLog = 'Erro no servidor') {
    console.error(`${mensagemLog}:`, error);

    if (error.message && error.message.includes('não encontrado')) {
        return res.status(404).json({ mensagem: error.message });
    }
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
}

export class ProfissionalController {
    async listarProfissionais(req, res) {
        try {
            const lista = await ProfissionalService.listarTodosProfissionais();
            return res.status(200).json(lista);
        } catch (error) {
             return tratarErroController(res, error, 'Erro ao buscar profissionais');
        }
    }

    async exibirProfissionalPorId(req,res){
        try {
            const { id } = req.params;
            const profissional = await ProfissionalService.exibirProfissionalPorId(id);
            return res.status(200).json(profissional);
        } 
        catch (error) {
             return tratarErroController(res, error, 'Erro ao buscar profissional por ID');

        }
    }

    async exibirProfissionalPorUsuario(req,res){
        try {
            const { usuarioId } = req.params;
            const profissional = await ProfissionalService.exibirProfissionalPorUsuario(usuarioId);
            return res.status(200).json(profissional);
        } 
        catch (error) {
            return tratarErroController(res, error, 'Erro ao buscar profissionais por usuário');
        }
    }

    async autalizarProfissional(req,res){
        try {
            const { id } = req.params;
            const  profissionalAtualizado  = req.body;
            const profissional = await ProfissionalService.autalizarProfissional(id, profissionalAtualizado);
            return res.status(200).json(profissional);
        } 
        catch (error) {
             return tratarErroController(res, error, 'Erro ao atualizar profissional.');

        }
    }
    async encontrarProfissionalPorPaciente(req,res){
        try {
            const { pacienteId } = req.params;
            const profissional = await ProfissionalService.encontrarProfissionalPorPaciente(pacienteId);
            return res.status(200).json(profissional);
        } 
        catch (error) {
             return tratarErroController(res, error, 'Erro ao buscar profissional por paciente');
        }
    }
    
}



