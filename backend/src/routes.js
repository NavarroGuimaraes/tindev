const express = require('express');
//importar a classe de controller e os métodos de manipulação de dados
const DevController = require('./controllers/DevController');
//importar a classe de controller do like. Lembrando que os controllers
//devem possuir apenas os métodos de index, insert, delete, update, remove
const LikeController = require('./controllers/LikeController');
//importar a classe de controller do dislike. 
const DislikeController = require('./controllers/DislikeController');
//Cria um objeto com as rotas
const routes = express.Router();

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store);
//Nesse tipo de rota (post) quando o endereço for esse, chama o LikeController
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);
//Exporta objeto das rotas
module.exports = routes;