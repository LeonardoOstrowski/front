import React from 'react';
import Admin from "./Admin";
import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";

function AdminIndex() {
    return (
        <div className="AdminIndex">
            <Header />
            <Admin />
        </div>
    );
}

export default AdminIndex;
