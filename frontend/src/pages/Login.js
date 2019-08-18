import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css';
import api from '../services/api';
//Todo componente é uma função. O login é um componente.
//Utilizamos o export na declaração da função para que ela seja exportada
//assim que o componente for renderizado 
export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(evento) {
        evento.preventDefault();

        const response = await api.post('/devs', {
            username,
        });

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

    return (
        //sempre por volta dos componentes, criar uma dive de container
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='Tindev' />
                <input type="text" 
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={evento => setUsername(evento.target.value)}
                />
                <button type="submit"> 
                    Enviar
                </button>
            </form>
        </div>
    );
}

