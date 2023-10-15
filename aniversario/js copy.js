function calcularIdade(aniversario) {
    var nascimento = aniversario.split("/");
    var dataNascimento = new Date(parseInt(nascimento[2], 10),
        parseInt(nascimento[1], 10) - 1,
        parseInt(nascimento[0], 10));

    var diferenca = Date.now() - dataNascimento.getTime();
    var idade = new Date(diferenca); // miliseconds from epoch
    return Math.abs(idade.getUTCFullYear() - 1970);
}



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

var ate20anosArray = []
var ate30anosArray = []
var ate40anosArray = []
var ate50anosArray = []
var ate60anosArray = []
var ate70anosArray = []
var ate80anosArray = []

var servidorVelho = []
var servidorNovo = []

async function carregaAntes() {
    const response = await fetch('./aniversariantes');
    const data = await response.json();

    const aniversarioHoje = document.querySelector('#aniversarioHoje')
    const classificacaoParlamentares = document.querySelector('#classificacaoParlamentares')

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    const dataH = document.querySelector('#dataH')

    dataH.innerHTML = ` <h3>ANIVERSÁRIO HOJE <span >${dataHoje()[5]}</span></h3>`;
    //const anoo = 
    mesDoNiver.innerHTML = ` <h4>${meses[parseInt(dataHoje()[3])]} de ${new Date().getFullYear()} </h4>`

    aniversarioHoje.innerHTML = ''
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


        if (dataMEs == dataHoje()[4]) {

            aniversarioHoje.innerHTML += `
             <div class="imgFundoLagoa">
                                <div class="fotoVereador">
                                    <img id="fotoVereador${index}" src=${sexo} alt="">
                                </div>
                                <h2>${aniversario.nome}</h2>
                                <h3>${aniversario.nascimento}</h3>
                                <h3>${idade} anos</h3>
                            </div>`

            ninguemFaz.innerHTML = ''

        }
    })
}
//carregaAntes();

const todosParlamentaresOn = async () => {
    const response = await fetch('./aniversariantes');
    const data = await response.json();

    const aniversarioHoje = document.querySelector('#aniversarioHoje')
    const classificacaoParlamentares = document.querySelector('#classificacaoParlamentares')

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    const dataH = document.querySelector('#dataH')

    dataH.innerHTML = ` <h3>ANIVERSÁRIO HOJE <span >${dataHoje()[5]}</span></h3>`;
    //const anoo = 
    mesDoNiver.innerHTML = ` <h4>${meses[parseInt(dataHoje()[3])]} de ${new Date().getFullYear()} </h4>`
    //aniversarioHoje.innerHTML = ''

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


        if (dataMEs == dataHoje()[4]) {

            aniversarioHoje.innerHTML += `
             <div class="imgFundoLagoa">
                                <div class="fotoVereador">
                                    <img id="fotoVereador${index}" src=${sexo} alt="">
                                </div>
                                <h2>${aniversario.nome}</h2>
                                <h3>${aniversario.nascimento}</h3>
                                <h3>${idade} anos</h3>
                               
                            </div>`

            ninguemFaz.innerHTML = ''

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
            aniversarioT.innerHTML += `<div class="imgFundoTrabalho">                           
                            <div class="vitro">
                                <h2>${aniversario.nome}</h2>
                                <h3><span class="inTime"><strong>${idadeAdmissao}</strong></span> anos <br> fazendo seu melhor!!</h3>
                                <h3>PARABÉNS POR MAIS UM ANO COLABORANDO</h3>
                                <h3>NESSES ${idadeAdmissao} ANOS ABENÇOADOS, SÓ TEMOS A TE AGRADECER</h3>                                
                            </div>
                        </div>`
        }
        if (aniversario.genero == 'm') {
            homens = homens + 1
        } else {
            mulheres = mulheres + 1
        }

        if (idade < 20) {
            ate20Anos = ate20Anos + 1;

            const nome20anos = `<p>${aniversario.nome} - ${idade} anos</p>`
            ate20anosArray.push(nome20anos)


        } else if (idade > 20 && idade <= 30) {
            ate30Anos = ate30Anos + 1;

            const nome30anos = `<p>${aniversario.nome} - ${idade} anos</p>`
            ate30anosArray.push(nome30anos)


        } else if (idade > 30 && idade <= 40) {
            ate40Anos = ate40Anos + 1;
            const nome40anos = `<p>${aniversario.nome} - ${idade} anos</p>`
            ate40anosArray.push(nome40anos)
        } else if (idade > 40 && idade <= 50) {
            ate50Anos = ate50Anos + 1;
            const nome50anos = `<p>${aniversario.nome} - ${idade} anos</p>`
            ate50anosArray.push(nome50anos)
        } else if (idade > 50 && idade <= 60) {
            ate60Anos = ate60Anos + 1;
            const nome60anos = `<p>${aniversario.nome} - ${idade} anos</p>`
            ate60anosArray.push(nome60anos)
        } else if (idade > 60 && idade <= 70) {
            ate70Anos = ate70Anos + 1;
            const nome70anos = `<p>${aniversario.nome} - ${idade} anos</p>`
            ate70anosArray.push(nome70anos)
        } else {
            ate100Anos = ate100Anos + 1;
            const nome80anos = `<p>${aniversario.nome} - ${idade} anos</p>`
            ate80anosArray.push(nome80anos)
        }

        const totServidores = parseInt(homens) + parseInt(mulheres)


        infoNoLegislativo.innerHTML = `
        ${homens}: Servidores </br> 
        ${mulheres}: Servidoras </br> 
        Total de ${totServidores} Servidores </br> 
        * Em Atualização <br>
        >>Informações Interessantes: <br>
        <br>
        <br>
        ::Até 20 anos: <strong>${ate20Anos}</strong> <button onclick="verServidores(0)" class="btnServidor" >Ver Servidores</button>
        <div class="idade dnone" id="btn20">
            <ul id="btnA20">
            </ul>
            <button onclick="verServidores(0)">Fechar</button>
        </div>
        <br>
        <br>
        ::Até de 20 a 30 anos: <strong>${ate30Anos}</strong> 
        <button onclick="verServidores(1)" class="btnServidor" >Ver Servidores</button>
        <div class="idade dnone" id="btn30">
            <ul id="btnA30">
            </ul>
            <button onclick="verServidores(1)">Fechar</button>
        </div>
        <br>
        <br>
        ::Até de 31 a 40 anos: <strong>${ate40Anos}</strong>
        <button onclick="verServidores(2)" class="btnServidor" >Ver Servidores</button>
        <div class="idade dnone" id="btn40">
            <ul id="btnA40">
            </ul>
            <button onclick="verServidores(2)">Fechar</button>
        </div>
        <br>
        <br>
        ::Até de 41 a 50 anos: <strong>${ate50Anos}</strong>
        <button onclick="verServidores(3)" class="btnServidor" >Ver Servidores</button>
        <div class="idade dnone" id="btn50">
            <ul id="btnA50">
            </ul>
            <button onclick="verServidores(3)">Fechar</button>
        </div>
        <br>
        <br>
        ::Até de 51 a 60 anos: <strong>${ate60Anos}</strong>
        <button onclick="verServidores(4)" class="btnServidor" >Ver Servidores</button>
        <div class="idade dnone" id="btn60">
            <ul id="btnA60">
            </ul>
            <button onclick="verServidores(4)">Fechar</button>
        </div>
        <br>
        <br>
        ::Até de 61 a 70 anos: <strong>${ate70Anos}</strong>
        <button onclick="verServidores(5)" class="btnServidor" >Ver Servidores</button>
        <div class="idade dnone" id="btn70">
            <ul id="btnA70">
            </ul>
            <button onclick="verServidores(5)">Fechar</button>
        </div>
        <br>
        <br>
        ::Pessoas com mais de 70 anos: <strong>${ate100Anos}</strong>,

        <button onclick="verServidores(6)" class="btnServidor" >Ver Servidores</button>
        <div class="idade dnone" id="btn80">
            <ul id="btnA80">
            </ul>
            <button onclick="verServidores(6)">Fechar</button>
        </div> <br><br> *Atualizando...<br>
        <br>`


        for (let i = 0; i < ate20anosArray.length; i++) {
            btnA20.innerHTML += ate20anosArray[i]
        }
        for (let i = 0; i < ate30anosArray.length; i++) {
            btnA30.innerHTML += ate30anosArray[i]
        }
        for (let i = 0; i < ate40anosArray.length; i++) {
            btnA40.innerHTML += ate40anosArray[i]
        }
        for (let i = 0; i < ate50anosArray.length; i++) {
            btnA50.innerHTML += ate50anosArray[i]
        }
        for (let i = 0; i < ate60anosArray.length; i++) {
            btnA60.innerHTML += ate60anosArray[i]
        }
        for (let i = 0; i < ate70anosArray.length; i++) {
            btnA70.innerHTML += ate70anosArray[i]
        }
        for (let i = 0; i < ate80anosArray.length; i++) {
            btnA80.innerHTML += ate80anosArray[i]
        }



    })

    setTimeout('removeLoad()', 5000)

}

function removeLoad() {
    carregandoL.remove();
   

}
//

function dataHoje() {
    const data = new Date();
    var dia = data.getDate()
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear()
    console.log(mes)

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
        var mesAd = '0' + parseInt(mes + 1);
    } else {
        var mesAd = parseInt(mes + 1);
    }
    const anoNormal = `${diaaDia}/${mesames}/${ano}`
    const anoS = `${dia}/${mes}/${ano}`
    const comparaMes = `${diaaDia}/${mesames}`
    const desseMes = `${mesames}`
    const anoAdmissao = `${diaaDia}/${mesAd}`
    const dataHojeJ = `${diaaDia}/${mesAd}/${ano}`

    return [anoNormal, anoS, comparaMes, desseMes, anoAdmissao, dataHojeJ]
}






function verServidores(numb) {
    var btnServidor20 = document.querySelector('#btn20')
    var btnServidor30 = document.querySelector('#btn30')
    var btnServidor40 = document.querySelector('#btn40')
    var btnServidor50 = document.querySelector('#btn50')
    var btnServidor60 = document.querySelector('#btn60')
    var btnServidor70 = document.querySelector('#btn70')
    var btnServidor80 = document.querySelector('#btn80')
    if (numb == 0) {
        btnServidor20.classList.toggle('dnone')
    } else if (numb == 1) {
        btnServidor30.classList.toggle('dnone')
    } else if (numb == 2) {
        btnServidor40.classList.toggle('dnone')
    } else if (numb == 3) {
        btnServidor50.classList.toggle('dnone')
    } else if (numb == 4) {
        btnServidor60.classList.toggle('dnone')
    } else if (numb == 5) {
        btnServidor70.classList.toggle('dnone')
    } else {
        btnServidor80.classList.toggle('dnone')
    }

}
todosParlamentaresOn();
