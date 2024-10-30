import React from 'react';

function Biografia() {
    return (
        <div className="biography">
            <h2>Biografia</h2>
            <div className="bio-content">
                <p className="text-with-image">
                    João, um pedreiro de 35 anos, nasceu em uma pequena cidade do interior. Desde cedo, ajudava seu pai,
                    também pedreiro, nas obras da região. Aprendeu a arte da construção, desenvolvendo habilidades em
                    alvenaria, carpintaria e acabamento. Com o tempo, tornou-se conhecido pela qualidade do seu trabalho
                    e
                    pela dedicação.
                    <img src="https://imgur.com/trjz3TD.png" alt="Descrição da imagem" className="imagem"/>
                </p>
                <p className="text-with-image">
                    <img src="https://imgur.com/4GxBMxb.png" alt="Descrição da imagem" className="imagem" />
                    João sempre buscou se aprimorar, fazendo cursos e se atualizando sobre novas técnicas e materiais.
                    Ele
                    valoriza o trabalho em equipe e é respeitado pelos colegas pela sua ética e comprometimento. Além de
                    construir casas, ele sonha em um dia erguer um centro comunitário para ajudar sua cidade. Em sua
                    vida
                    pessoal, é casado e pai de dois filhos, e procura inspirá-los a buscar seus próprios sonhos.
                </p>
            </div>
        </div>
    );
}

export default Biografia;
