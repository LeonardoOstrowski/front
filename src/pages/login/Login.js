import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {API_URL} from "../../api/constants";

function Login() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function logar(event) {
        event.preventDefault(); // Impede a recarga da página
        try {
            let body = {
                "name": login,
                "password": senha
            };

            let resp = await axios.post(`${API_URL}/api/users/login`, body);

            localStorage.setItem('TOKEN', resp.data.token);

            navigate('/admin');

        } catch (err) {
            console.log(err.response); // Adicione isso para ver o erro completo
            alert("Ocorreu um erro ao processar o login.");
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={logar}> {/* Adicione o onSubmit ao formulário */}
                <label>Login</label>
                <input
                    type='text'
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
                <label>Senha</label>
                <input
                    type='password'
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button type="submit"> {/* O tipo submit é importante aqui */}
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;
