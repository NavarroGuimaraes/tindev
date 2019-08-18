const axios = require('axios');
const Dev = require('../models/Dev');

//Sempre que dentor de uma função existir algum await é necessário que a função
//seja async

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        //no mongoDb é possível utilzar uma lista de ands para que não tenhamos
        //que colocar todos como no oracle
        //procura todos os usuários onde o Id seja not equals user
        //and
        const users = await Dev.find({
            $and: [
                { _id: { $ne:user }},
                { _id: { $nin: loggedDev.likes }},
                { _id: { $nin: loggedDev.dislikes }},
            ],
        });
        return res.json(users);
    },
    async store(req, res) {
        //constante {objeto quer quero buscar} = onde está esse dado.
        //Seria a mesma coisa que pegar req.body.username. Porém aqui, estou
        //guardando em uma variável
        const { username } = req.body;
        //Para evitar que o mesmo usuário seja cadastrado repetidas vezes
        //vamos utilizar o método findOne para verificar se ele já existe
        //passamos o parâmetro user 
        const userExists = await Dev.findOne({user : username});
        //Se o usuário já existir, retorna o usuário para o cliente
        if (userExists) {
            return res.json(userExists);
        }
        //Pega os dados do link passado. Esses dados demoram um pouco, por isso 
        //precisamos aguardar utilizando o await
        const response = await axios.get(`https://api.github.com/users/${username}`);
        //pegamos o nome de acordo com as variaveis do json retornado no axios.
        //Podemos renomear para usá-las diferente com os dois pontos, forme abaixo
        const{ name, bio : descricao, avatar_url : avatar} = response.data;

        const dev = await Dev.create({
            name : name, 
            user: username,
            bio : descricao,
            avatar : avatar
        })

        return res.json(dev);
    }
}