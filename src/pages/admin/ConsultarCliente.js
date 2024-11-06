import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api/constants";

function ConsultarCliente() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingClientId, setEditingClientId] = useState(null);
    const [editClientData, setEditClientData] = useState({
        nome: '',
        data: '',
        servico: ''
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
            const resp = await axios.get(`${API_URL}/api/clientes`, {
                headers: { 'x-access-token': token }
            });

            setClients(resp.data);
            setFilteredClients(resp.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            alert("Erro ao buscar clientes. Tente novamente.");
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

    const handleSearch = () => {
        const result = clients.filter(client => client.id === parseInt(searchId));
        setFilteredClients(result.length > 0 ? result : clients);
    };

    const handleEdit = (id) => {
        const clientToEdit = clients.find(client => client.id === id);
        if (clientToEdit) {
            setEditClientData({
                nome: clientToEdit.nome,
                data: clientToEdit.data, // Sem formatação adicional
                servico: clientToEdit.servico
            });
        }
        setEditingClientId(id);
    };

    const handleCancelEdit = () => {
        setEditingClientId(null);
    };

    const handleSave = async (id) => {
        if (!editClientData.nome || !editClientData.data || !editClientData.servico) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        setLoading(true);
        try {
            // A URL agora é `/update/:id`
            await axios.put(`${API_URL}/api/clientes/update/${id}`, {
                nome: editClientData.nome,
                data: editClientData.data,
                servico: editClientData.servico
            }, {
                headers: { 'x-access-token': localStorage.getItem('TOKEN') }
            });

            setClients(clients.map(client =>
                client.id === id ? { ...client, nome: editClientData.nome, data: editClientData.data, servico: editClientData.servico } : client
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

    return (
        <div className="main-container">
            <aside className="sidebar">
                <ul>
                    <h1>Consultar Cliente</h1>
                    <h2 onClick={() => navigate('/admin/cadastrar')}>Cadastrar Cliente</h2>
                    <h3 onClick={() => navigate('/')}>Home</h3>
                </ul>
            </aside>

            <div className="content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Digite o ID para consulta"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>Consultar ID</button>
                </div>

                {loading && <p>Carregando...</p>}

                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Serviço</th>
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
                                        type="text"
                                        value={editClientData.data}
                                        onChange={(e) => handleChange('data', e.target.value)}
                                    />
                                ) : (
                                    client.data
                                )}
                            </td>
                            <td>
                                {editingClientId === client.id ? (
                                    <input
                                        type="text"
                                        value={editClientData.servico}
                                        onChange={(e) => handleChange('servico', e.target.value)}
                                    />
                                ) : (
                                    client.servico
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
