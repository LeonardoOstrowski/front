import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]); // Inicializa com um array vazio
    const [searchId, setSearchId] = useState(''); // Para capturar o ID de consulta
    const [filteredClients, setFilteredClients] = useState([]); // Lista de clientes filtrados

    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/login');
        } else {
            buscar();
        }
    }, [navigate]);

    async function buscar() {
        try {
            let token = localStorage.getItem('TOKEN');
            let resp = await axios.get('http://localhost:3010/clientes', {
                headers: { 'x-access-token': token }
            });

            setClients(resp.data);
            setFilteredClients(resp.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            alert("Erro ao buscar clientes. Tente novamente.");
        }
    }

    // Função para excluir cliente
    async function excluir(id) {
        try {
            await axios.delete('http://localhost:3010/clientes/' + id, {
                headers: { 'x-access-token': localStorage.getItem('TOKEN') }
            });
            alert('Registro excluído');
            await buscar(); // Atualiza a lista após a exclusão
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir cliente. Tente novamente.");
        }
    }

    // Função para buscar cliente por ID
    const handleSearch = () => {
        const result = clients.filter(client => client.id === parseInt(searchId));
        setFilteredClients(result.length > 0 ? result : clients);
    };

    const handleEdit = (id) => {
        setClients(clients.map(client =>
            client.id === id ? { ...client, isEditing: true } : client
        ));
    };

    const handleSave = async (id) => {
        const clientToUpdate = clients.find(client => client.id === id);
        try {
            await axios.put(`http://localhost:3010/clientes/${id}`, {
                name: clientToUpdate.name,
                date: clientToUpdate.date,
                service: clientToUpdate.service
            }, {
                headers: { 'x-access-token': localStorage.getItem('TOKEN') }
            });
            setClients(clients.map(client =>
                client.id === id ? { ...client, isEditing: false } : client
            ));
            alert('Registro atualizado com sucesso');
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            alert("Erro ao atualizar cliente. Tente novamente.");
        }
    };

    const handleChange = (id, field, value) => {
        setClients(clients.map(client =>
            client.id === id ? { ...client, [field]: value } : client
        ));
    };

    const handleDelete = (id) => {
        if (window.confirm(`Deseja realmente excluir o cliente com ID: ${id}?`)) {
            excluir(id);
        }
    };

    return (
        <div className="main-container">
            <aside className="sidebar">
                <ul>
                    <h1>Consultar Cliente</h1>
                    <h2>Cadastrar Cliente</h2>
                    <h3 onClick={() => navigate('/')}>Home</h3>
                </ul>
            </aside>

            <div className="content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Digite o ID para consulta"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)} // Atualiza o valor do ID digitado
                    />
                    <button className="search-button" onClick={handleSearch}>Consultar ID</button>
                </div>

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
                                {client.isEditing ? (
                                    <input
                                        type="text"
                                        value={client.name}
                                        onChange={(e) => handleChange(client.id, 'name', e.target.value)}
                                    />
                                ) : (
                                    client.name
                                )}
                            </td>
                            <td>
                                {client.isEditing ? (
                                    <input
                                        type="text"
                                        value={client.date}
                                        onChange={(e) => handleChange(client.id, 'date', e.target.value)}
                                    />
                                ) : (
                                    client.date
                                )}
                            </td>
                            <td>
                                {client.isEditing ? (
                                    <input
                                        type="text"
                                        value={client.service}
                                        onChange={(e) => handleChange(client.id, 'service', e.target.value)}
                                    />
                                ) : (
                                    client.service
                                )}
                            </td>
                            <td>
                                {client.isEditing ? (
                                    <button className="confirm-button" onClick={() => handleSave(client.id)}>✔️</button>
                                ) : (
                                    <input type="checkbox" />
                                )}
                            </td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(client.id)}>✏️</button>
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(client.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
