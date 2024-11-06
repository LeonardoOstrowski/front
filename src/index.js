import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/landing";
import LoginIndex from "./pages/login/LoginIndex";
import ConsultarIndex from "./pages/admin/ConsultarIndex";
import CadastrarIndex from "./pages/admin/CadastrarIndex";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginIndex />} />
                <Route path='/admin' element={<ConsultarIndex />} />
                <Route path='/admin/consultar' element={<ConsultarIndex />} />
                <Route path='/admin/cadastrar' element={<CadastrarIndex />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

