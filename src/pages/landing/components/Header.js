import React from 'react';
import {useNavigate} from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <header>
            <div className="container">
                <img src="https://imgur.com/ytKEGf8.png" alt="logo" className="header-logo" onClick={handleHomeClick}/>
                <nav className="nav">
                    <a href="#biografia">Biografia</a>
                    <a href="#servicos">Serviços</a>
                    <a href="#contato">Contato</a>
                </nav>
                <button className="login-button" onClick={handleLoginClick}>
                    Login
                </button>
            </div>
        </header>
    );
}

export default Header;
