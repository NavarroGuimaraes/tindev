//importamos os métodos que queremos da calsse do mongoose dentro de um objeto
//essa importação vai pegar somente o Schema e Model
const { Schema, model} = require('mongoose');

//Cria um esquema do banco de dados
//Os dados que não forem obrigatórios não são necessários colchetes. Elas são 
//usadas para passar um objeto com mais de uma informação
const DevSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    user : {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev', 
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev', 
    }]
}, {
    timestamps: true
});
//Esse segundo parâmetro de timeStamps vai criar duas colunas de de forma 
//Automática. Serão elas: createdAt e updatedAt

module.exports = model('Dev', DevSchema);