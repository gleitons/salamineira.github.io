var infoVisivel = document.querySelector('#infoVisivel')
var iconesNav = document.getElementsByClassName('iconesNav')[0]
var linkSelect = iconesNav.getElementsByTagName('a')
console.log("s")
var urlEmpresas = '/empresas'


async function padariaEmpresas() {
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona()
    linkSelect[2].classList.add('addSeleciona')
    fechaEmpresaL()
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {

            if (empresaL.id[i] == "padaria") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Padarias'
}

async function lanchoneteEmpresas() {
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona()
    linkSelect[7].classList.add('addSeleciona')
    fechaEmpresaL()
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {

            if (empresaL.id[i] == "lanchonete") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Bares e Lanchonetes'
}
async function barEmpresas() {
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona()
    linkSelect[6].classList.add('addSeleciona')
    fechaEmpresaL()
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {

            if (empresaL.id[i] == "bar") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> ${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Bares'
}

async function combustivel() {
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona()
    linkSelect[4].classList.add('addSeleciona')
    fechaEmpresaL()
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {

            if (empresaL.id[i] == "combustivel") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> ${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Posto de Combustível'
}

async function empresaGas() {
    fechaEmpresaL()
    infoId.innerHTML = 'Carregando..'
    apagaSeleciona()
    linkSelect[10].classList.add('addSeleciona')
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {

            if (empresaL.id[i] == "gas") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                </div>`
            }
        }


    })
    infoId.innerHTML = 'Empresas de gás'

}
async function empresasTaxi() {
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona()
    linkSelect[8].classList.add('addSeleciona')
    fechaEmpresaL()
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {
            if (empresaL.id[i] == "taxi") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Táxis'
}


async function empresaPublicas() {
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona()
    linkSelect[12].classList.add('addSeleciona')
    fechaEmpresaL()
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {
            if (empresaL.id[i] == "publica") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Empresa Pública'
}
async function farmacia() {
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona()
    linkSelect[3].classList.add('addSeleciona')
    fechaEmpresaL()
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {

        for (let i = 0; i < empresaL.id.length; i++) {

            if (empresaL.id[i] == "farmacia") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> ${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Farmácias'
}
async function mercado() {
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona()
    fechaEmpresaL()
    linkSelect[1].classList.add('addSeleciona')

    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {

        for (let i = 0; i < empresaL.id.length; i++) {

            if (empresaL.id[i] == "mercado") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> ${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>
                </div>`
            }
        }


    })
    infoId.innerHTML = 'Mercados'

}

async function gasEmpresas() {
    fechaEmpresaL()
    infoId.innerHTML = 'Carregando..'
    apagaSeleciona()
    linkSelect[12].classList.add('addSeleciona')
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {
            if (empresaL.id[i] == "gas") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Gás';
}

async function internetEmpresas() {
    fechaEmpresaL()
    infoId.innerHTML = 'Carregando..'
    apagaSeleciona()
    linkSelect[9].classList.add('addSeleciona')
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {
            if (empresaL.id[i] == "internet") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Provedores';
}

async function animalEmpresas() {
    fechaEmpresaL()
    infoId.innerHTML = 'Carregando..'
    apagaSeleciona()
    linkSelect[11].classList.add('addSeleciona')
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {
            if (empresaL.id[i] == "animal" || empresaL.id[i] == "racao") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Ração e Beleza Animal';
}
async function restaurante() {
    fechaEmpresaL()
    infoId.innerHTML = 'Carregando..'
    apagaSeleciona()
    linkSelect[0].classList.add('addSeleciona')
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        for (let i = 0; i < empresaL.id.length; i++) {
            if (empresaL.id[i] == "restaurante") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                </div>`
            }
        }
    })
    infoId.innerHTML = 'Restaurantes';
}


async function empresas() {
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona();
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        infoVisivel.innerHTML += `
        <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
            <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
        </div>`
        // console.log(empresaL.id.length)
        // for(let i = 0; i < empresaL.id.length; i++ ) {
        //  
        //     if(empresaL.id[i] == "farmacia") {

        //     }
        // }


    })
    infoId.innerHTML = 'Empresas'

}
async function localizaEmpresas() {
    infoId.innerHTML = 'Buscando...'
    apagaSeleciona();
    fechaEmpresaL();
    infoVisivel.innerHTML = ''

    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        var nomeChave = []

        for (let i = 0; i < empresaL.id.length; i++) {

            nomeChave.push(empresaL.id[i])
        }

        infoVisivel.innerHTML += `
        <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
            <h6>Clique para ver</h6>
            <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${nomeChave} </li>
        </div>`


    })

}

async function maisEmpresas() {
    apagaSeleciona()
    linkSelect[13].classList.add('addSeleciona')
    infoId.innerHTML = 'Carregando...'
    fechaEmpresaL()
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        var nomeChave = []

        for (let i = 0; i < empresaL.id.length; i++) {

            nomeChave.push(empresaL.id[i] + " ")
        }

        if (empresaL.atividadePrincipal != "empresaL.atividadePrincipal") {
            infoVisivel.innerHTML += `
        <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
            <h6>Clique para ver</h6>
            <li><span>${empresaL.atividadePrincipal}</span> </li>
        </div>`
        }


    })
    infoId.innerHTML = 'Todas atividades'

}




function inicioApp() {
    apagaSeleciona()
    infoId.innerHTML = 'Home'
    infoVisivel.innerHTML = ` <!-- <h3>MODELO DE APP EMPRESA LAGOA DOS PATOS MG</h3>
    <div id="inicio">
        <img src="./imgguia/brasao-lagoa.jpg" alt="">
    </div>
    <h4>brasão de Lagoa dos Patos MG - Fonte: Wikipédia</h4>-->`
}
function apagaSeleciona() {
    for (let i = 0; i < linkSelect.length; i++) {
        linkSelect[i].classList.remove('addSeleciona')
    }

    //infoId.innerHTML = 'Mercados'
}

function fechaEmpresaL() {
    const mostraEmpresa = document.querySelector('#mostraEmpresa');
    const item = document.querySelector('.fundoEmpresaLocal');
item.addEventListener('animationend', () => {
  item.classList.remove('empresaLocal');
});

   // apagaSeleciona()
    mostraEmpresa.innerHTML = ''
}

const item = document.querySelector('.item');
item.addEventListener('animationend', () => {
  item.classList.remove('animar');
});




async function verEmpresaShow(numero) {

    const response = await fetch(urlEmpresas);
    const data = await response.json();
    const ligarCelular = "+55" + data[numero].telefone.replace(' ', '9').replace('-', '')
    const mostraCelular = data[numero].telefone.replace(' ', ' 9')
    const whatsAppTel = "+55" + data[numero].telefone.replace(' ', '').replace('-', '')
    const linkOpe = `https://www.google.com/maps/place/${data[numero].endereco.replace(/ /g, '+')},${data[numero].numero.replace(/ /g, '+')},+Lagoa+dos+Patos+-+MG,+39360-000`
    const linkTemp = `https://www.google.com/maps/place/R.+Sete+de+Setembro,+32,+Lagoa+dos+Patos+-+MG,+39360-000`

    if (data[numero].mapa != undefined) {
        var mapaS = data[numero].mapa.split('|')[0]
        var linkIr = data[numero].mapa.split('|')[1]
    } else {
        var mapaS = `<iframe src='https://www.google.com/maps/embed?pb=Rua sete de setembro 185 39360-000!5e0!3m2!1spt-BR!2sbr!4v1680905641529!5m2!1spt-BR!2sbr' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>`
        var linkIr = linkOpe
    }

    if (data[numero].imagensEmpresa != undefined) {
        var imagensEmpresa = data[numero].imagensEmpresa
    
    var fotosEmpresaG = [];

    for (let i = 0; i < imagensEmpresa.length; i++) {              
        const imageE = `<img src="${imagensEmpresa[i]}" alt="">`
        fotosEmpresaG.push(imageE)

    }
    var imagensdaEmp = JSON.stringify(fotosEmpresaG).replace(/\["/g, '').replace(/\\"/g,'\"').replace(/\",\"/g, ' ').replace(/\"\]/g, "Futuro Consultoria")
    //const imagensdaEmp = ``
    } else {
        var imagensdaEmp = `Sem Fotos no momento`
    }
    const mostraEmpresa = document.querySelector('#mostraEmpresa');
    mostraEmpresa.innerHTML = ` <div class="fundoEmpresaLocal" >
    <div class="empresaLocal ">
        <div class="apresentaEndereco">
        <h2>${data[numero].razaoSocial}</h2>
            <h2>${data[numero].nomeFantasia}</h2>
            <h3>${data[numero].cnpjN}</h3>
        </div>
        <div>
            <div class="contatoEmpresa">
                <a href="tel:${data[numero].telefone.replace(/ /g, '').replace(/-/g, '')}">
                <img src="./imgguia/whatsapp.png" alt="">

                    <h4>${data[numero].telefone}</h4>
                </a>

            </div>
            <div class="contatoEmpresa">
                <a href="tel:${ligarCelular}">
                <img src="./imgguia/telefone-velho.png" alt="">

                    <h4>${mostraCelular}</h4>
                </a>

            </div>
        </div>
        <div class="btnAcessar">
        <a href="${linkOpe.toLowerCase()}" target="_blank"><button>Mostrar Rota</button></a>
    </div>
        <div class="enderecoEmp">
            <h3>Endereço:</h3> ${data[numero].endereco}, ${data[numero].numero}, ${data[numero].bairro} - ${data[numero].cidade} ${data[numero].estado}
        </div>
        <div class="mapaLocalizacao">

        ${mapaS}
        <h5>Estamos atualizando todos os endereços</h5>


        </div>
       
        <div>
            <h3>Fotos:</h3>
            <div class="fotosEmpresas">
            ${imagensdaEmp}
               
            </div>
        </div>

    </div>
    <div class="fecharDivEndereco">
        <img onclick="fechaEmpresaL()" src="./imgguia/cross.png" alt="">
    </div>
</div>`


}
//verEmpresaShow(0)
function buscaEmpresa() {
    const mostraSer = document.querySelector('#infoVisivel');

    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('btnEmpresa');



    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input) || input.length <= 0) {
            x[i].style.display = "none";
            //mostraSer.style.display = "none"

        }
        else {
            x[i].style.display = "list-item";
            mostraSer.style.display = "block"
        }
    }
}

function fotosLagoa() {
    infoVisivel.innerHTML = ''
    const mostraI = document.querySelector('#infoVisivel')

    console.log(mostraI)

    const imagensOne = ['Barragem cheia Lagoa dos Patos - MG. -27_03_2012_120.jpg', 'Barragem cheia Lagoa dos Patos - MG. -27032012.jpg', 'Barragem-lagoa-dos-patos-mg-27032012121.jpg', 'coletanea-FOTOS-de-lagoa-dos-patos-MG-Sala-mineira.jpg', 'HDR-Lagoa-dos-patos-mg-barragem.png', 'Lagoa-dos-patos-mg-barragem-cheia-27_03_2012122.jpg', 'Tim, Rodrigo, Edson, Cassio, Valdo - mortal Kombat(9).jpg']

    for (let i = 0; i < imagensOne.length; i++) {
        mostraI.innerHTML += `<div class="tamanhosImg">
        <div class="Sirv" data-effect="zoom">
            <img data-src="https://rogresph.sirv.com/sala-mineira/fotos/${imagensOne[i]}">
        </div>
    </div>`
    }
    infoId.innerHTML = 'Fotos'
}
function apagaSeta() {

    document.querySelector('#rightT').classList.add('dnone')

}

function fechaGif() {
    const verSlide = document.querySelector('#verSlide')
    verSlide.classList.add('dnone')
}



