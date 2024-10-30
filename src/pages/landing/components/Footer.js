import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section location">
                    <img src="https://imgur.com/ytKEGf8.png" alt="Logo" className="logo"/>
                    <p>Ponto de acesso perto da estação autódromo</p>
                    <p>ㅤ</p>
                    <p>Endereço: Rua fulandital<br/>CEP: 98765-444</p>
                </div>

                <div className="footer-section subscribe">
                    <label htmlFor="email">Seu Email</label>
                    <div className="subscribe-container">
                        <input type="email" id="email" placeholder="example@email.com"/>
                        <button type="submit">Subscribe</button>
                    </div>
                </div>

                <div className="footer-section links">
                    <h3>Links</h3>
                    <ul>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h3>Redes sociais</h3>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>copyright © 2024</p>
            </div>
        </footer>
    );
}

export default Footer;
