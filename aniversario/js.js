


async function carregaParlamentar(numb) {
    const response = await fetch('./aniversariantes')
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
    historiaRepresentante.textContent = `HISTÓRIA DE ${data[numb].nome.toUpperCase()} `



    for (let i = 0; i < data[numb].legislativo.length; i++) {
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

    if (data[numb].genero != 'f') {
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

    var diferenca = Date.now() - dataNascimento.getTime();
    var idade = new Date(diferenca); // miliseconds from epoch
    return Math.abs(idade.getUTCFullYear() - 1970);
}


//carregaParlamentar(0)


const todosVereadoresOn = async () => {
    const response = await fetch('./aniversariantes');
    const data = await response.json();

    const todosVereadoresOn = document.querySelector('#todosVereadoresOn')

    data.map((parlamentar, index) => {
        if (parlamentar.posicao == 'vereador' || parlamentar.posicao == 'vereadora') {
            todosVereadoresOn.innerHTML += `<a href="#inicio">
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
var homens = 0;
var mulheres = 0;

var ate20Anos = 0;
var ate30Anos = 0;
var ate40Anos = 0;
var ate50Anos = 0;
var ate60Anos = 0;
var ate70Anos = 0;
var ate100Anos = 0;

const todosParlamentaresOn = async () => {
    const response = await fetch('./aniversariantes');
    const data = await response.json();

    const aniversarioHoje = document.querySelector('#aniversarioHoje')
    const classificacaoParlamentares = document.querySelector('#classificacaoParlamentares')



    const dataH = document.querySelector('#dataH')

    dataH.innerHTML = ` <h3>ANIVERSÁRIO HOJE <span >${dataHoje()[5]}</span></h3>`;


    data.map((aniversario, index) => {
        const idade = calcularIdade(aniversario.nascimento)
        const idadeAdmissao = calcularIdade(aniversario.admissao)

        const dataMEs = `${aniversario.nascimento[0]}${aniversario.nascimento[1]}/${aniversario.nascimento[3]}${aniversario.nascimento[4]}`

        const mesNiverTrabalho = `${aniversario.admissao[0]}${aniversario.admissao[1]}/${aniversario.admissao[3]}${aniversario.admissao[4]}`

        const desseMes = `${aniversario.nascimento[3]}${aniversario.nascimento[4]}`

        if (aniversario.genero != 'm') {
            var sexo = './img/niver-m.png'
        } else {
            var sexo = './img/niver-h.jpg'
        }


        if (dataMEs == dataHoje()[2]) {
            aniversarioHoje.innerHTML += `
             <div class="imgFundoLagoa">
                                <div class="fotoVereador">
                                    <img id="fotoVereador${index}" src=${sexo} alt="">
                                </div>
                                <h2>${aniversario.nome}</h2>
                                <h3>${aniversario.nascimento}</h3>
                                <h3>${idade} anos</h3>
                            </div>`

           
        } 
        const niverS = aniversario.nascimento.split('/')

        if (desseMes == parseInt(dataHoje()[3]) + 1) {
            classificacaoParlamentares.innerHTML += `
            <a href="#inicio">
            <div onclick="carregaParlamentar(${index})" class="presidenteDacamara">
                                <div class="fotoPresident">
                                    <img id="fotoPresidente" src=${sexo}
                                        alt="">
                                </div>
                                <div>
                                    <h2>${aniversario.nome}</h2>
                                    <p>${niverS[0]}/${niverS[1]}</p>
                                </div>
                            </div>
        </a>`
        }
        if (desseMes == parseInt(dataHoje()[3])) {
            projetosPoliticos.innerHTML += `
            <a href="#inicio">
            <div onclick="carregaParlamentar(${index})" class="presidenteDacamara">
                                <div class="fotoPresident">
                                    <img id="fotoPresidente" src=${sexo}
                                        alt="">
                                </div>
                                <div>
                                    <h2>${aniversario.nome}</h2>
                                    <p>${niverS[0]}/${niverS[1]}</p>
                                </div>
                            </div>
        </a>`
        }
        

        if (mesNiverTrabalho == dataHoje()[4]) {                                       
            aniversarioT.innerHTML = `<div class="imgFundoTrabalho">                           
                            <h2>${aniversario.nome}</h2>                           
                            <h3><strong>${idadeAdmissao}</strong> anos fazendo seu melhor!!</h3>
                            <h3>PARABÉNS POR MAIS UM ANO COLABORANDO</h3>
                        </div>`
        }
        if (aniversario.genero == 'm') {
            homens = homens + 1
        } else {
            mulheres = mulheres + 1
        }
        console.log(idade + " " + aniversario.nome)
        if(idade < 20) {
            ate20Anos = ate20Anos + 1;
            // if(idade != undefined) {
            //     ate20Anos = ate20Anos + 1;
            // }
            // else {
            //     ate20Anos = "Não possui";
            // }
            
        } else if(idade > 20 && idade < 30) {
            ate30Anos = ate30Anos + 1;          
            
        } else if(idade > 30 && idade < 40) {
            ate40Anos = ate40Anos + 1;
        } else if(idade > 40 && idade < 50) {
            ate50Anos = ate50Anos + 1;
        } else if(idade > 50 && idade < 60) {
            ate60Anos = ate60Anos + 1;
        } else if(idade > 60 && idade < 70) {
            ate70Anos = ate70Anos + 1;
        } else {
            ate100Anos = ate100Anos + 1;
        }
       

        infoNoLegislativo.innerHTML = `
        ${homens}: Servidores </br> 
        ${mulheres}: Servidoras </br> 
        * Em Atualização <br>
        >>Informações Interessantes: <br>
        ::Até 20 anos: <strong>${ate20Anos}</strong> <br>
        ::Até de 20 a 30 anos: <strong>${ate30Anos}</strong><br>
        ::Até de 31 a 40 anos: <strong>${ate40Anos}</strong><br>
        ::Até de 41 a 50 anos: <strong>${ate50Anos}</strong><br>
        ::Até de 51 a 60 anos: <strong>${ate60Anos}</strong><br>
        ::Até de 61 a 70 anos: <strong>${ate70Anos}</strong><br>
        ::Pessoas com mais de 70 anos: *Atualizando...<br>


        `

    })
}

function dataHoje() {
    const data = new Date();
    var dia = data.getDay()
    var mes = data.getMonth();
    var ano = data.getFullYear()

    if (dia.toString().length == 1) {
        var diaaDia = '0' + dia
    } else {
        var diaaDia = dia
    }

    if (mes.toString().length == 1) {
        var mesames = '0' + mes
    } else {
        var mesames = mes
    }
    if (mes.toString().length == 1) {
        var mesAd = '0' + parseInt(mes +1);
    } else {
        var mesAd = parseInt(mes +1 ) ;
    }
    const anoNormal = `${diaaDia}/${mesames}/${ano}`
    const anoS = `${dia}/${mes}/${ano}`
    const comparaMes = `${diaaDia}/${mesames}`
    const desseMes = `${mesames}`
    const anoAdmissao = `${diaaDia}/${mesAd}`
    const dataHojeJ = `${diaaDia}/${mesAd}/${ano}`

    return [anoNormal, anoS, comparaMes, desseMes, anoAdmissao, dataHojeJ]
}


//todosVereadoresOn()
todosParlamentaresOn()


function geraRepre() {
    const numeroA = Math.floor(Math.random() * 11)


    carregaParlamentar(numeroA)
}
//geraRepre()


async function geraTamb() {
    const response = await fetch('./aniversariantes');
    const data = await response.json();
    const repre = document.querySelector('.repre')

    data.map((foto) => {
        repre.innerHTML += `<img src="${foto.foto}" alt="">`
    })


}

//geraTamb()