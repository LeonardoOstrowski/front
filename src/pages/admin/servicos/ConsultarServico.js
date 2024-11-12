import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../api/constants";

function ConsultarServico() {
    const navigate = useNavigate();
    const [servicos, setServicos] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [filteredServicos, setFilteredServicos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingServicoId, setEditingServicoId] = useState(null);
    const [editServicoData, setEditServicoData] = useState({
        descricao: '',
        data: '',
        custo: ''
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
            const resp = await axios.get(`${API_URL}/api/servicos`, {
                headers: { 'x-access-token': token }
            });

            // Converte o campo custo para número se necessário
            const servicosComCustoNumerico = resp.data.map(servico => ({
                ...servico,
                custo: parseFloat(servico.custo) || 0 // Converte custo para número, ou usa 0 se não for válido
            }));

            setServicos(servicosComCustoNumerico);
            setFilteredServicos(servicosComCustoNumerico);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
            alert("Erro ao buscar serviços. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }


    async function excluir(id) {
        if (!window.confirm(`Deseja realmente excluir o serviço com ID: ${id}?`)) return;

        setLoading(true);
        try {
            await axios.delete(`${API_URL}/api/servicos/delete/${id}`, {
                headers: { 'x-access-token': localStorage.getItem('TOKEN') }
            });
            setServicos(servicos.filter(servico => servico.id !== id));
            setFilteredServicos(filteredServicos.filter(servico => servico.id !== id));
            alert('Serviço excluído');
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
            alert("Erro ao excluir serviço. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = () => {
        const result = servicos.filter(servico => servico.id === parseInt(searchId));
        setFilteredServicos(result.length > 0 ? result : servicos);
    };

    const handleEdit = (id) => {
        const servicoToEdit = servicos.find(servico => servico.id === id);
        if (servicoToEdit) {
            setEditServicoData({
                descricao: servicoToEdit.descricao,
                data: servicoToEdit.data,
                custo: servicoToEdit.custo
            });
        }
        setEditingServicoId(id);
    };

    const handleCancelEdit = () => {
        setEditingServicoId(null);
    };

    async function handleSave(id) {
        if (!editServicoData.descricao || !editServicoData.data || !editServicoData.custo) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        setLoading(true);
        try {
            await axios.put(`${API_URL}/api/servicos/update/${id}`, {
                descricao: editServicoData.descricao,
                data: editServicoData.data, // Envia a data no formato correto
                custo: parseFloat(editServicoData.custo) // Converte o custo para número decimal
            }, {
                headers: { 'x-access-token': localStorage.getItem('TOKEN') }
            });

            setServicos(servicos.map(servico =>
                servico.id === id ? { ...servico, descricao: editServicoData.descricao, data: editServicoData.data, custo: editServicoData.custo } : servico
            ));

            setEditingServicoId(null);
            alert('Serviço atualizado com sucesso');
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
            alert("Erro ao atualizar serviço. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }


    const handleChange = (field, value) => {
        setEditServicoData(prevState => ({
            ...prevState,
            [field]: value
        }));
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
                            className={'selected'}
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
                            onClick={() => navigate('/')}
                        >
                            Home
                        </h3>
                    </li>
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
                        <th>Descrição</th>
                        <th>Data</th>
                        <th>Custo</th>
                        <th>Confirmar</th>
                        <th>Alt</th>
                        <th>Del</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredServicos.map(servico => (
                        <tr key={servico.id}>
                            <td>{servico.id}</td>
                            <td>
                                {editingServicoId === servico.id ? (
                                    <input
                                        type="text"
                                        value={editServicoData.descricao}
                                        onChange={(e) => handleChange('descricao', e.target.value)}
                                    />
                                ) : (
                                    servico.descricao
                                )}
                            </td>
                            <td>
                                {editingServicoId === servico.id ? (
                                    <input
                                        type="text"
                                        value={editServicoData.data}
                                        onChange={(e) => handleChange('data', e.target.value)}
                                    />
                                ) : (
                                    // Exibir a data formatada (se necessário)
                                    new Date(servico.data).toLocaleDateString()
                                )}
                            </td>
                            <td>
                                {editingServicoId === servico.id ? (
                                    <input
                                        type="number"
                                        value={editServicoData.custo}
                                        onChange={(e) => handleChange('custo', e.target.value)}
                                    />
                                ) : (
                                    !isNaN(servico.custo) ? servico.custo.toFixed(2) : "N/A"
                                )}
                            </td>
                            <td>
                                {editingServicoId === servico.id ? (
                                    <button className="confirm-button"
                                            onClick={() => handleSave(servico.id)}>✔️</button>
                                ) : (
                                    <span>-</span>
                                )}
                            </td>
                            <td>
                                {editingServicoId === servico.id ? (
                                    <button className="cancel-button" onClick={handleCancelEdit}>❌</button>
                                ) : (
                                    <button className="edit-button" onClick={() => handleEdit(servico.id)}>✏️</button>
                                )}
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => excluir(servico.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConsultarServico;
