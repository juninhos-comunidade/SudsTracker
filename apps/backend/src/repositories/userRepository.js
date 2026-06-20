import prisma from '../config/database.js';

class UserRepository {
    async encontrarPorEmail(email) {
        return await prisma.Usuario.findUnique({ 
            where: { email } 
        });
    }
    async atualizarPorId(userID, updatedUser) {
        return await prisma.Usuario.update({
            where: { id: userID },
            data: updatedUser
        });
    }
    async encontrarPorId(userID){
        return await prisma.Usuario.findUnique({
            where: { id: userID}
        });
    }

    async criarUsuario(usuario) {
        return await prisma.Usuario.create({data: usuario});
    }
    
    async deletarPorId(userID){
        return await prisma.Usuario.delete({
            where: {id: userID}
        });
    }
}

export default new UserRepository();