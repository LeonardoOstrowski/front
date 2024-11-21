import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../api/constants";

function CadastrarServico() {
    const navigate = useNavigate();
    const [description, setDescription] = useState(''); // Para descrição do serviço
    const [price, setPrice] = useState(''); // Para preço do serviço
    const [date, setDate] = useState(''); // Para a data do serviço
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('TOKEN') === undefined) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!description || !price || !date) {
            alert('Todos os campos devem ser preenchidos corretamente!');
            setLoading(false);
            return;
        }

        try {
            let body = {
                'descricao': description,
                'custo': price,
                'data': date
            };

            const token = localStorage.getItem('TOKEN');
            await axios.post(`${API_URL}/api/servicos`, body, { headers: { 'x-access-token': token } });
            alert('Serviço cadastrado com sucesso!');
            navigate('/admin/consultar/servicos');
        } catch (error) {
            console.error("Erro ao cadastrar serviço:", error.response || error);
            alert(`Erro ao cadastrar serviço: ${error.response?.data?.error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <aside className="sidebar">
                <ul>
                    <li>
                        <h1
                            className={''}
                            onClick={() => navigate('/admin/consultar/clientes')}
                        >
                            Consultar Clientes
                        </h1>
                    </li>
                    <li>
                        <h2
                            className={''}
                            onClick={() => navigate('/admin/cadastrar/clientes')}
                        >
                            Cadastrar Cliente
                        </h2>
                    </li>
                    <li>
                        <h2
                            className={''}
                            onClick={() => navigate('/admin/consultar/servicos')}
                        >
                            Consultar Serviços
                        </h2>
                    </li>
                    <li>
                        <h2
                            className={'selected'}
                            onClick={() => navigate('/admin/cadastrar/servico')}
                        >
                            Cadastrar Serviço
                        </h2>
                    </li>
                    <li>
                        <h3
                            className={''}
                            onClick={() => navigate('/admin/grafico')}
                        >
                            Gráfico de Serviços
                        </h3>
                    </li>
                    <li>
                        <h4
                            className={''}
                            onClick={() => navigate('/')}
                        >
                            Home
                        </h4>
                    </li>
                </ul>
            </aside>

            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Descrição do Serviço:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Custo:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Data:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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

export default CadastrarServico;
