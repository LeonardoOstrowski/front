import React from 'react';

function Banner() {
    return (
        <div className="banner">
            <div className="bio">
                <h2>João, um pedreiro de 35 anos...</h2>
                <p>
                    João, um pedreiro de 35 anos de uma pequena cidade, aprendeu o ofício
                    ajudando seu pai. Com habilidades em alvenaria, ele ganhou reconhecimento
                    pela qualidade de seu trabalho.
                </p>
                <button className="button">Biografia</button>
            </div>
            <img src="https://imgur.com/whkEWXF.png" alt="João, o pedreiro" className="banner-image"/>
        </div>
    );
}

export default Banner;
