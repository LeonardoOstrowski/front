import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Avaliacoes() {
    const testimonials = [
        {
            image: 'https://imgur.com/YRLRZYu.png',
            text: 'Contratei o serviço de demolição e ficou perfeito! Preço acessível e justo.',
            name: 'Amanda Silva'
        },
        {
            image: 'https://imgur.com/FgrfD8r.png',
            text: 'Excelente trabalho na construção do meu muro. Recomendo a todos!',
            name: 'Caroline Guimarães'
        },
        {
            image: 'https://imgur.com/6etDeDd.png',
            text: 'Profissional muito atencioso e competente. Resolveu tudo rapidamente.',
            name: 'Larissa Gonçalves'
        },
        {
            image: 'https://imgur.com/juAKzHg.png',
            text: 'Muito satisfeito com o serviço de alvenaria. Trabalho de alta qualidade.',
            name: 'Gabriela Souza'
        }
    ];

    const responsive = {
        superLargeDesktop: {
            // Configuração para telas muito grandes
            breakpoint: { max: 4000, min: 1024 },
            items: 3
        },
        desktop: {
            // Configuração para telas de desktop
            breakpoint: { max: 1024, min: 768 },
            items: 2
        },
        tablet: {
            // Configuração para tablets
            breakpoint: { max: 768, min: 464 },
            items: 1
        },
        mobile: {
            // Configuração para dispositivos móveis
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="testimonials-carousel">
            <h2>Depoimentos</h2>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                showDots={true}
                arrows={true}
            >
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                        <img src={testimonial.image} alt={testimonial.name} />
                        <p>{testimonial.text}</p>
                        <h4>{testimonial.name}</h4>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default Avaliacoes;
