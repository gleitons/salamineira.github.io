function promocaoIndex() {
    const menu = MenuPrincipal();
    
    const ads = `<aside>
    <div>
        <img src="/imagens-sala/front-fachada-senac-montes-claros-sala-mineira-lagoa-dos-patos-mg.jpg" alt="">
    </div>
    <p>
    A Sala Mineira do Empreendedor é o resultado da parceria entre o SEBRAE MINAS e a JUCEMG – Junta Comercial do Estado de Minas Gerais. Ela foi desenvolvida para melhorar e simplificar o ambiente de negócios em todo Estado, atuando lado a lado com as administrações municipais, oferecendo apoio para empreendimentos de todos os portes.
    Aqui, você irá encontrar um espaço único para formalizar o seu empreendimento, obter orientações, informações e todo o conhecimento necessário para o seu desenvolvimento profissional.Tudo o que você precisa para fazer o seu negócio seguir em frente, de um jeito simples e prático.        
    </p>
    <img src="/imagens-sala/artigos/artigo-sebrae-compre-do-bairro-min.jpeg" alt="">
</aside>`
    promocoesIndex.innerHTML = `${ads}  ${maisArtigos()} `
 

    
}

function MenuPrincipal() {
    const menu = ` <nav>
                <li><a href="/">Inicio</a></li>
                <li><a href="/nota-fiscal">nf-e</a></li>
                <li><a href="#">notícias</a></li>
                <li><a href="/servicos-prefeitura-lagoa-dos-patos-mg">Serviços</a></li>
                <li><a href="/cursos">Cursos</a></li>
                <li><a href="#">Sobre</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="/pesquisar/">Pesquisar</a></li>
            </nav>`
    return menu;
}

function adsNoArtigo() {
    const menu = MenuPrincipal();
    const adsense = Math.floor(Math.random() * 6) + 1;
    menuPrincipal.innerHTML = menu;

    if (adsense == 1) {
        adsScreen = `Propaganda 01`
    } else if(adsense == 2) {
        adsScreen = `Propaganda 2`   
    } else if(adsense == 3) {
        adsScreen = `Propaganda 3`   
    }
    else if(adsense == 4) {
        adsScreen = `Propaganda 4`   
    }
    else if(adsense == 5) {
        adsScreen = `Propaganda 5`   
    }
    else if(adsense == 6) {
        adsScreen = `Propaganda 6`   
    } else {
        adsScreen = `Propaganda 7`
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