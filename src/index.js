import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/landing";
import AdminIndex from "./pages/admin/AdminIndex";
import LoginIndex from "./pages/login/LoginIndex";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginIndex />} />
                <Route path='/admin' element={<AdminIndex />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

