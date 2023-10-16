console.log(window.location.pathname)


//const fotoVereador = document.querySelector('#fotoVereador')

function mostraImagemGrande() {
    const fotoVereador = document.querySelector('.fotoVereador img').src
    const bod = document.querySelector('.hereV')
    const divImg = document.createElement('div')
    divImg.classList.add('mostraFotosVere')
    divImg.innerHTML = `<img src="${fotoVereador}" alt="">`
    bod.appendChild(divImg)
    

    bod.addEventListener('click', () => {
        divImg.remove()
    })
}




async function carregaParlamentar(numb) {
    const ftvere = document.querySelector('#ftvere')
    ftvere.classList.remove('fotoVereador')
    const response = await fetch('./parlamentares')
    const data = await response.json()
    const nomeVeradorCima = document.querySelector('.esquerdoLateral div p')
    nomeVeradorCima.innerHTML = data[numb].posicao.toUpperCase() + " " + data[numb].nome

    const nomeVereadorImagem = document.querySelector('.imgFundoLagoa h2')
    nomeVereadorImagem.innerHTML = data[numb].nome.toUpperCase()

    const cargo = document.querySelector('.imgFundoLagoa h3')
    cargo.innerHTML = data[numb].posicao.toUpperCase()

    fotoVereador.src = data[numb].foto  
    
    ftvere.classList.add('fotoVereador')
    

    const infoNoLegislativo = document.querySelector('#infoNoLegislativo')
    const projetosPoliticos = document.querySelector('#projetosPoliticos')
    infoNoLegislativo.innerHTML = ''
    projetosPoliticos.innerHTML = ''
    historiaRepresentante.textContent = `HISTÓRIA DE ${data[numb].nome.toUpperCase()} `
    
    

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

    if(data[numb].genero != 'f'){
        var conhecido = 'conhecido'
    } else {
        var conhecido = 'conhecida'
    }
    
   
    const idade = calcularIdade(data[numb].nascimento) 
    

    dadosDoVereador.innerHTML = `<strong>${data[numb].nome}</strong> ${conhecido} como <strong>${data[numb].nomeurna}</strong>, tem ${idade} anos, ${data[numb].posicao} de Lagoa dos Patos - MG. Sua história começa ...`
    
}

function calcularIdade(aniversario) {
    var nascimento = aniversario.split("/");
    var dataNascimento = new Date(parseInt(nascimento[2], 10),
                  parseInt(nascimento[1], 10) - 1,
                  parseInt(nascimento[0], 10));

    var diferenca = Date.now() -  dataNascimento.getTime();
    var idade = new Date(diferenca); // miliseconds from epoch
    return Math.abs(idade.getUTCFullYear() - 1970);
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


function geraRepre() {
    const numeroA = Math.floor(Math.random()*11)
    console.log(numeroA)

    carregaParlamentar(numeroA)
}
geraRepre()


async function geraTamb() {
    const response = await fetch('./parlamentares');
    const data = await response.json();
    const repre = document.querySelector('.repre')

    data.map((foto) => {
        repre.innerHTML += `<img src="${foto.foto}" alt="">`
    })
    
    
}

geraTamb()
