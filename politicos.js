const url = ('/lagopatenses')

var items = [
    { name: 'xdward', value: 21 },
    { name: 'pharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'bagnetic', value: 0 },
    { name: 'Zeros', value: 37 }
];


items.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
})

async function mostrarPoliticos() {
    const response = await fetch(url);
    const data = await response.json()
    const lista = document.querySelector('#listaPopulacao')


    data.sort((a, b) => {
        if (a.nomeCompleto < b.nomeCompleto) return -1;
        if (a.nomeCompleto > b.nomeCompleto) return 1;
        return 0;
    })






    data.map((politico) => {
        const imgMin = (politico.imagemCapa).replace(/-max/g, '');

        const linkP = document.createElement('a');
        linkP.setAttribute('href', `/populacao/${politico.nome}`);
        const mostraP = document.createElement('div');
        mostraP.setAttribute('class', 'mostraP');
        const imgCapa = document.createElement('img');
        imgCapa.setAttribute('src', `${imgMin}`);
        imgCapa.setAttribute('alt', `${politico.nomeCompleto}`);
        const linkInterno = document.createElement('a');
        linkInterno.setAttribute('href', `/populacao/${politico.nome}/`);
        linkInterno.setAttribute('target', '_blank');
        const liNome = document.createElement('li');
        liNome.innerHTML = `${politico.nomeCompleto} <br><span> ${politico.apelido}</span>`;

        linkInterno.appendChild(liNome);
        mostraP.appendChild(imgCapa);
        mostraP.appendChild(linkInterno)
        linkP.appendChild(mostraP)

        lista.appendChild(linkP)



    })


}
mostrarPoliticos()

function emOrdem(nomeOne, nometwo) {

}
const urlEditais = '/editais-lagoa-dos-patos-mg'
async function mostraEdit() {
    const fecharEdi = document.querySelector('.fecharEdi')

    const responde = await fetch(urlEditais)
    const data = await responde.json()

    const cLoadin = document.getElementById(`loadi`)
    cLoadin.remove()


    function toDate(dad) {
        const verifica = dad.dataP;
        if (verifica != 'undefinedundefined/undefinedundefined/undefinedundefinedundefinedundefined') {
            const vai = dad.dataP

            const parts = dad.dataP.split("/");
            const dataFor = new Date(parts[2], parts[1] - 1, parts[0]);

            return dataFor;

        }

    }
    function ordemCrescente(a, b) {
        return toDate(b) - toDate(a);
    }


    data.sort(toDate)
    data.sort(ordemCrescente);


    data.map((infoE, index) => {
        const todosEditais = document.querySelector('.todosEditais')
        const cSituacao = infoE.situacao.replace(/Situação :/g, '').replace(/[^A-Z]/g, '')



        if (cSituacao == "A") {
            var classCor = 'fundoAberto'
            var sit = 'Aberta'
        } else if (cSituacao == "D") {
            var classCor = 'fundoFechado'
            var sit = 'Deserta'
        } else if (cSituacao == "R") {
            var classCor = 'fundoFechado'
            var sit = 'Revogada'

        } else if (cSituacao == "E") {
            var classCor = 'fundoAndamento'
            var sit = 'Em Andamento'

        } else if (cSituacao == "F") {
            var classCor = 'fundoFechado'
            var sit = 'Fechada'


        } else if (cSituacao == "FINALIZADA") {
            var classCor = 'fundoFinalizada'
            var sit = 'Finalizada'

        } else {
            var classCor = 'fundoSuspensa'
            var sit = 'Suspensa'


        }


        todosEditais.innerHTML += `<li>
    <fieldset>
        <div class="infoEdi">
            <p>${infoE.processo}</p>
        </div>
        <div class="situacaoEd ${classCor}">
            <p>Situação: <strong>${sit}</strong></p>
            <p>até: ${infoE.dataP}</p>
        </div>
        <fieldset class="fundoField" id="showLumi${index}">
            <legend>Objeto</legend>
            <button onclick="mostraObjeto(${index})" >Ver Objeto <i class="bi bi-arrow-down-circle-fill"></i></button>
            <div class="ocultarObjeto" id="objetoVer${index}">
                <p id="infodaLicita${index}"></p>                                                      
            </div>
            
        </fieldset>
        <a href="${infoE.urlS}" target="_blank"><button>Veja este edital</button></a>
    </fieldset>
</li>`






    })

    fecharEdi.innerHTML = ` <button onclick="fechareditaisON()" id="btnFechaEd" >Fechar Editais</button>
    <div>
        <div id="carregaCursos" style="display:none;">
            <img src="./cursos/processando.gif" alt=""> Fechando, Aguarde...
                
        </div>
    </div>`

}
async function descObjeto(numb) {
    const infodaLicita = document.querySelector(`#infodaLicita${numb}`)

    const responde = await fetch(urlEditais)
    const data = await responde.json()

    function toDate(dad) {
        const verifica = dad.dataP;
        if (verifica != 'undefinedundefined/undefinedundefined/undefinedundefinedundefinedundefined') {
            const vai = dad.dataP

            const parts = dad.dataP.split("/");
            const dataFor = new Date(parts[2], parts[1] - 1, parts[0]);

            return dataFor;

        }

    }

    function ordemCrescente(a, b) {
        return toDate(b) - toDate(a);
    }


    data.sort(toDate)
    data.sort(ordemCrescente);


    infodaLicita.innerHTML = `${data[numb].infolicita}`



}


//mostraEdit()
function mostraObjeto(numero) {
    const ocultarObjeto = document.getElementById(`objetoVer${numero}`)
    ocultarObjeto.classList.toggle('ocultarObjeto')
    const objetosLumiar = document.getElementById(`showLumi${numero}`)
    objetosLumiar.classList.toggle('coloriFielAtencao')

    descObjeto(numero)

    //coloriFielAtencao


}

function carregaEdita() {
    const ocultarObjeto = document.getElementById(`loadi`)
    const cli = document.getElementById(`cliq`)

    ocultarObjeto.classList.toggle('ocultarObjeto')
    btnCar.remove()

    cli.remove()
    mostraEdit()


}

function fecharSempre() {

    const parabensLagoa = document.getElementsByClassName('parabensLagoa')
    const fechaNiver = document.querySelector('.parabensLagoa')
    fechaNiver.classList.toggle('dblockLagoa')

    localStorage.setItem('niverLagoa', 'e')

}
if (localStorage.getItem('niverLagoa') == null) {
    const fechaNiver = document.querySelector('.parabensLagoa')
    fechaNiver.classList.add('dblockLagoa')
}

function verBannerA() {
    const fechaNiver = document.querySelector('.parabensLagoa')
    fechaNiver.classList.add('dblockLagoa')

}

const urlCursos = "/cursos/cursos-online";

async function cursonOnlineSebra() {
    const maisCursos = document.querySelector('#maisCursos')
    const response = await fetch(urlCursos)
    
    const data = await response.json();

   
    
    const numerodoCurso = Math.floor(Math.random(11) * 260)

   

    for(let i = numerodoCurso; i > numerodoCurso - 5; i--){

        const numeroAle = Math.floor(Math.random(0) * 4)
    if(numeroAle == 1){
        var corLater = "bordaCursoOnlineGreen"
    } else  if(numeroAle == 2){
        var corLater = "bordaCursoOnlineRed"
    } else  if(numeroAle == 3){
        var corLater = "bordaCursoOnlineBlue"
    } else {
        var corLater = "bordaCursoOnlinePurpe"
    }
       
        const urlImagem = `https://www.sebrae.com.br${data[i].imagem.split('\"')[0]}`

       

        maisCursos.innerHTML += `
        <div style="background-image: url(${urlImagem}); background-size: cover;" class="cardCurso ${corLater}">               
                <div class="infodoCurso">
                    <div >
                        <p>${data[i].categoria}</p>
                        <a class="classeA" href="${data[i].link}" target="_blank">
                            <h3 class="tituloCu">${data[i].curso}</h3>
                        </a>
                        <div>
                            <div>
                                <i class="bi bi-alarm"> Duração: ${data[i].duracao}</i><br>
                                <i class="bi bi-calendar3"> Conclusão: ${data[i].conclusao}</i>
                            </div>
                        </div>
                    </div>
                    <a href="${data[i].link}" target="_blank">
                    <button>Saiba Mais</button>
                    </a>
                </div>
        
        </div>`
    }


    // data.map((curso) => {
       

    // })


   
}

cursonOnlineSebra()


function fechareditaisON() {
    const fecharEdi = document.querySelector('.fecharEdi')
    const escondEditais = document.querySelector('.todosEditais');
    const carregaCursos = document.querySelector('#carregaCursos')
    carregaCursos.style.display = 'block'



    escondEditais.innerHTML = ` <div class="todosEditais">
    <div id="btnCar">
        <button onclick="carregaEdita()">CARREGAR EDITAIS</button>
    </div>
    <div id="loadi" class="ocultarObjeto">
        <div class="loadingio-spinner-spinner-srb2q25os49">
            <div class="ldio-viwp6dlcf3">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <style type="text/css">
            @keyframes ldio-viwp6dlcf3 {
                0% {
                    opacity: 1
                }

                100% {
                    opacity: 0
                }
            }

            .ldio-viwp6dlcf3 div {
                left: 94px;
                top: 48px;
                position: absolute;

                animation: ldio-viwp6dlcf3 linear 1s infinite;
                background: #f68438;
                width: 12px;
                height: 24px;
                border-radius: 6px / 12px;
                transform-origin: 6px 52px;
            }

            .ldio-viwp6dlcf3 div:nth-child(1) {
                transform: rotate(0deg);
                animation-delay: -0.9166666666666666s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(2) {
                transform: rotate(30deg);
                animation-delay: -0.8333333333333334s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(3) {
                transform: rotate(60deg);
                animation-delay: -0.75s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(4) {
                transform: rotate(90deg);
                animation-delay: -0.6666666666666666s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(5) {
                transform: rotate(120deg);
                animation-delay: -0.5833333333333334s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(6) {
                transform: rotate(150deg);
                animation-delay: -0.5s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(7) {
                transform: rotate(180deg);
                animation-delay: -0.4166666666666667s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(8) {
                transform: rotate(210deg);
                animation-delay: -0.3333333333333333s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(9) {
                transform: rotate(240deg);
                animation-delay: -0.25s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(10) {
                transform: rotate(270deg);
                animation-delay: -0.16666666666666666s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(11) {
                transform: rotate(300deg);
                animation-delay: -0.08333333333333333s;
                background: #f68438;
            }

            .ldio-viwp6dlcf3 div:nth-child(12) {
                transform: rotate(330deg);
                animation-delay: 0s;
                background: #f68438;
            }

            .loadingio-spinner-spinner-srb2q25os49 {
                width: 200px;
                height: 200px;
                display: inline-block;
                overflow: hidden;
                background: #ffffff00;
            }

            .ldio-viwp6dlcf3 {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                position: relative;
                transform: translateZ(0) scale(1);
                backface-visibility: hidden;
                transform-origin: 0 0;
                /* see note above */
            }

            .ldio-viwp6dlcf3 div {
                box-sizing: content-box;
            }

            /* generated by https://loading.io/ */
        </style> <br>
        CARREGANDO EDITAIS...
    </div>

</div>

<div id="cliq">
    <i class="bi bi-arrow-up-circle-fill"></i>
    <p>Clique no botão acima para carregar ou pesquisar um edital em Lagoa dos Patos
        MG - Digite na barre de busca acima:</p>
    <p>Em breve iremos adicionar vários editais, fique ligado!!</p>
    <button onclick="verBannerA()">Ver Banner do Aniversário de Lagoa </button>
</div>`

carregaCursos.style.display = 'none'
fecharEdi.innerHTML = ``
}