import React from 'react';
import Header from "../landing/components/Header";
import CadastrarCliente from "./CadastrarCliente";

function CadastrarIndex() {
    return (
        <div className="AdminIndex">
            <Header />
            <CadastrarCliente />
        </div>
    );
}

export default CadastrarIndex;
