//Função que quando chamada cria um novo servidor, uma nova porta de entrada 
//usada para requisições
const express = require('express');

//Importa a dependência mongoose para que não precisemos aprender a sintaxe do
//banco de dados
const mongoose = require('mongoose');
//Importa a dependência cors para que não possamos acessar o banco de dados
//de qualquer lugar
const cors = require('cors');
//Importa o arquivo de rotas. o ponto representa o caminho, pois estpa na
//mesma pasta
const routes = require('./routes');

//Criar o servidor importaado do express
const server = express();

//Usamos o newUrlParser para não dar erro de deprecated devido ao formato
mongoose.connect('mongodb+srv://bushyasta:Mkjogo10dif@cluster0-qvevk.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser : true
});

server.use(cors());
server.use(express.json());
server.use(routes);

//Porta pela qual o servidor irá responder
server.listen(8042);