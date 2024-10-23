import React from 'react';

function Header() {
    return (
        <header>
            <div className="container">
                <img src="https://imgur.com/ytKEGf8.png" alt="logo" className="header-logo"/>
                <nav className="nav">
                    <a href="#biografia">Biografia</a>
                    <a href="#servicos">Serviços</a>
                    <a href="#contato">Contato</a>
                </nav>
                <button className="login-button">Login</button>
            </div>
        </header>
    );
}

export default Header;
