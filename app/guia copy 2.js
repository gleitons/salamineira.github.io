var infoVisivel = document.querySelector('#infoVisivel')
var iconesNav = document.getElementsByClassName('iconesNav')[0]
var linkSelect = iconesNav.getElementsByTagName('a')

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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/padaria-gps.jpg" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }
    })
    infoId.innerHTML = 'Padarias'
    favoritosMarcados();
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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/lanchonete-gps.jpg" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }
    })
    infoId.innerHTML = 'Bares e Lanchonetes'
    favoritosMarcados()
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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/bar-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }
    })
    infoId.innerHTML = 'Bares'
    favoritosMarcados()
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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/posto-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }
    })
    infoId.innerHTML = 'Posto de Combustível'
    favoritosMarcados()
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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/geral-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }


    })
    infoId.innerHTML = 'Empresas de gás'
    favoritosMarcados()

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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/taxi-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }
    })
    infoId.innerHTML = 'Táxis'
    favoritosMarcados()
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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/geral-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div>`
            }
        }
    })
    infoId.innerHTML = 'Empresa Pública'
    favoritosMarcados()
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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/farmacia-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }
    })
    infoId.innerHTML = 'Farmácias'
    favoritosMarcados()
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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/mercado-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }


    })
    infoId.innerHTML = 'Mercados'
    favoritosMarcados()

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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/geral-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> favoritosMarcados()`
            }
        }
    })
    infoId.innerHTML = 'Gás';
    favoritosMarcados()
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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/internet-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }
    })
    infoId.innerHTML = 'Provedores';
    favoritosMarcados()
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
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/geral-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div> `
            }
        }
    })
    infoId.innerHTML = 'Ração e Beleza Animal';
    favoritosMarcados()
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
        const restaurante = "restaurante-gps.png"
        const mercado = "mercado-gps.png"
        const padaria = "padaria-gps.png"
        for (let i = 0; i < empresaL.id.length; i++) {
            if (empresaL.id[i] == "restaurante") {
                infoVisivel.innerHTML += ` 
                <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_${index}" >
                    <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                        <img class="imgSetor" src="./imgguia/restaurante-gps.png" alt="">
                        <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                        <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
                        <p>Ver</p>
                    </div>                           
                </div>                   
        </div>`
            }
        }
    })
    infoId.innerHTML = 'Restaurantes';
    favoritosMarcados()
}
function marcaTop(numero) {
    const marcador = document.querySelectorAll('.menuTop nav a')
    marcador[numero].classList.add('marcado')
    //console.log(marcador)
}
function desmarcaTop() {
    const marcador = document.querySelectorAll('.menuTop nav a')
    for (let i = 0; i < marcador.length; i++) {
        marcador[i].classList.remove('marcado')
    }
    //marcador.classList.tog('marcado')
    //console.log(marcador)
}
function contadorFavorite() {
    const contadorF = document.querySelector('#contadorF')
    if (JSON.parse(localStorage.getItem('favoritosEmpresas')) != null) {
        var arrayContFavorite = JSON.parse(localStorage.getItem('favoritosEmpresas'))
        if (arrayContFavorite.length == 0) {
            contadorF.textContent = arrayContFavorite.length
        } else {
            contadorF.textContent = 0
        }
        contadorF.textContent = arrayContFavorite.length
    }
   
    //console.log(arrayContFavorite.length)

}
//setInterval('contadorFavorite()', 2000)

//marcaTop()
async function favoritosEmpresasOn() {
    desmarcaTop()
    marcaTop(2)
    fechaEmpresaL()

    infoId.innerHTML = 'Carregando..'
    apagaSeleciona()
    // linkSelect[0].classList.add('addSeleciona')
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()

    var favoritos = JSON.parse(localStorage.getItem('favoritosEmpresas'))
    //console.log(favoritos.length)

    if (favoritos === null) {
        infoVisivel.innerHTML += ` <div class="btnEmpresa" >                   
                VOCÊ AINDA NÃO POSSUI FAVORITOS
           
        </div>`
    } else if (favoritos.length == 0) {
        infoVisivel.innerHTML += ` <div class="btnEmpresa" >                   
                VOCÊ AINDA NÃO POSSUI FAVORITOS
           
        </div>`
    }
    else {
        const response = await fetch(urlEmpresas);
        const data = await response.json();

        for (let i = 0; i < favoritos.length; i++) {
            const numeroEmpresa = favoritos[i]
            infoVisivel.innerHTML += `

            <div class="btnEmpresa" >                   
                        <div class="empresasSituado" id="id_${numeroEmpresa}" >
                            <div  class="dadosEmp" onclick="favoritarEmpresa(${numeroEmpresa})">
                                <img class="imgSetor" src="./imgguia/favorito-gps.png" alt="">
                                <img class="favoritar" id="iconFavo${numeroEmpresa}"  src="./imgguia/favorito-adicionado.png" alt="">
                            </div>
                            <div class="infoDaEmpresa" onclick="verEmpresaShow(${numeroEmpresa})">
                                <li><span>${data[numeroEmpresa].nomeFantasia}</span> <br> ${data[numeroEmpresa].razaoSocial} <br> ${data[numeroEmpresa].cnpjN} </li>
                                <p>Ver</p>
                            </div>
                        </div>
                </div>`
            //if(n)
            // data.map((empresaL, index) => {  
            //     infoVisivel.innerHTML += `${empresaL[numeroEmpresa]} `
            // })



            //console.log(data[i])
        }



        //     for (let i = 0; i < empresaL.id.length; i++) {
        //         if (empresaL.id[i] == "restaurante") {
        //             infoVisivel.innerHTML += ` <div class="btnEmpresa" >                   
        //         <div class="empresasSituado" id="id_0" >
        //             <div  class="dadosEmp">
        //                 <img class="imgSetor" src="./imgguia/restaurante-gps.png" alt="">
        //                 <!-- <img class="favoritar" id="iconFavo0" onclick="favoritarEmpresa(0)" src="./imgguia/add-favorito.png" alt=""> -->

        //             </div>
        //             <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
        //                 <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${empresaL.cnpjN} </li>
        //                 <p>Ver</p>
        //             </div>

        //         </div>

        // </div>`
        //         }
        //     }

    }


    infoId.innerHTML = 'Favoritos';
    favoritosMarcados()
    contadorFavorite()

}


async function empresas() {
    desmarcaTop()
    marcaTop(1)
    infoId.innerHTML = 'Carregando...'
    apagaSeleciona();
    infoVisivel.innerHTML = ''
    const inicio = document.querySelector('#inicio')
    //inicio.remove()
    const response = await fetch(urlEmpresas);
    const data = await response.json();
    data.map((empresaL, index) => {
        infoVisivel.innerHTML += ` <div class="btnEmpresa" >                   
        <div class="empresasSituado" id="id_${index}" >
            <div  class="dadosEmp" onclick="favoritarEmpresa(${index})">
                <img class="imgSetor" src="./imgguia/favorito-gps.png" alt="">
                <img class="favoritar" id="iconFavo${index}"  src="./imgguia/add-favorito.png" alt="">
            </div>
            <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                <li><span>${data[index].nomeFantasia}</span> <br> ${data[index].razaoSocial} <br> ${data[index].cnpjN} </li>
                <p>Ver</p>
            </div>
        </div>
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
        <div class="btnEmpresa" >                   
                <div class="empresasSituado" id="id_0" >
                    <div  class="dadosEmp">
                        <img class="imgSetor" src="./imgguia/geral-gps.png" alt="">
                        <!-- <img class="favoritar" id="iconFavo0" onclick="favoritarEmpresa(0)" src="./imgguia/add-favorito.png" alt=""> -->
                        
                    </div>
                    <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
                    <li><span>${empresaL.nomeFantasia}</span> <br> ${empresaL.razaoSocial} <br> ${nomeChave} </li>
                        <p>Ver</p>
                    </div>
                   
                </div>
           
        </div>
      `


    })
    infoId.innerHTML = ''

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

        <div class="btnEmpresa" >                   
        <div class="empresasSituado" id="id_0" >
            <div  class="dadosEmp">
                <img class="imgSetor" src="./imgguia/geral-gps.png" alt="">
                <!-- <img class="favoritar" id="iconFavo0" onclick="favoritarEmpresa(0)" src="./imgguia/add-favorito.png" alt=""> -->
                
            </div>
            <div class="infoDaEmpresa" onclick="verEmpresaShow(${index})">
            <li><span>${empresaL.atividadePrincipal}</span> </li>
                <p>Ver</p>
            </div>
           
        </div>
   
</div>
       `
        }


    })
    infoId.innerHTML = 'Todas atividades'

}




function inicioApp() {
    contadorFavorite()
    desmarcaTop()
    marcaTop(0)
    apagaSeleciona()
    infoId.innerHTML = 'Home'
    infoVisivel.innerHTML = `<a class="logoM" href="/app"> <div class="logocaracter">
    <h1><span class="colorwhite">SALA</span> <span class="colorOr">MINEIRA</span></h1> <h2><span class="colorwhite">do Empreendedor de</span> <span class="colorOr">Lagoa dos Patos-MG</span></h2> </div> </a>`
    contadorFavorite()
}
function apagaSeleciona() {
    for (let i = 0; i < linkSelect.length; i++) {
        linkSelect[i].classList.remove('addSeleciona')
    }

    //infoId.innerHTML = 'Mercados'
}

function fechaEmpresaL() {
    const mostraEmpresa = document.querySelector('#mostraEmpresa');
    // apagaSeleciona()
    mostraEmpresa.innerHTML = ''
}
inicioApp()

function geradorFundoEmpresaLocal(data) {
    console.log(data)
}


async function verEmpresaShow(numero) {

    const response = await fetch(urlEmpresas);
    const data = await response.json();

    
    const ligarCelular = "+55" + data[numero].telefone.replace(' ', '9').replace('-', '')
    const mostraCelular = data[numero].telefone.replace(' ', ' 9')
    var whatsAppTel = "55" + data[numero].telefone.replace(' ', '').replace('-', '')


    //const linkTemp = `https://www.google.com/maps/place/R.+Sete+de+Setembro,+32,+Lagoa+dos+Patos+-+MG,+39360-000`
    // if(data[numero].mapa != undefined){

    // } else {

    // }

    if (data[numero].mapa != undefined) {
        var mapaS = data[numero].mapa.split('|')[0]
        var linkOpe = data[numero].mapa.split('|')[1]
    } else {
        var mapaS = `<iframe src='https://www.google.com/maps/embed?pb=Rua sete de setembro 185 39360-000!5e0!3m2!1spt-BR!2sbr!4v1680905641529!5m2!1spt-BR!2sbr' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>`
        var linkOpe = `https://www.google.com/maps/place/${data[numero].endereco.replace(/ /g, '+').toLowerCase()},${data[numero].numero.replace(/ /g, '+')},+Lagoa+dos+Patos+-+MG,+39360-000`
    }

    if (data[numero].imagensEmpresa != undefined) {
        var imagensEmpresa = data[numero].imagensEmpresa

        var fotosEmpresaG = [];

        for (let i = 0; i < imagensEmpresa.length; i++) {
            const imageE = `<img src="${imagensEmpresa[i]}" alt="">`
            fotosEmpresaG.push(imageE)

        }
        var imagensdaEmp = JSON.stringify(fotosEmpresaG).replace(/\["/g, '').replace(/\\"/g, '\"').replace(/\",\"/g, ' ').replace(/\"\]/g, "Futuro Consultoria")
        //const imagensdaEmp = ``
    } else {
        var imagensdaEmp = `Sem Fotos no momento`
    }
    const enderecoRua = data[numero].endereco.replace(/R /gi, 'RUA ').replace(/[0-9]/gi, '')
    const mostraEmpresa = document.querySelector('#mostraEmpresa');
   
    mostraEmpresa.innerHTML =  geradorFundoEmpresaLocal(data) ` <div class="fundoEmpresaLocal" >
    <div class="empresaLocal">
        <div class="apresentaEndereco">
        <h2>${data[numero].razaoSocial}</h2>
            <h2>${data[numero].nomeFantasia}</h2>
            <h3>${data[numero].cnpjN}</h3>
        </div>
        <div>
            <div class="contatoEmpresa">
                <a href="https://api.whatsapp.com/send?l=pt-BR&phone=${whatsAppTel}&text=Olá ${data[numero].nomeFantasia} ${data[numero].razaoSocial}, gostaria de algumas informações, poderia me ajudar?">
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
        <a href="${linkOpe}" target="_blank"><button>MOSTRAR ROTA</button></a>
    </div>
        <div class="enderecoEmp">
            <h3>Endereço:</h3> ${enderecoRua}, ${data[numero].numero}, ${data[numero].bairro} - ${data[numero].cidade} ${data[numero].estado}
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
    desmarcaTop()
    marcaTop(3)
    infoVisivel.innerHTML = ''
    const mostraI = document.querySelector('#infoVisivel')



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


function favoritarEmpresa(numero) {
    contadorFavorite()

    var iconFavo = document.querySelector(`#iconFavo${numero}`).src
    const iconF = document.querySelector(`#iconFavo${numero}`)
    const valorId = document.querySelector(`#id_${numero}`).id.replace(/id_/g, '')

    if (localStorage.getItem("favoritosEmpresas") === null) {
        var empresasFavoritas = []
        //console.log(cheio.length)
    } else {
        const cheio = localStorage.getItem('favoritosEmpresas')
        const favorite = JSON.parse(cheio);
        var empresasFavoritas = favorite
    }


    var favoriteSalvo = valorId



    const index = empresasFavoritas.indexOf(favoriteSalvo);
    const seFavoExiste = index != -1;
    if (seFavoExiste) {
        empresasFavoritas.splice(index, 1);
        iconF.src = './imgguia/add-favorito.png'

    } else {
        empresasFavoritas.push(favoriteSalvo)
        iconF.src = './imgguia/favorito-adicionado.png'
    }
    localStorage.setItem('favoritosEmpresas', JSON.stringify(empresasFavoritas))



    //console.log(empresasFavoritas)





    // console.log(iconFavo)
    // if(localStorage.getItem('favoritosEmpresas') != null){
    //     console.log('empresas adicionadas')
    // }
    // if(ind)

    // if(iconFavo != null) {
    //     console.log("Favoritado")
    //     //iconF.style.backgroundColor = "red";
    //     iconF.src = './imgguia/favorito-adicionado.png'
    //     iconFavo = null
    //     favoritos.push(valorId)
    //     localStorage.setItem('favoritosEmpresas', JSON.stringify(favoritos))
    // } else {
    //     console.log("Desfavoritado")
    //     //iconF.style.backgroundColor = "gree"
    //     iconF.style.backgroundColor = "gray";
    //     iconF.src = './imgguia/add-favorito.png'
    // }


}
async function favoritosMarcados() {

    const response = await fetch(urlEmpresas);
    const data = await response.json();

    // var iconFavoT = document.querySelector(`#iconFavo${numero}`).src
    // const iconF = document.querySelector(`#iconFavo${numero}`)
    // const valorId = document.querySelector(`#id_${numero}`).id.replace(/id_/g, '')


    //console.log(favor.length)
    var favor = JSON.parse(localStorage.getItem('favoritosEmpresas'))

    for (let i = 0; i < favor.length; i++) {
        const numerFav = favor[i]
        const verImagem = document.querySelector(`#iconFavo${numerFav}`)


        if (verImagem != null) {
            document.querySelector(`#iconFavo${numerFav}`).src = './imgguia/favorito-adicionado.png'
        }

        // if(document.querySelector(`#iconFavo${numerFav}`).src != null){
        //     document.querySelector(`#iconFavo${numerFav}`).src = './imgguia/favorito-adicionado.png'
        // }


        // console.log()
        // data.map((favEmp) => {



        // })
        // var imgtroca = JSON.parse(localStorage.getItem('favoritosEmpresas'))
        //document.querySelector(`#iconFavo${data.indexOf(i)}`).src = './imgguia/favorito-adicionado.png'
        //console.log(data.indexOf(i))

    }

}
//favoritosMarcados()
//setInterval('favoritosMarcados()', 1000)
