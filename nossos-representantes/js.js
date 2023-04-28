console.log(window.location.pathname)


//const fotoVereador = document.querySelector('#fotoVereador')


async function carregaParlamentar(numb) {
    const response = await fetch('./parlamentares')
    const data = await response.json()
    const nomeVeradorCima = document.querySelector('.esquerdoLateral div p')
    nomeVeradorCima.innerHTML = data[numb].posicao.toUpperCase() + " " + data[numb].nome

    const nomeVereadorImagem = document.querySelector('.imgFundoLagoa h2')
    nomeVereadorImagem.innerHTML = data[numb].nome.toUpperCase()

    const cargo = document.querySelector('.imgFundoLagoa h3')
    cargo.innerHTML = data[numb].posicao.toUpperCase()
    
    fotoVereador.src = data[numb].foto

    const infoNoLegislativo = document.querySelector('#infoNoLegislativo')
    const projetosPoliticos = document.querySelector('#projetosPoliticos')
    infoNoLegislativo.innerHTML = ''
    projetosPoliticos.innerHTML = ''

    

    for(let i=0; i < data[numb].legislativo.length; i++){
        infoNoLegislativo.innerHTML += `<div class="cardInfoLegislativo">
        <li><strong>Cargo:</strong> <p>${data[numb].legislativo[i].posicao} ${data[numb].legislativo[i].informacao}</p> </li>
        <li><strong>Inicio:</strong> <p>${data[numb].legislativo[i].datainicial}</p></li>
        <li><strong>Fim:</strong> <p>${data[numb].legislativo[i].datafinal}</p></li>
    </div>`
    }

    for (let index = 0; index < data[numb].projetos.length; index++) {

        projetosPoliticos.innerHTML += `<div class="infoState">
        <span>&#9745;</span>
        <div>
            <h3>Requerimento nº ${data[numb].projetos[index].numero}/${data[numb].projetos[index].ano}</h3>
            <p>Requerimento | Data: ${data[numb].projetos[index].data}</p>
            <p>Ementa: ${data[numb].projetos[index].nomeinfo}</p>
            <p>Informação: ${data[numb].projetos[index].informacao}</p>
            
            <a href="${data[numb].projetos[index].download}" target="_blank">
                <button>Saiba Mais</button>
            </a>
        </div>
    </div>`
        
    }

    

    dadosDoVereador.innerHTML = `${data[numb].historia}`




    
}

//carregaParlamentar(0)


const todosVereadoresOn = async () => {
    const response = await fetch('./parlamentares');
    const data = await response.json();

    const todosVereadoresOn = document.querySelector('#todosVereadoresOn')

    data.map((parlamentar, index) => {
        if(parlamentar.posicao == 'vereador' || parlamentar.posicao == 'vereadora'){
        todosVereadoresOn.innerHTML +=`<a href="#inicio">
            <div  onclick="carregaParlamentar(${index})" class="cardVereador">
            <img src="${parlamentar.fotomin}" alt="">
            <div>
                <p>${parlamentar.nomeurna}</p>
            </div>
                </div>
        </a>`
        }
    })

}

const todosParlamentaresOn = async () => {
    const response = await fetch('./parlamentares');
    const data = await response.json();

    const classificacaoParlamentares = document.querySelector('#classificacaoParlamentares')

    data.map((parlamentar, index) => {
        if(parlamentar.nomeacao == 1){
            classificacaoParlamentares.innerHTML +=`
            <a href="#inicio">
                <div onclick="carregaParlamentar(${index})" class="presidenteDacamara">
                                    <div class="fotoPresident">
                                        <img id="fotoPresidente" src="${parlamentar.fotomin}"
                                            alt="">
                                    </div>
                                    <div>
                                        <h2>${parlamentar.nome}</h2>
                                        <p>${parlamentar.posicao}</p>
                                    </div>
                                </div>
            </a>`
        }

        if(parlamentar.nomeacao == 2){
            classificacaoParlamentares.innerHTML +=`
            <a href="#inicio">
            <div onclick="carregaParlamentar(${index})" class="presidenteDacamara">
                                <div class="fotoPresident">
                                    <img id="fotoPresidente" src="${parlamentar.fotomin}"
                                        alt="">
                                </div>
                                <div>
                                    <h2>${parlamentar.nome}</h2>
                                    <p>${parlamentar.posicao}</p>
                                </div>
                            </div>
        </a>`
        }
        if(parlamentar.nomeacao == 3){
            classificacaoParlamentares.innerHTML +=`
            <a href="#inicio">
            <div onclick="carregaParlamentar(${index})" class="presidenteDacamara">
                                <div class="fotoPresident">
                                    <img id="fotoPresidente" src="${parlamentar.fotomin}"
                                        alt="">
                                </div>
                                <div>
                                    <h2>${parlamentar.nome}</h2>
                                    <p>${parlamentar.posicao}</p>
                                </div>
                            </div>
        </a>`
        }
        if(parlamentar.nomeacao == 4){
            classificacaoParlamentares.innerHTML +=`
            <a href="#inicio">
            <div onclick="carregaParlamentar(${index})" class="presidenteDacamara">
                                <div class="fotoPresident">
                                    <img id="fotoPresidente" src="${parlamentar.fotomin}"
                                        alt="">
                                </div>
                                <div>
                                    <h2>${parlamentar.nome}</h2>
                                    <p>${parlamentar.posicao}</p>
                                </div>
                            </div>
        </a>`
        }
        
       
       
    })
}

todosVereadoresOn()
todosParlamentaresOn()