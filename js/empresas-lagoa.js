const url = ('/empresas')

async function empresas() {
    const response = await fetch(url);
    const data = await response.json();
    const empresaO = document.querySelector('#empresasOK')

    const cont = "38 2101-5817 38 2101-5815"
    console.log(cont.length)


    data.map((mostra) => {
        if(mostra.telefone.length > 26){
            var contatoEm = ''
        } else {
            var contatoEm = mostra.telefone
        }
        const divEmpresa = document.createElement('div')
    divEmpresa.setAttribute('class', 'container-div-2574-style');
    const divC = document.createElement('span')
    divC.innerHTML= `
    <div class="row align-items-center">
    <div class="col-lg-3">
        <p class="mg-md p-288-style">${mostra.razaoSocial}</p>
    </div>
    <div class="col-12 col-lg-3">
        <p class="mg-md p-288-style">${mostra.nomeFantasia}<br></p>
    </div>
    <div class="col-12 col-lg-3">
        <p class="mg-md p-288-style">${mostra.endereco} ${mostra.numero} ${mostra.bairro}</p>
    </div>
    <div class="col-lg-3">
        <p class="mg-md p-288-style">${contatoEm}</p>
    </div>
</div>`

    divEmpresa.appendChild(divC);
    empresaO.appendChild(divEmpresa);

    })

    
    
}
empresas();