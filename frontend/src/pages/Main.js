import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api'

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';

//Dentro de Match o react passa todos os parâmetros para a rota.
export default function Main( { match }) {
    //sempre que o parâmetro do vetor for alterado, chama a função
    const [users, setUsers] = useState([]);
    
    async function handleLike(id ) {
        //o segundo parâmetro do post é o corpo da requisição
        await api.post(`/devs/${id}/likes`, null, {
            headers: {user: match.params.id}
        });

        //não podemos tratar a variável users dieramente, temos que
        //sobrescrever com a função set Users
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id ) {
        //o segundo parâmetro do post é o corpo da requisição
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {user: match.params.id}
        });

        //não podemos tratar a variável users dieramente, temos que
        //sobrescrever com a função set Users
        setUsers(users.filter(user => user._id !== id));
    }

    useEffect (() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })
            setUsers(response.data)
        }

        loadUsers();
    }, [match.params.id])
    return (
      <div className="main-container">
          <form>
          <div className="back-button-top">
                    <Link to="/">
                        <button type="button">
                            <span>
                                Voltar
                            </span>                        
                        </button>
                    </Link>
            </div>
              <Link to="/">
                <img src={logo} alt="Tindev"></img>
              </Link>  
                 {users.length > 0 ? (
                    <ul>
                     {users.map(user => (
                      
                      <li key={user._id}>
                      <img src={user.avatar} alt="Sem foto" />
                      <footer>
                          <strong>{user.name}</strong>
                          <p>{user.bio}</p>
                      </footer>
                      <div className="buttons">
                          <button type="button" onClick={() => handleDislike(user._id)}>
                            <img src={dislike} alt="dislike"></img>
                          </button>
                          <button type="button" onClick={() => handleLike(user._id)}>
                            <img src={like} alt="like" ></img>
                          </button>
                      </div>
                  </li>

                 ))}
                    </ul>
                //Caso a lista esteja vazia   
                 ) : (
                    <div className="empty">Acabou :(</div>
                 ) 
                 }
                 <div className="back-button-low">
                    <Link to="/">
                        <button type="button">
                            <span>
                                Voltar
                            </span>  
                        </button>
                    </Link>
                 </div>
                 
          </form>
      </div>
    );
}