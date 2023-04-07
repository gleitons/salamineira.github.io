var infoVisivel = document.querySelector('#infoVisivel')
var urlEmpresas = '/empresas'

async function combustivel() {
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        console.log(empresaL.id.length)
        for(let i = 0; i < empresaL.id.length; i++ ) {
            console.log(empresaL.id[i])
            if(empresaL.id[i] == "combustivel") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> ${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>
                </div>`
            }
        }
        
       
    })

}
async function farmacia() {
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        console.log(empresaL.id.length)
        for(let i = 0; i < empresaL.id.length; i++ ) {
            console.log(empresaL.id[i])
            if(empresaL.id[i] == "farmacia") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> ${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>
                </div>`
            }
        }
        
       
    })

}
async function mercado() {
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        console.log(empresaL.id.length)
        for(let i = 0; i < empresaL.id.length; i++ ) {
            console.log(empresaL.id[i])
            if(empresaL.id[i] == "mercado") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> ${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>
                </div>`
            }
        }
        
       
    })

}
async function restaurante() {
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        console.log(empresaL.id.length)
        for(let i = 0; i < empresaL.id.length; i++ ) {
            console.log(empresaL.id[i])
            if(empresaL.id[i] == "restaurante") {
                infoVisivel.innerHTML += `
                <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> ${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>
                </div>`
            }
        }
        
       
    })

}
async function empresas() {
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
        //     console.log(empresaL.id[i])
        //     if(empresaL.id[i] == "farmacia") {
               
        //     }
        // }
        
       
    })

}
async function localizaEmpresas() {
    infoVisivel.innerHTML = ''
    
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        var nomeChave = []
        console.log(empresaL.id.length)
        for(let i = 0; i < empresaL.id.length; i++ ) {
            
            nomeChave.push(empresaL.id[i])
        }
        console.log(nomeChave)
        infoVisivel.innerHTML += `
        <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
            <h6>Clique para ver</h6>
            <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${nomeChave} </li>
        </div>`
        
       
    })

}

async function maisEmpresas() {
    infoVisivel.innerHTML = ''
    
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        var nomeChave = []
        console.log(empresaL.id.length)
        for(let i = 0; i < empresaL.id.length; i++ ) {
            
            nomeChave.push(empresaL.id[i] + " ")
        }
        console.log(nomeChave)
        if(empresaL.atividadePrincipal != "empresaL.atividadePrincipal") {
        infoVisivel.innerHTML += `
        <div class="btnEmpresa" onclick="verEmpresaShow(${index})">
            <h6>Clique para ver</h6>
            <li><span>${empresaL.atividadePrincipal}</span> </li>
        </div>`
        }
        
       
    })

}




function inicioApp() {
    infoVisivel.innerHTML = ` <!-- <h3>MODELO DE APP EMPRESA LAGOA DOS PATOS MG</h3>
    <div id="inicio">
        <img src="./imgguia/brasao-lagoa.jpg" alt="">
    </div>
    <h4>brasão de Lagoa dos Patos MG - Fonte: Wikipédia</h4>-->`
}

function fechaEmpresaL() {
    const mostraEmpresa = document.querySelector('#mostraEmpresa');
    mostraEmpresa.innerHTML = ''
}



async function verEmpresaShow(numero) {

    const response = await fetch(urlEmpresas);
    const data = await response.json();


    const mostraEmpresa = document.querySelector('#mostraEmpresa');
    mostraEmpresa.innerHTML = ` <div class="fundoEmpresaLocal" >
    <div class="empresaLocal">
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
                <a href="tel:${data[numero].telefone.replace(/ /g, '').replace(/-/g, '')}">
                <img src="./imgguia/telefone-velho.png" alt="">

                    <h4>${data[numero].telefone}</h4>
                </a>

            </div>
        </div>
        <div class="enderecoEmp">
            <h3>Endereço:</h3> ${data[numero].endereco}, ${data[numero].numero}, ${data[numero].bairro} - ${data[numero].cidade} ${data[numero].estado}
        </div>
        <div class="mapaLocalizacao">

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7120.500241849976!2d-44.58543279331081!3d-16.985286761704423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaaf024fbf80e6f%3A0xb9228623ab4299a5!2sLagoa%20dos%20Patos%2C%20MG%2C%2039360-000!5e0!3m2!1spt-BR!2sbr!4v1680828966941!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <h5>Estamos atualizando todos os endereços</h5>


        </div>
        <div class="btnAcessar">
            <a href="https://goo.gl/maps/CykQn8tHyGaDaV488" target="_blank"><button>Mostrar Rota</button></a>
        </div>
        <div>
            <h3>Fotos:</h3>
            <div class="fotosEmpresas">
                <img src="./imgguia/bomba-de-gasolina.png" alt="">
                <img src="./imgguia/carrinho-de-compras.png" alt="">
            </div>
        </div>

    </div>
    <div class="fecharDivEndereco">
        <img onclick="fechaEmpresaL()" src="./imgguia/cross.png" alt="">
    </div>
</div>`
}

function buscaEmpresa() {
    const mostraSer = document.querySelector('#infoVisivel');
    
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('btnEmpresa');

    console.log(input.length)
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input) || input.length <= 0) {
            x[i].style.display="none";
            //mostraSer.style.display = "none"
           
        }
        else {
            x[i].style.display="list-item";   
            mostraSer.style.display = "block"              
        }
    }
}

function fotosLagoa() {
    infoVisivel.innerHTML = ''
    const mostraI = document.querySelector('#infoVisivel')

    console.log(mostraI)

const imagensOne = ['Barragem cheia Lagoa dos Patos - MG. -27_03_2012_120.jpg', 'Barragem cheia Lagoa dos Patos - MG. -27032012.jpg',  'Barragem-lagoa-dos-patos-mg-27032012121.jpg', 'coletanea-FOTOS-de-lagoa-dos-patos-MG-Sala-mineira.jpg', 'HDR-Lagoa-dos-patos-mg-barragem.png', 'Lagoa-dos-patos-mg-barragem-cheia-27_03_2012122.jpg', 'Tim, Rodrigo, Edson, Cassio, Valdo - mortal Kombat(9).jpg']

for(let i = 0; i < imagensOne.length; i++){
    mostraI.innerHTML += `<div class="tamanhosImg">
        <div class="Sirv" data-effect="zoom">
            <img data-src="https://rogresph.sirv.com/sala-mineira/fotos/${imagensOne[i]}">
        </div>
    </div>`
}   
}

