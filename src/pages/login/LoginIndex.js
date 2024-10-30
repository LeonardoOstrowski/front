import React from 'react';
import Login from "./Login";
import Footer from "../landing/components/Footer";
import Header from "../landing/components/Header";

function LoginIndex() {
    return (
        <div className="LoginIndex">
            <Header />
            <Login />
            <Footer />
        </div>
    );
}

export default LoginIndex;
