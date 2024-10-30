import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate();

    async function logar() {
        try {
            let body = {
                "email": email,
                "senha": senha
            }

            let resp = await axios.post('http://localhost:3010/login', body);

            localStorage.setItem('TOKEN', resp.data.token);

            navigate('/admin');

        }
        catch (err) {
            alert("Ocorreu um erro ao processar a solicitação de login.")
        }
    }

    return (
            <div className="login-form">
                <form>
                    <label>Login</label>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                    <label>Senha</label>
                    <input type='password' value={senha} onChange={e => setSenha(e.target.value)}/>
                    <button type="submit" onClick={logar}>
                        Entrar
                    </button>
                </form>
            </div>
    );
};

export default Login;