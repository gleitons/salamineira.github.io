function dMode() {
    dModeT()
    //avisoS('Opção em construção - Em breve Novidades')
}
if(localStorage.getItem('dmodeRede') == null){
    localStorage.setItem('dmodeRede', 0) 
}
const modeAtual = localStorage.getItem('dmodeRede')

if(modeAtual == 1 ){
    const moded = document.querySelector('.telaApresentacao').style.backgroundColor = '#555555'
    
} else {
    document.querySelector('.telaApresentacao').style.backgroundColor = 'white'
    
}


function dModeT() {
    const menuAtual = document.querySelector('.menusApresentação').style.backgroundColor
    const fundoAtual = document.querySelector('.telaApresentacao').style.backgroundColor
    const modeAtual = localStorage.getItem('dmodeRede')

    if(modeAtual == 0 ){
        document.querySelector('.telaApresentacao').style.backgroundColor = '#555555'
        localStorage.setItem('dmodeRede', 1) 
    } else {
        document.querySelector('.telaApresentacao').style.backgroundColor = 'white'
        localStorage.setItem('dmodeRede', 0)
    }
    // alert(menuAtual)
    // document.querySelector('.menusApresentação').style.backgroundColor = '#0e0e0e'
    
    //#555555
    
}
const MenuLateral = () => {
    document.querySelector('.menusApresentação').innerHTML = ` 
    <nav class="menuLateral">
    <div>
    <p>MENU - FUTURO CONSULTORIA</p>
    </div>
    
    <a href="./">
        <li><i class="bi bi-house-fill"></i> Inicio</li>
    </a>
    <p class="avisoDiv">Buscador S</p>
    <a href="./buscar-cnpj.html">
    <li><i class="bi bi-search"></i> Buscador Completo</li>
    </a>
    <p class="avisoDiv">Adicionar Atalho</p>

    <li class="menuDrop"><i class="bi bi-folder-symlink-fill"></i> Atalho
     <ul class="subMenu">
        <a href="./criar-atalho.html">
        <li><i class="bi bi-house-up-fill"></i>Novo</li>
        </a>   
        <a href="./editar-atalho.html">
        <li><i class="bi bi-house-up-fill"></i>Editar</li>
        </a>   
        <a href="./excluir-atalho.html">
        <li><i class="bi bi-house-up-fill"></i>Excluir</li>
        </a>   
        <a href="#" onclick="addAtalhos()">
        <li><i class="bi bi-house-up-fill"></i>Adicionar na Tela</li>
        </a>   
        
     </ul>
    </li>  

    <p class="avisoDiv">Consulta CNPJ</p>
    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Consulta CNPJ
    <ul class="subMenu">
    <a href="./buscar-cnpj.html">
    <li><i class="bi bi-house-up-fill"></i>Rápida</li>
    </a>   
    <a href="https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp" target="_blank">
    <li><i class="bi bi-house-up-fill"></i>Receita Federal</li>
    </a>    
    <a href="https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp" target="_blank">
    <li><i class="bi bi-house-up-fill"></i>E-CAC</li>
    </a>   
    <a href="./inscricao-estadual.html" >
    <li><i class="bi bi-house-up-fill"></i>Estadual</li>
    </a>     
    </ul>
    </li>  
    <p class="avisoDiv">Certidões</p>
    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Certidão CNPJ
    <ul class="subMenu">
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND Federal</li>
    </a>  
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND Estadual</li>
    </a>  
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND FGTS</li>
    </a>  
    <a href="./itbi-rural.html">
    <li><i class="bi bi-house-up-fill"></i>Informações RFB</li>
    </a>      
    </ul>
    </li>  

    <p class="avisoDiv">MEI (Microempreendedor Individual)</p>
    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Especial MEI
    <ul class="subMenu">
    <a href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/emissao-de-comprovante-ccmei" target="_blank">
    <li><i class="bi bi-house-up-fill"></i>CCMEI</li>
    </a>  
    <a href="./itbi-urbano.html" target="_blank">
    <li><i class="bi bi-house-up-fill"></i>CND Federal</li>
    </a>  
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND Estadual</li>
    </a>  
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND FGTS</li>
    </a>  
    <a href="./itbi-rural.html">
    <li><i class="bi bi-house-up-fill"></i>Informações RFB</li>
    </a>      
    </ul>
    </li>  


    <p class="avisoDiv">Atendimento SAS SEBRAE</p>

    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Atendimentos
     <ul class="subMenu">
        <a href="./atendimento-sas-modelos.html">
        <li><i class="bi bi-house-up-fill"></i>Modelos</li>
        </a>   
        <a href="./cadastro-empresa.html">
        <li><i class="bi bi-house-up-fill"></i>Cadastrar</li>
        </a>   
         <a href="./cadastro-imovel.html">
             <li><i class="bi bi-house-add-fill"></i>Editar</li>
         </a>
        
         <a href="./cadastro-endereco.html">
             <li><i class="bi bi-signpost-fill"></i> Excluir</li>
         </a>
     </ul>
    </li>  
    <p class="avisoDiv">Favoritos</p>

    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Favoritos
     <ul class="subMenu">
        <a href="./cadastro-pessoal.html">
        <li><i class="bi bi-house-up-fill"></i>Favoritos</li>
        </a>   
        <a href="./cadastro-pessoal.html">
        <li><i class="bi bi-house-up-fill"></i>Novo</li>
        </a>   
        <a href="./cadastro-empresa.html">
        <li><i class="bi bi-house-up-fill"></i>Editar</li>
        </a>   
         <a href="./cadastro-imovel.html">
             <li><i class="bi bi-house-add-fill"></i>Excluir</li>
         </a>
     </ul>
    </li>  

    <a href="./perfil.html">
    <li><i class="bi bi-layer-backward"></i> Editar Perfil</li>
    </a> 
   

   
    
<a href="./backup.html">
<li><i class="bi bi-layer-backward"></i> Backup</li>
</a> 
<a href="./resetar.html">
<li><i class="bi bi-trash3-fill"></i> Resetar</li>
</a> 



    
 </nav>`

}
MenuLateral()

if (localStorage.getItem('perfilRede') == null) {
    loadDadosPrincipais()
}
function loadDadosPrincipais() {
    const dados = {
        "imagemFundo": "./src/img/futuro-consultoria.svg",
        "imagem": "./src/img/futuro-consultoria-horizonte.svg",
        "titlo": "FUTURO CONSULTORIA",
        "subTitle": "26.300.217/0001-00"
    }
    localStorage.setItem('perfilRede', JSON.stringify([dados]))
    console.log([dados])
}
function resetaMenuEFundo() {
    loadDadosPrincipais()
    location.reload()
}

const menuTop = () => {
    const data = JSON.parse(localStorage.getItem('perfilRede'))
    const imagemFundo = data[0].imagemFundo
    const imagem = data[0].imagem
    const titlo = data[0].titlo
    const subTitle = data[0].subTitle
    const fundoAP = document.querySelector('.telaApresentacao')
    fundoAP.setAttribute('style', `background-image: url('${data[0].imagemFundo}');`)

    document.querySelector('header').innerHTML = ` 
    <div>
    <a href="./" style="background-image: url('${imagem}')">
    <div class="logoCima" ">        
    </div>
    </a>
    <div class="letrasLogo">
        <h2>${titlo.toUpperCase()}</h2>
        <h3>${subTitle}</h3>
    </div>
   </div>`

}
menuTop()


function atualizarPerfilDigito() {
    const data = JSON.parse(localStorage.getItem('perfilRede'))
    const perfil = {
        "imagemFundo": linkImagfundo.value,
        "imagem": linkImag.value,
        "titlo": tituloLocal.value,
        "subTitle": SubTituloLocal.value
    }
    localStorage.setItem('perfilRede', JSON.stringify([perfil]))
    
}

function atualizarPerfilClique() {
    const data = JSON.parse(localStorage.getItem('perfilRede'))
    const perfil = {
        "imagemFundo": linkImagfundo.value,
        "imagem": linkImag.value,
        "titlo": tituloLocal.value,
        "subTitle": SubTituloLocal.value
    }
    localStorage.setItem('perfilRede', JSON.stringify([perfil]))
    location.reload()
}

if(document.querySelector('.classT') != null){
    window.onstorage = function (e) {

        atualizarPerfilDigito()
        // if(document.querySelector('#AtalhosAdicionandoIcons' != null)) adicionaNoDesktop()
    
    }
}

document.querySelector('head').innerHTML += `<link rel="shortcut icon" href="./src/img/futuro-consultoria-horizonte.svg" type="image/x-icon">`


