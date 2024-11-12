import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../api/constants";

function CadastrarCliente() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [serviceId, setServiceId] = useState(''); // Para armazenar o ID do serviço
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]); // Estado para armazenar a lista de serviços

    useEffect(() => {
        if (localStorage.getItem('TOKEN') === undefined) {
            navigate('/login');
        }

        // Buscar os serviços disponíveis
        const fetchServices = async () => {
            try {
                const token = localStorage.getItem('TOKEN');
                const response = await axios.get(`${API_URL}/api/servicos`, {
                    headers: { 'x-access-token': token }
                });
                setServices(response.data); // Armazenar os serviços na lista
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
                alert("Erro ao carregar serviços.");
            }
        };

        fetchServices(); // Chama a função para buscar os serviços
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!name || !serviceId || !address || !phone || !cpf) {
            alert('Todos os campos devem ser preenchidos corretamente!');
            setLoading(false);
            return;
        }

        try {
            const body = {
                'nome': name,
                'servico_id': serviceId, // Envia o ID do serviço selecionado
                'endereco': address,
                'telefone': phone,
                'cpf': cpf
            };

            const token = localStorage.getItem('TOKEN');
            await axios.post(`${API_URL}/api/clientes`, body, { headers: { 'x-access-token': token } });
            alert('Cliente cadastrado com sucesso!');
            navigate('/admin/consultar/clientes');
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
                    <li>
                        <h1 onClick={() => navigate('/admin/consultar/clientes')}>Consultar Clientes</h1>
                    </li>
                    <li>
                        <h2 className={'selected'} onClick={() => navigate('/admin/cadastrar/clientes')}>Cadastrar Cliente</h2>
                    </li>
                    <li>
                        <h2 onClick={() => navigate('/admin/consultar/servicos')}>Consultar Serviços</h2>
                    </li>
                    <li>
                        <h2 onClick={() => navigate('/admin/cadastrar/servico')}>Cadastrar Serviço</h2>
                    </li>
                    <li>
                        <h3 onClick={() => navigate('/')}>Home</h3>
                    </li>
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
                        <label>Serviço:</label>
                        <select
                            value={serviceId}
                            onChange={(e) => setServiceId(e.target.value)}
                            required
                        >
                            <option value="">Selecione um serviço</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.descricao}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Endereço:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefone:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>CPF:</label>
                        <input
                            type="text"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
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
