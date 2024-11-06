import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api/constants";

function CadastrarCliente() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [service, setService] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('TOKEN') === undefined) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!name || !date || !service) {
            alert('Todos os campos devem ser preenchidos corretamente!');
            setLoading(false);
            return;
        }

        try {
            let body = {
                'nome': name,
                'data': date,
                'servico': service
            }
            const token = localStorage.getItem('TOKEN');
            await axios.post(`${API_URL}/api/clientes`, body, { headers: { 'x-access-token': token }});
            alert('Cliente cadastrado com sucesso!');
            navigate('/admin/consultar');
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error.response || error);
            alert(`Erro ao cadastrar cliente: ${error.response?.data?.error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <aside className="sidebar">
                <ul>
                    <h1>Cadastrar Cliente</h1>
                    <h2 onClick={() => navigate('/admin/consultar')}>Consultar Cliente</h2>
                    <h3 onClick={() => navigate('/')}>Home</h3>
                </ul>
            </aside>

            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Data:</label>
                        <input
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Serviço:</label>
                        <input
                            type="text"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="cadastrar-button" disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastrarCliente;
