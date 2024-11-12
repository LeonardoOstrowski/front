import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/landing";
import LoginIndex from "./pages/login/LoginIndex";
import ConsultarIndex from "./pages/admin/clientes/ConsultarIndex";
import CadastrarIndex from "./pages/admin/clientes/CadastrarIndex";
import ConsultarServicoIndex from "./pages/admin/servicos/ConsultarServicoIndex";
import CadastrarServicoIndex from "./pages/admin/servicos/CadastrarServicoIndex";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginIndex />} />
                <Route path='/admin' element={<ConsultarIndex />} />
                <Route path='/admin/consultar/clientes' element={<ConsultarIndex />} />
                <Route path='/admin/cadastrar/clientes' element={<CadastrarIndex />} />
                <Route path='/admin/consultar/servicos' element={<ConsultarServicoIndex />} />
                <Route path='/admin/cadastrar/servico' element={<CadastrarServicoIndex />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

