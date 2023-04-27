console.log(window.location.pathname)


//const fotoVereador = document.querySelector('#fotoVereador')


async function carregaParlamentar(numb) {
    const response = await fetch('./parlamentares')
    const data = await response.json()
    const nomeVeradorCima = document.querySelector('.esquerdoLateral div p')
    nomeVeradorCima.innerHTML = data[numb].posicao + " " + data[numb].nome

    const nomeVereadorImagem = document.querySelector('.imgFundoLagoa h2')
    nomeVereadorImagem.innerHTML = data[numb].nome.toUpperCase()

    const cargo = document.querySelector('.imgFundoLagoa h3')
    cargo.innerHTML = data[numb].posicao.toUpperCase()
    
    fotoVereador.src = data[numb].foto

    const infoNoLegislativo = document.querySelector('#infoNoLegislativo')
    const projetosPoliticos = document.querySelector('#projetosPoliticos')

    console.log(data[numb].legislativo[0])

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
            <p>Ementa: ${data[numb].projetos[index].informacoes}</p>
            <a href="#" target="_blank">
                <button>Saiba Mais</button>
            </a>
        </div>
    </div>`
        
    }

    

    dadosDoVereador.innerHTML = `${data[numb].historia}`




    
}

carregaParlamentar(0)