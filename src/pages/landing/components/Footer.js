import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Endereço</h3>
                        <p>Ponto de acesso perto da estação de metrô</p>
                        <p>Rua Industrial, CEP: 98765-444</p>
                    </div>
                    <div className="footer-section">
                        <h3>Contato</h3>
                        <p>Email: contato@exemplo.com</p>
                        <p>Telefone: (11) 98765-4321</p>
                    </div>
                    <div className="footer-section">
                        <h3>Redes Sociais</h3>
                        <p>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                               className="button">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                               className="button">Twitter</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                               className="button">LinkedIn</a>
                        </p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 João Paulo Pedreiro. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
