const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        //Id do usuário que está dando o like
        const { user } = req.headers;
        //Id do usuário que está recebendo o like
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);
        //Se o usuário destino do like não existir
        if (!targetDev) {
            return res.status(400).json({ error : 'Dev does not exist'});
        }
        
        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('Deu Match!');
        }

        //se deu tudo certo, vamos pegar o desenvolvedor que está logado
        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();



        return res.json(loggedDev);
    }
};