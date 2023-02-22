const url = ('/empresas')

async function empresas() {
    const response = await fetch(url);
    const data = await response.json();
    const empresaO = document.querySelector('#empresasL')

    
    data.sort((a, b) => {
        if (a.razaoSocial < b.razaoSocial) return -1;
        if (a.razaoSocial > b.razaoSocial) return 1;
        return 0;
    })
    

    const cont = "38 2101-5817 38 2101-5815"
    

    const color = ["cred", "cgreen", "cverde", "claranja", "cblue", "crosa"]

  
    data.map((mostra) => {
        const fundoColor = Math.floor(Math.random()* 5);
       
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
    <div class="col-lg-nome ${color[fundoColor]}">
        <p class="mg-md p-288-style">${mostra.razaoSocial}</p>
    </div>
    <div class="col-12 col-lg-3">
        <p class="mg-md p-288-style"><strong>${mostra.nomeFantasia}</strong><br></p>
    </div>
    <div class="col-12 col-lg-3">
        <p class="mg-md p-288-style">${mostra.endereco} ${mostra.numero} ${mostra.bairro}</p>
    </div>
    <div class="col-lg-3">
        <p class="mg-md p-288-style">${contatoEm}</p>
    </div>
    <div class="col-lg-3">
    <p class="mg-md p-288-style">${mostra.atividadePrincipal}</p>
</div>
</div>`

    divEmpresa.appendChild(divC);
    empresaO.appendChild(divEmpresa);

    })

    
    
}
empresas();

// async function empresasLagoa() {
//     document.getElementById('empresasL').innerHTML = url
// }
// empresasLagoa();