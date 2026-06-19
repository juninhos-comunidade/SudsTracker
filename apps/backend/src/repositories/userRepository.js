import prisma from '../config/database.js';

class UserRepository {
    async encontrarPorEmail(email) {
        return await prisma.user.findUnique({ 
            where: { email } 
        });
    }
    async atualizarPorId(userID, updatedUser) {
        return await prisma.user.update({
            where: { id: userID },
            data: updatedUser
        });
    }
    async encontrarPorId(userID){
        return await prisma.user.findUnique({
            where: { id: userID}
        });
    }

    async criarUsuario(usuario) {
        return await prisma.user.create({data: usuario});
    }
    
    async deletarPorId(userID){
        return await prisma.user.delete({
            where: {id: userID}
        });
    }
}

export default new UserRepository();