import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../api/constants";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function Grafico() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("TOKEN") === undefined) {
            navigate("/login");
            return;
        }

        const fetchServices = async () => {
            try {
                const token = localStorage.getItem("TOKEN");
                const response = await axios.get(`${API_URL}/api/servicos`, {
                    headers: { "x-access-token": token },
                });
                setServices(response.data);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error.response || error);
                alert(`Erro ao buscar serviços: ${error.response?.data?.error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [navigate]);

    const data = {
        labels: services.map((service) => new Date(service.data).toLocaleDateString("pt-BR")),
        datasets: [
            {
                label: "Valores dos Serviços (R$)",
                data: services.map((service) => service.custo),
                borderColor: "rgba(255, 165, 0, 1)",
                backgroundColor: "rgba(255, 165, 0, 0.2)",
                tension: 0.2, // Suavidade das curvas
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="main-container">
            <aside className="sidebar">
                <ul>
                    <li>
                        <h1 onClick={() => navigate("/admin/consultar/clientes")}>Consultar Clientes</h1>
                    </li>
                    <li>
                        <h2 onClick={() => navigate("/admin/cadastrar/clientes")}>Cadastrar Cliente</h2>
                    </li>
                    <li>
                        <h2 onClick={() => navigate("/admin/consultar/servicos")}>Consultar Serviços</h2>
                    </li>
                    <li>
                        <h2 onClick={() => navigate("/admin/cadastrar/servico")}>Cadastrar Serviço</h2>
                    </li>
                    <li>
                        <h3
                            className={'selected'}
                            onClick={() => navigate('/admin/grafico')}
                        >
                            Gráfico de Serviços
                        </h3>
                    </li>
                    <li>
                        <h3 onClick={() => navigate("/")}>Home</h3>
                    </li>
                </ul>
            </aside>

            <div className="content">
                <h2>Relatório de Valores dos Serviços</h2>
                <Line data={data} options={options}/>
            </div>
        </div>
    );
}

export default Grafico;
