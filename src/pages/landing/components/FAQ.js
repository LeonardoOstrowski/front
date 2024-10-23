import React from 'react';

function FAQ() {
    return (
        <div className="faq">
            <h2>Perguntas Frequentes</h2>
            <div className="faq-item">
                <p className="question">1 - Você oferece garantia do seu serviço?</p>
                <p className="answer">Sim, todos os nossos serviços têm garantia de qualidade. Em caso de problemas, basta nos contatar que resolveremos o mais rápido possível.</p>
            </div>
            <div className="faq-item">
                <p className="question">2 - Você pode me ajudar com o planejamento e a compra dos materiais?</p>
                <p className="answer">Sim, oferecemos consultoria completa para planejamento e compra de materiais, com indicações de fornecedores confiáveis.</p>
            </div>
            <div className="faq-item">
                <p className="question">3 - Quais são suas formas de pagamento?</p>
                <p className="answer">Aceitamos pagamento em dinheiro, transferência bancária e cartões de crédito. Parcelamentos podem ser negociados.</p>
            </div>
            <div className="faq-item">
                <p className="question">4 - Você atende em quais regiões?</p>
                <p className="answer">Atendemos principalmente na região metropolitana, mas também aceitamos projetos em cidades próximas mediante avaliação.</p>
            </div>
            <div className="faq-item">
                <p className="question">5 - É necessário que eu esteja em casa durante a execução da obra?</p>
                <p className="answer">Não necessariamente, mas recomendamos que esteja disponível para eventuais dúvidas e ajustes necessários.</p>
            </div>
            <div className="faq-item">
                <p className="question">6 - Você também faz serviços elétricos ou hidráulicos?</p>
                <p className="answer">Trabalhamos em parceria com profissionais qualificados para serviços elétricos e hidráulicos, caso precise.</p>
            </div>
            <div className="faq-item">
                <p className="question">7 - Como faço para acompanhar o progresso da obra?</p>
                <p className="answer">Oferecemos atualizações regulares sobre o andamento do projeto e também visitas ao local conforme sua disponibilidade.</p>
            </div>
            <div className="faq-item">
                <p className="question">8 - O que faço se algo der errado após a obra estar concluída?</p>
                <p className="answer">Estamos disponíveis para assistência pós-obra. Se surgir qualquer problema, entre em contato e faremos os reparos necessários.</p>
            </div>
        </div>
    );
}

export default FAQ;
