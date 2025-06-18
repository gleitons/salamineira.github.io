function dMode() {
    dModeT()
    //avisoS('Opção em construção - Em breve Novidades')
}
if (localStorage.getItem('dmodeRede') == null) {
    localStorage.setItem('dmodeRede', 0)
}
const modeAtual = localStorage.getItem('dmodeRede')

if (modeAtual == 1) {
    const moded = document.querySelector('.telaApresentacao').style.backgroundColor = '#555555'

} else {
    document.querySelector('.telaApresentacao').style.backgroundColor = 'white'

}

document.querySelector('head').innerHTML += `<script async src="https://www.googletagmanager.com/gtag/js?id=UA-133729569-2"></script>
    <script>window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments) } gtag("js", new Date()); gtag("config", "UA-133729569-2");</script>`


function dModeT() {
    const menuAtual = document.querySelector('.menusApresentação').style.backgroundColor
    const fundoAtual = document.querySelector('.telaApresentacao').style.backgroundColor
    const modeAtual = localStorage.getItem('dmodeRede')

    if (modeAtual == 0) {
        document.querySelector('.telaApresentacao').style.backgroundColor = '#555555'
        localStorage.setItem('dmodeRede', 1)
    } else {
        document.querySelector('.telaApresentacao').style.backgroundColor = 'white'
        localStorage.setItem('dmodeRede', 0)
    }


}
function horario() {
    const h = new Date()
    const hora = h.getHours().toString().length == 1 ? '0' + h.getHours() : h.getHours()
    const minutos = h.getMinutes().toString().length == 1 ? '0' + h.getMinutes() : h.getMinutes()
    const segundos = h.getSeconds().toString().length == 1 ? '0' + h.getSeconds() : h.getSeconds()
    const horarios = `${hora}:${minutos}:${segundos}`
    horarioPad.textContent = horarios
    localStorage.setItem('horarioA', JSON.stringify(horarios))


    //return horario
}
if (localStorage.getItem('perfilRede') == null) {
    loadDadosPrincipais()
}
const MenuLateral = () => {
    const dataT = JSON.parse(localStorage.getItem('perfilRede'))
    const horaAt = JSON.parse(localStorage.getItem('horarioA'))
    const h = new Date()
    const nomeMostra = dataT[0].nome != null ? dataT[0].nome : ''
    const mes = h.getMonth() + 1
    const mesAtual = mes.toString().length == 1 ? '0' + mes : mes
    const dataDia = `${h.getDate()}/${mesAtual}/${h.getFullYear()}`
    const horariod = `${h.getHours()}:${h.getMinutes()}:${h.getSeconds()}`
    document.querySelector('.menusApresentação').innerHTML = ` 
    <nav class="menuLateral">
    <div>
    <p>FUTURO CONSULTORIA</p>
    <p>Bem-vindo</p>
    <a href="./perfil.html"><p>${nomeMostra}</p></a>
    <p>${dataDia} - <span id="horarioPad">${horaAt}</span></p>
    </div>
    
    <a href="./">
        <li><i class="bi bi-house-fill"></i> Inicio</li>
    </a>
    <a href="./perfil.html">
    <li><i class="bi bi-layout-text-window-reverse"></i> Perfil</li>
    </a>
    
    <p class="avisoDiv">Buscador S</p>
    <a href="./buscar-cnpj.html">
    <li><i class="bi bi-search"></i> Pesquisa Rápida</li>
    </a>
    

    <p class="avisoDiv">MEI, ME, SA</p>
    <li class="menuDrop"><i class="bi bi-universal-access-circle"></i> Universo CNPJ
    <ul class="subMenu">
    <a href="./favoritos.html">
    <li><i class="bi bi-star-fill"></i></i>Favoritos</li>
    </a>   
    <a href="./links-interessantes.html">
    <li><i class="bi bi-globe2"></i> Links Interessantes</li>
    </a>  
    
    </ul>
    </li>  
    <li class="menuDrop"><i class="bi bi-folder-symlink-fill"></i> Atalho
     <ul class="subMenu">
        <a href="./criar-atalho.html">
        <li><i class="bi bi-file-plus-fill"></i></i>Novo</li>
        </a>   
        <a href="./editar-atalho.html">
        <li><i class="bi bi-pencil-fill"></i></i>Editar</li>
        </a>   
        <a href="./excluir-atalho.html">
        <li><i class="bi bi-x-square-fill"></i></i>Excluir</li>
        </a>   
        <a href="#" onclick="addAtalhos()">
        <li><i class="bi bi-house-up-fill"></i>Adicionar na Tela</li>
        </a>   
        
     </ul>
    </li>  

    <p class="avisoDiv">Atendimento SAS SEBRAE</p>

    <li class="menuDrop"><i class="bi bi-receipt"></i> Atendimentos
     <ul class="subMenu">
        <a href="./atividades-concluidas.html">
        <li><i class="bi bi-check-circle-fill"></i> Concluidos</li>
        </a>  
        <!-- <a href="./atendimento-sas-modelos.html">
        <li><i class="bi bi-archive-fill"></i> Modelos</li>
        </a>         
        <a href="./cadastro-empresa.html">
        <li><i class="bi bi-arrow-right-square-fill"></i> Cadastrar</li>
        </a>   
         <a href="./cadastro-imovel.html">
             <li><i class="bi bi-pencil-fill"></i> Editar</li>
         </a>       
         <a href="./cadastro-endereco.html">
             <li><i class="bi bi-x-circle"></i> Excluir</li>
         </a>
         --!>
     </ul>
    </li>  
     <a href="./acessar-system.html">
        <li><i class="bi bi-arrow-clockwise"></i> New System </li>
    </a>

    



    
    <!-- <p class="avisoDiv">+ Opções</p>

    <li class="menuDrop">
    <i class="bi bi-gear-fill"></i> Opções
     <ul class="subMenu">
     <a href="./perfil.html">
     <li><i class="bi bi-pencil-square"></i> Editar Perfil</li>
     </a> 

     <a href="./backup.html">
    <li><i class="bi bi-layer-backward"></i> Backup</li>
    </a>     
    <a href="./documentacao.html">
    <li><i class="bi bi-file-earmark-arrow-down-fill"></i> Documentação</li>
    </a> 
    
    </li>  --!>
 </nav>`
    setInterval('horario()', 1000)

}
MenuLateral()


function loadDadosPrincipais() {
    const dados = {
        "imagemFundo": "./src/img/futuro-consultoria.svg",
        "imagem": "./src/img/futuro-consultoria-horizonte.svg",
        "titlo": "FUTURO CONSULTORIA",
        "subTitle": "26.300.217/0001-00",
        "color": "#ffffff",
        "nome": "Atualize Perfil"
    }
    localStorage.setItem('perfilRede', JSON.stringify([dados]))

}

function resetaMenuEFundo() {
    loadDadosPrincipais()
    location.reload()
}
const loadItensDoPerfil = () => {
    const data = JSON.parse(localStorage.getItem('perfilRede'))
    linkImagfundo.value = data[0].imagemFundo
    linkImag.value = data[0].imagem
    tituloLocal.value = data[0].titlo
    SubTituloLocal.value = data[0].subTitle
    fundoColor.value = data[0].color
    nomeIdComplete.value = data[0].nome
}
const linkImag = document.querySelector('#linkImag')
if (linkImag != null) {
    loadItensDoPerfil()
}
const menuTop = () => {
    const data = JSON.parse(localStorage.getItem('perfilRede'))
    const imagemFundo = data[0].imagemFundo
    const nomes = data[0].nome
    const imagem = data[0].imagem
    const titlo = data[0].titlo
    const subTitle = data[0].subTitle
    const color = data[0].color
    if (data[0].comoFicaImg == 1) {
        var comoFImage = `background-size: contain;`
    } else if (data[0].comoFicaImg == 2) {
        var comoFImage = `background-size: cover;`
    } else {
        var comoFImage = `background-size: auto;`
    }
    const fundoAP = document.querySelector('.telaApresentacao')
    fundoAP.setAttribute('style', `background-image: url('${data[0].imagemFundo}'); background-color: ${color}; ${comoFImage}
    background-position: center;`)

    document.querySelector('header').innerHTML = ` 
    <div>
    <a href="./" style="background-image: url('${imagem}');">
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
        "subTitle": SubTituloLocal.value,
        "color": fundoColor.value,
        "nome": nomeIdComplete.value
    }
    localStorage.setItem('perfilRede', JSON.stringify([perfil]))

}

function atualizarPerfilClique() {

    // const data = JSON.parse(localStorage.getItem('perfilRede'))
    const pImageFundo = document.querySelector('#pImageFundo').selectedIndex

    const perfil = {
        "imagemFundo": linkImagfundo.value,
        "imagem": linkImag.value,
        "titlo": tituloLocal.value,
        "subTitle": SubTituloLocal.value,
        "color": fundoColor.value,
        "nome": nomeIdComplete.value,
        "comoFicaImg": pImageFundo
    }
    console.log(perfil)
    localStorage.setItem('perfilRede', JSON.stringify([perfil]))
    location.reload()
}

if (document.querySelector('.classT') != null) {
    window.onstorage = function (e) {

        atualizarPerfilDigito()
        // if(document.querySelector('#AtalhosAdicionandoIcons' != null)) adicionaNoDesktop()

    }
}



let contpostIt = 0;

const contadorDePostIt = () => {
    const postItsAtualizados = JSON.parse(localStorage.getItem('postIt')) || [];
    contpostIt = postItsAtualizados.length;
    const contadorElement = document.querySelector('.contadorLemb');
    if (contadorElement) {
        contadorElement.textContent = contpostIt;

        // --- animação ---
        contadorElement.style.transition = 'transform 0.3s ease';
        contadorElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            contadorElement.style.transform = 'scale(1)';
        }, 300);
    }
};

// Atualiza já ao carregar
contadorDePostIt();

// Atualiza a cada 3 segundos
let contDaT = 0;
setInterval(contadorDePostIt, 3000);

const contadorDeAtalhos = () => {
    const postItsAtualizados = JSON.parse(localStorage.getItem('atalhosContratos')) || [];
    contDaT = postItsAtualizados.length;
    const contadorElement = document.querySelector('.contadorAta');
    if (contadorElement) {
        contadorElement.textContent = contDaT;

        // --- animação ---
        contadorElement.style.transition = 'transform 0.3s ease';
        contadorElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            contadorElement.style.transform = 'scale(1)';
        }, 300);
    }
};


// Atualiza já ao carregar
contadorDeAtalhos();

// Atualiza a cada 3 segundos
setInterval(contadorDeAtalhos, 3000);



const tipoBar = localStorage.getItem('pBarT') == 1 ? 'atalhosTelaDesktop' : 'atalhosTelaDesktopHorizonte'
document.querySelector('head').innerHTML += `<link rel="shortcut icon" href="./src/img/futuro-consultoria-horizonte.svg" type="image/x-icon">`

document.querySelector('footer').innerHTML += `  <div id="menuLTop" class="${tipoBar} confiTela">         

<div >
<abbr title="Home">
    <a href="./">
        <img src="./src/img/icons/inicio-casa.png" alt="Inicio">
       
    </a>
</div>   
</abbr>        
<abbr title="Novo Atalho">
    
     <div onclick="addAtalhos()" style="position: relative; display: inline-block;">
        <img src="./src/img/icons/novo-atalho.png" alt="Novo Atalho">
        <span class="contadorAta">${contDaT}</span>
    </div>
</abbr>
<abbr title="Novo Lembrete">
    <div onclick="addLembrete()" style="position: relative; display: inline-block;">
        <img src="./src/img/icons/novo-lembrete.png" alt="Novo Lembrete">
        <span class="contadorLemb">${contpostIt}</span>
    </div>
</abbr>


<abbr title="Favoritos">
    <div >
        <a href="./favoritos.html">
            <img src="./src/img/icons/favoritos-empresas.png" alt="Favorito">
    
        </a>
    </div>
</abbr>
 <abbr title="Pesquisar Empresa">
     <div>
        <a href="./buscar-cnpj.html">
            <img src="./src/img/icons/pesquisa-empresas.png" alt="Novo Atalho">
     
        </a>
     </div>
 </abbr>
<abbr title="Editar Perfil">
    <div>
        <a href="./perfil.html">
            <img src="./src/img/icons/editar-perfil.png" alt="Novo Atalho">
    
        </a>
    </div>
</abbr>
<abbr title="Editar Perfil">
    <div>
        <a href="#">
            <img onclick="mostrarEspacoRestante()" src="./src/img/icons/big-data.png" alt="Novo Atalho">
    
        </a>
    </div>
</abbr>


<abbr title="Mudar Posição">
    <div onclick='mudaPosicaoMenu()'>
        <a href="#">
            <img src="https://ialkyrog.sirv.com/sala/icones/editar-imovel.png" alt="Mudar posição">
    
        </a>
    </div>
</abbr>


</div>
`
function papelDeParede() {
{/* <abbr title="Ver Tela de fundo">
    <div onclick="papelDeParede()">
        <a href="#">
            <img src="./src/img/icons/papel-de-parede.png" alt="Ver Tela de fundo">
    
        </a>
    </div>
</abbr> */}
}
function verWall(ativo) {
    const main = document.querySelector('main');
    const divsInternas = main.querySelectorAll('div');

    if (ativo) {
        // Aplica o wallpaper no main
        main.style.backgroundImage = "url('https://s.glbimg.com/jo/g1/f/original/2011/12/21/barco_a_vapor_benjamin_guimaraes.jpg')";
        main.style.backgroundSize = "contain";
        main.style.backgroundRepeat = "no-repeat";
        main.style.backgroundPosition = "center";
        main.style.height = "100vh";
        main.style.width = "100vw"; // Use vw para ocupar toda a largura da tela

        // Oculta todas as divs internas
        divsInternas.forEach(div => {
            div.dataset.originalDisplay = div.style.display || ''; // salva o display original
            div.style.display = 'none';
        });
    } else {
        // Remove o wallpaper
        main.style.backgroundImage = '';
        main.style.backgroundSize = '';
        main.style.height = '';
        main.style.width = '';

        // Restaura as divs
        divsInternas.forEach(div => {
            div.style.display = div.dataset.originalDisplay || '';
            delete div.dataset.originalDisplay;
        });
    }
}


document.querySelector('.contadorLemb').textContent = contpostIt;
const mudaPosicaoMenu = () => {
    const menuLTop = document.querySelector('#menuLTop')
    const ver = menuLTop.classList.contains('atalhosTelaDesktop');
    if (ver) {
        menuLTop.classList.add('atalhosTelaDesktopHorizonte')
        menuLTop.classList.remove('atalhosTelaDesktop')
        localStorage.setItem('pBarT', 0)
    } else {
        menuLTop.classList.remove('atalhosTelaDesktopHorizonte')
        menuLTop.classList.add('atalhosTelaDesktop')
        localStorage.setItem('pBarT', 1)
    }
}

document.querySelectorAll('a[href="https://gleiton.com.br"]').forEach(link => {
    console.log(link)
    link.href = 'https://gleiton.vercel.app/servicos';
});