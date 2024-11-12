import React from 'react';
import Header from "../../landing/components/Header";
import ConsultarCliente from "./ConsultarCliente";

function ConsultarIndex() {
    return (
        <div className="AdminIndex">
            <Header />
            <ConsultarCliente />
        </div>
    );
}

export default ConsultarIndex;
