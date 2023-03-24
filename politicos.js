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

    const responde = await fetch(urlEditais)
    const data = await responde.json()

    //const ab = data.dataP.toString()    
    //console.log(data[0].dataP )

    const cLoadin = document.getElementById(`loadi`)
    cLoadin.remove()
    
    console.log(responde.lenght)



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




}
async function descObjeto(numb) {
    const infodaLicita = document.querySelector(`#infodaLicita${numb}`)
    
    const responde = await fetch(urlEditais)
    const data = await responde.json()

    //console.log(data[0].infolicita)

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
    fechaNiver.classList.toggle('disNone')

    localStorage.setItem('niverLagoa', 'e')
    
}
if(localStorage.getItem('niverLagoa') != null){
    const fechaNiver = document.querySelector('.parabensLagoa')
    fechaNiver.classList.toggle('disNone')
}