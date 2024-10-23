import React from 'react';

function Services() {
    return (
        <div className="services">
            <h2>Serviços</h2>
            <div className="service-item">
                <div>
                    <h3>Paredão</h3>
                    <ul>
                        <li>Tempo: 3 dias</li>
                        <li>Argamassa por conta do cliente</li>
                        <li>750 $</li>
                    </ul>
                </div>
                <img src="https://imgur.com/0WPvYQU.png" alt="Serviço de Paredão" />
            </div>
            <div className="service-item">
                <div>
                    <h3>Demolição</h3>
                    <ul>
                        <li>Tempo: dependendo da área</li>
                        <li>Escavadeira por conta da casa</li>
                        <li>1700 $</li>
                    </ul>
                </div>
                <img src="https://imgur.com/3UDfYrS.png" alt="Serviço de Demolição" />
            </div>
        </div>
    );
}

export default Services;
