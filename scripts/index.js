function bannerPrincipal() {

    return `<div class="hero">
    <img src="/imagens-sala/lagoa-dos-patos-mg-hero.jpg" />
    <h1 class="btn-saiba-mais"></h1>           
    </div>`;
    

    
}
function toggleMenu() {
    const nav = document.getElementById('naveMenu');
    nav.classList.toggle('active');
}
function menuMob() {
    const btnMobile = document.getElementById('btnmobile');
    btnMobile.addEventListener('click', toggleMenu)

}
function promocaoIndex() {
    const menu = MenuPrincipal();
    
    const ads = `<aside>
    <p>
    A Sala Mineira do Empreendedor é o resultado da parceria entre o SEBRAE MINAS e a JUCEMG – Junta Comercial do Estado de Minas Gerais. Ela foi desenvolvida para melhorar e simplificar o ambiente de negócios em todo Estado, atuando lado a lado com as administrações municipais, oferecendo apoio para empreendimentos de todos os portes.
    Aqui, você irá encontrar um espaço único para formalizar o seu empreendimento, obter orientações, informações e todo o conhecimento necessário para o seu desenvolvimento profissional.Tudo o que você precisa para fazer o seu negócio seguir em frente, de um jeito simples e prático.        
    </p>
    
</aside>`
    
    
    menuPrincipal.innerHTML = `${MenuPrincipal()}`
    ADSTopo.innerHTML = ``
    banneranuncie.innerHTML = `${bannerAnuncieAqui()}`
    promocoesIndex.innerHTML = `${ads}  ${maisArtigos()} `
    footerM.innerHTML = `${footerMenu()}`

 

    
}
function carregarImage() {
    bannerF.innerHTML = `${bannerPrincipal()}`;
}

function MenuPrincipal() {
    const menu = `<button id="btnmobile" onclick="menuMob()"><i class="bi bi-list"></i></button>
                    <nav id="naveMenu">
                        <ul id="listMenu">                        
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/nota-fiscal">nf-e</a></li>
                        <li><a href="/blog/">notícias</a></li>
                        <li><a href="/servicos-prefeitura-lagoa-dos-patos-mg/">Serviços</a></li>
                        <li><a href="/cursos">Cursos</a></li>
                        <li><a href="/gleiton-aparecido-soares-de-souza/">Sobre</a></li>
                        <li><a href="/contato">Contato</a></li>
                        <li><a href="/pesquisar/">Pesquisar</a></li>
                        </ul>
                    </nav>`
    return menu;
}

function adsNoArtigo() {
    const menu = MenuPrincipal();
    const adsense = Math.floor(Math.random() * 6) + 1;
    

    
    menuPrincipal.innerHTML = menu;

    if (adsense == 1) {
        adsScreen = `<aside>
        <p>
        A Sala Mineira do Empreendedor é o resultado da parceria entre o SEBRAE MINAS e a JUCEMG – Junta Comercial do Estado de Minas Gerais. Ela foi desenvolvida para melhorar e simplificar o ambiente de negócios em todo Estado, atuando lado a lado com as administrações municipais, oferecendo apoio para empreendimentos de todos os portes.
        Aqui, você irá encontrar um espaço único para formalizar o seu empreendimento, obter orientações, informações e todo o conhecimento necessário para o seu desenvolvimento profissional.Tudo o que você precisa para fazer o seu negócio seguir em frente, de um jeito simples e prático.        
        </p>
        
    </aside>`
    } else if(adsense == 2) {
        adsScreen = `${maisArtigos()}`   
    } else if(adsense == 3) {
        adsScreen = `<img src="/imagens-sala/lagoa-dos-patos-mg-hero.jpg" />`   
    }
    else if(adsense == 4) {
        adsScreen = `<img src="/imagens-sala/lagoa-dos-patos-mg-hero.jpg" /></br>${artigosLagoadosPatos()}`   
    }
    else if(adsense == 5) {
        adsScreen = `${artigosSalaMineira()}`   
    }
    else if(adsense == 6) {
        adsScreen = `${artigosLagoadosPatos()}`   
    } else {
        adsScreen = `<img src="/imagens-sala/lagoa-dos-patos-mg-hero.jpg" />`
    }

    adsArtigo.innerHTML = `${adsScreen}`

    

}

function maisArtigos() {
    return `<ul class="leiaMais">
    <h3>Leia Mais</h3>
    <li><a href="/fiv-sebrae-lagoa-dos-patos-mg/">Fiv em Lagoa dos Patos MG</a></li>
    <li><a href="/cursos-gratuitos-senac-em-montes-claros-mg">Cursos gratuitos com 196 vagas no Senac Montes Claros MG</a></li>
    <li><a href="/acao-social-emissao-de-carteira-de-identidade-lagoa-dos-patos-mg/">Secretaria de Assistência Social, CRAS e prefeitura municipal realiza ação social em Lagoa dos Patos MG</a></li>
    <li><a href="/campanha-de-vacinacao-antirrabica-em-lagoa-dos-patos-mg/">Campanha de vacinação antirrábica em Lagoa dos Patos MG</a></li>
</ul>`
}
function artigosSalaMineira() {
    return `<ul class="leiaMais">
    <h3>Leia Mais</h3>
    <li><a href="/fiv-sebrae-lagoa-dos-patos-mg/">Fiv em Lagoa dos Patos MG</a></li>
    <li><a href="/cursos-gratuitos-senac-em-montes-claros-mg">Cursos gratuitos com 196 vagas no Senac Montes Claros MG</a></li>
    <li><a href="/acao-social-emissao-de-carteira-de-identidade-lagoa-dos-patos-mg/">Secretaria de Assistência Social, CRAS e prefeitura municipal realiza ação social em Lagoa dos Patos MG</a></li>
    <li><a href="/campanha-de-vacinacao-antirrabica-em-lagoa-dos-patos-mg/">Campanha de vacinação antirrábica em Lagoa dos Patos MG</a></li>
</ul>`
}
function artigosLagoadosPatos() {
    return `<ul class="leiaMais">
    <h3>Leia Mais</h3>
    <li><a href="/fiv-sebrae-lagoa-dos-patos-mg/">Fiv em Lagoa dos Patos MG</a></li>
    <li><a href="/cursos-gratuitos-senac-em-montes-claros-mg">Cursos gratuitos com 196 vagas no Senac Montes Claros MG</a></li>
    <li><a href="/acao-social-emissao-de-carteira-de-identidade-lagoa-dos-patos-mg/">Secretaria de Assistência Social, CRAS e prefeitura municipal realiza ação social em Lagoa dos Patos MG</a></li>
    <li><a href="/campanha-de-vacinacao-antirrabica-em-lagoa-dos-patos-mg/">Campanha de vacinação antirrábica em Lagoa dos Patos MG</a></li>
</ul>`
}
function bannerAnuncieAqui() {
    return `<img class="imganuncioaqui dnone" src="/img/anuncie-gratis-lagoa-dos-patos-mg.jpeg" alt="">
    <a  class="logoM" href="/divulgue-aqui/">
        <div>
            <div class="AnuncieAqui DFlex">
                <i class="bi bi-phone-vibrate"></i>
                <div>
                    <h2>ATENÇÃO</h2>
                    <h3>QUER ANUNCIAR GRÁTIS O SEU NEGÓCIO?</h3>
                    <P>CLIQUE AQUI E ANUNCIE</P>
                </div>
                <div class="ApoioAnuncio">
                    <p>Apoio</p>
                    <p>Prefeitura Municipal de Lagoa dos Patos MG</p>
                </div>
            </div>
    
        </div>
    </a>`
}
function footerMenu() {
    return `<div class="infoFuncionamento"> 
    <h1>Sala Mineira do Empreendedor de Lagoa dos Patos MG</h1>
    <h2>De Segunda a Sexta-feira</h2>
    <p>08:00hs às 11:00hs e 13:00hs às 16:00hs</p>
</div>
<div class="blocoinfoFooter">
    <div class="blocofooter">
        <h2>Sobre</h2>
        <nav class="menuFoot">
            <li><a href="/gleiton-aparecido-soares-de-souza/">Sala Mineira</a></li>
            <li><a href="/gleiton-aparecido-soares-de-souza/">Agente de desenvolvimento</a></li>
            <li><a href="/contato">Entre em contato</a></li>
        </nav>
    </div>
    <div class="blocofooter">
        <h2>Acesso oficial</h2>
        <nav class="menuFoot">
            
            <li><a href="https://lagoadospatos.mg.gov.br">Prefeitura Lagoa Dos Patos</a></li>
            <li><a href="https://salamineira.com">Sala Mineira Do Empreendedor</a></li>
            <li><a href="http://177.188.1.1:8080/login.php">IP De Acesso E-Cidade</a></li>
            <li><a href="/sugestoes/">Sugestões</a></li>
        </nav>
    </div>
    
    <div class="blocofooter">
        <h2>Nossas redes</h2>
        <nav class="menuFoot">
            <li><a href="#">Onde Ficar? Onde Almoçar?</a></li>
            <li><a href="#">Comerciantes E Prestadores De Serviços Em Lagoa Dos Patos</a></li>
            
        </nav>
    </div>
    <div class="blocofooter">
        <h2>Fique conectado</h2>
        
        <nav class="menuFoot">
            <li><a href="#">Use Máscaras Em Lagoa Dos Patos</a></li>
            <li><a href="#">Instalação Completa Torre TIM</a></li>
            <li><a href="#">Pedido De Viabilidade TORRE TIM</a></li>
            <li><a href="#">Viabilidade Torre Aprovada</a></li>
            <li><a href="#">Fotos Lagoa Dos Patos-MG</a></li>
            <li><a href="#">Veja Mais...</a></li>
        </nav>
    </div>
</div>`
}