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
            <li><span>${empresaL.nomeFantasia}</span> ${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>
        </div>`
        // console.log(empresaL.id.length)
        // for(let i = 0; i < empresaL.id.length; i++ ) {
        //     console.log(empresaL.id[i])
        //     if(empresaL.id[i] == "farmacia") {
               
        //     }
        // }
        
       
    })

}



function inicioApp() {
    infoVisivel.innerHTML = `  <h3>MODELO DE APP EMPRESA LAGOA DOS PATOS MG</h3>
    <div id="inicio">
        <img src="./imgguia/brasao-lagoa.jpg" alt="">
    </div>
    <h4>brasão de Lagoa dos Patos MG - Fonte: Wikipédia</h4>`
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