import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_URL } from "../../api/constants";

function Login() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function logar(event) {
        event.preventDefault();
        try {
            let body = {
                "name": login,
                "password": senha
            };

            let resp = await axios.post(`${API_URL}/api/users/login`, body);

            localStorage.setItem('TOKEN', resp.data.token);

            navigate('/admin');

        } catch (err) {
            if (err.response && err.response.data) {
                if (err.response.data.error === 'Usuário ou senha incorretos') {
                    alert('Usuário ou senha incorretos');
                } else if (err.response.data.error === 'Usuário não encontrado') {
                    alert('Usuário não encontrado');
                } else {
                    alert('Ocorreu um erro ao processar o login.');
                }
            } else {
                alert('Erro de conexão com o servidor. Tente novamente mais tarde.');
            }
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={logar}>
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
                <button type="submit">
                    Entrar
                </button>
            </form>

        </div>
    );
}

export default Login;
