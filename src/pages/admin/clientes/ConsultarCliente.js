import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../api/constants";

function ConsultarCliente() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [searchName, setSearchName] = useState(''); // Alterado de searchId para searchName
    const [filteredClients, setFilteredClients] = useState([]);
    const [services, setServices] = useState([]); // Para armazenar os serviços
    const [loading, setLoading] = useState(false);
    const [editingClientId, setEditingClientId] = useState(null);
    const [editClientData, setEditClientData] = useState({
        nome: '',
        servico_id: '',
        endereco: '',
        telefone: '',
        cpf: ''
    });
    useEffect(() => {
        if (localStorage.getItem('TOKEN') === null) {
            navigate('/login');
        } else {
            buscar();
        }
    }, [navigate]);

    async function buscar() {
        setLoading(true);
        try {
            const token = localStorage.getItem('TOKEN');
            // Buscar clientes
            const resp = await axios.get(`${API_URL}/api/clientes`, {
                headers: { 'x-access-token': token }
            });
            setClients(resp.data);
            setFilteredClients(resp.data);

            // Buscar serviços
            const servicesResp = await axios.get(`${API_URL}/api/servicos`, {
                headers: { 'x-access-token': token }
            });
            setServices(servicesResp.data);

        } catch (error) {
            console.error("Erro ao buscar clientes ou serviços:", error);
            alert("Erro ao buscar clientes ou serviços. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    async function excluir(id) {
        if (!window.confirm(`Deseja realmente excluir o cliente com ID: ${id}?`)) return;

        setLoading(true);
        try {
            await axios.delete(`${API_URL}/api/clientes/delete/${id}`, {
                headers: { 'x-access-token': localStorage.getItem('TOKEN') }
            });
            setClients(clients.filter(client => client.id !== id));
            setFilteredClients(filteredClients.filter(client => client.id !== id));
            alert('Registro excluído');
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir cliente. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    // Alterar função de busca para filtrar pelo nome
    const handleSearch = () => {
        const result = clients.filter(client =>
            client.nome.toLowerCase().includes(searchName.toLowerCase())
        );

        // Verificar se algum cliente foi encontrado
        if (result.length === 0) {
            alert('Cliente não encontrado!');
        }

        setFilteredClients(result.length > 0 ? result : clients);
    };

    const handleEdit = (id) => {
        const clientToEdit = clients.find(client => client.id === id);
        if (clientToEdit) {
            setEditClientData({
                nome: clientToEdit.nome,
                servico_id: clientToEdit.servico_id,
                endereco: clientToEdit.endereco,
                telefone: clientToEdit.telefone,
                cpf: clientToEdit.cpf
            });
        }
        setEditingClientId(id);
    };

    const handleCancelEdit = () => {
        setEditingClientId(null);
    };

    const handleSave = async (id) => {
        if (!editClientData.nome || !editClientData.servico_id || !editClientData.endereco || !editClientData.telefone || !editClientData.cpf) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        setLoading(true);
        try {
            await axios.put(`${API_URL}/api/clientes/update/${id}`, {
                nome: editClientData.nome,
                servico_id: editClientData.servico_id,
                endereco: editClientData.endereco,
                telefone: editClientData.telefone,
                cpf: editClientData.cpf
            }, {
                headers: { 'x-access-token': localStorage.getItem('TOKEN') }
            });

            setClients(clients.map(client =>
                client.id === id ? { ...client, ...editClientData } : client
            ));

            setEditingClientId(null);
            alert('Registro atualizado com sucesso');
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            alert("Erro ao atualizar cliente. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setEditClientData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const getServicoDescricao = (servicoId) => {
        const servico = services.find(service => service.id === servicoId);
        return servico ? servico.descricao : 'Serviço não encontrado';
    };

    return (
        <div className="main-container">
            <aside className="sidebar">
                <ul>
                    <li>
                        <h1
                            className={'selected'}
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
                            className={''}
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
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Digite o nome para consulta"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)} // Alterado para searchName
                    />
                    <button className="search-button" onClick={handleSearch}>Consultar Nome</button>
                </div>

                {loading && <p>Carregando...</p>}

                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Serviço</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>CPF</th>
                        <th>Confirmar</th>
                        <th>Alt</th>
                        <th>Del</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredClients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>
                                {editingClientId === client.id ? (
                                    <input
                                        type="text"
                                        value={editClientData.nome}
                                        onChange={(e) => handleChange('nome', e.target.value)}
                                    />
                                ) : (
                                    client.nome
                                )}
                            </td>
                            <td>
                                {editingClientId === client.id ? (
                                    <input
                                        type="number"
                                        value={editClientData.servico_id}
                                        onChange={(e) => handleChange('servico_id', e.target.value)}
                                    />
                                ) : (
                                    getServicoDescricao(client.servico_id) // Exibe a descrição do serviço
                                )}
                            </td>
                            <td>
                                {editingClientId === client.id ? (
                                    <input
                                        type="text"
                                        value={editClientData.endereco}
                                        onChange={(e) => handleChange('endereco', e.target.value)}
                                    />
                                ) : (
                                    client.endereco
                                )}
                            </td>
                            <td>
                                {editingClientId === client.id ? (
                                    <input
                                        type="text"
                                        value={editClientData.telefone}
                                        onChange={(e) => handleChange('telefone', e.target.value)}
                                    />
                                ) : (
                                    client.telefone
                                )}
                            </td>
                            <td>
                                {editingClientId === client.id ? (
                                    <input
                                        type="text"
                                        value={editClientData.cpf}
                                        onChange={(e) => handleChange('cpf', e.target.value)}
                                    />
                                ) : (
                                    client.cpf
                                )}
                            </td>
                            <td>
                                {editingClientId === client.id ? (
                                    <button className="confirm-button" onClick={() => handleSave(client.id)}>✔️</button>
                                ) : (
                                    <span>-</span>
                                )}
                            </td>
                            <td>
                                {editingClientId === client.id ? (
                                    <button className="cancel-button" onClick={handleCancelEdit}>❌</button>
                                ) : (
                                    <button className="edit-button" onClick={() => handleEdit(client.id)}>✏️</button>
                                )}
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => excluir(client.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConsultarCliente;
