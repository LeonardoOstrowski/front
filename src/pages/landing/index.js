import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Afiliacoes from './components/Afiliacoes';
import Biografia from './components/Biografia';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Depoimentos from './components/Avaliacoes';
import Footer from './components/Footer';
import './index.scss';

function App() {
    return (
        <div className="App">
            <Header />
            <Banner />
            <Afiliacoes />
            <Biografia />
            <Services />
            <FAQ />
            <Depoimentos />
            <Footer />
        </div>
    );
}

export default App;
