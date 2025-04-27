// const verificaAs = document.querySelectorAll('a')

// for(let i = 0; i < verificaAs.length; i++){
//     console.log( )

//     if(verificaAs[i].href == 'https://asconstrutora.com.br/') {
//         verificaAs[i].href = 'https://asconstrutora.netlify.app/'
//     }

// }
const dtHoje = document.querySelector('#dtHoje')
if(dtHoje != null) {
    const d  = new Date()
    const mes = d.getMonth() + 1
    dtHoje.textContent = `${d.getDate().lenght != 1 ? "0"+d.getDate(): d.getDate()}/${mes.lenght != 1 ? "0"+mes: mes}/${d.getFullYear()}`
}
const favi = document.createElement('link')
favi.setAttribute('rel', 'shortcut icon' )
favi.setAttribute('href', '/favicon.ico' )
favi.setAttribute('type', 'image/x-icon' )

document.querySelector('head').appendChild(favi)

function bannerPrincipal() {

    return `<div class="hero">
    <img src="/imagens-sala/lagoa-dos-patos-mg-hero.jpg" />
    <h1 class="btn-saiba-mais"></h1>           
    </div>`;


}

if (document.querySelector('#Patrocinadores') != null) {
    const carregaApoiadores = async () => {
        const response = await fetch('/campeonato-de-futebol-pirapora')
        const data = await response.json()
        const mTela = document.querySelector('#Patrocinadores')

        data.map((e) => {
            mTela.innerHTML += `<img src="https://ialkyrog.sirv.com/sala/patrocinadores/${e}" alt="">`
        })

    }
    carregaApoiadores()
}
function toggleMenu() {
    const nav = document.getElementById('naveMenu');
    nav.classList.toggle('active');
}
function menuMob() {
    const btnMobile = document.getElementById('btnmobile');
    btnMobile.addEventListener('click', toggleMenu);

}
function promocaoIndex() {


    decMEI2022()

    const menu = MenuPrincipal();


    //compressThumb();


    const ads = `<aside>
    <p>
    A Sala Mineira do Empreendedor é o resultado da parceria entre o SEBRAE MINAS e a JUCEMG – Junta Comercial do Estado de Minas Gerais. Ela foi desenvolvida para melhorar e simplificar o ambiente de negócios em todo Estado, atuando lado a lado com as administrações municipais, oferecendo apoio para empreendimentos de todos os portes.
    Aqui, você irá encontrar um espaço único para formalizar o seu empreendimento, obter orientações, informações e todo o conhecimento necessário para o seu desenvolvimento profissional.Tudo o que você precisa para fazer o seu negócio seguir em frente, de um jeito simples e prático.        
    </p>
    
    
</aside>`

    covidRecente()
    menuPrincipal.innerHTML = `${MenuPrincipal()}`
    ADSTopo.innerHTML = ``
    banneranuncie.innerHTML = `${bannerAnuncieAqui()}`
    promocoesIndex.innerHTML = `${ads}  ${maisArtigos()} `
    footerM.innerHTML = footerMenu();
    //headMenu.innerHTML = `${menuTop()}`    

}

function carregarImage() {
    bannerF.innerHTML = `${bannerPrincipal()}`;

}


function MenuPrincipal() {
    const menu = `<button id="btnmobile" onclick="menuMob()"><i class="bi bi-list"></i></button>
                    <nav id="naveMenu">
                        <ul id="listMenu">                        
                        <a href="/"><li>Inicio</li></a>
                        <a href="/nota-fiscal"><li>nf-e</li></a>
                        <a href="/empresas-lagoa-dos-patos-mg.html"><li>Empresas</li></a>
                        <a href="/gabinete-virtual"><li>Gabinete Virtual</li></a>
                        <a href="/arquivos"><li>Arquivos</li></a>
                        <a href="/falecimentos-lagoa-dos-patos-mg.html"><li>Óbitos</li></a>
                        <a href="/noticias/index.html"><li>Notícias</li></a>
                        <a href="/servicos-prefeitura-lagoa-dos-patos-mg/"><li>Serviços</li></a>
                        <a href="/downloads-leis-lagoa-dos-patos-mg.html"><li>Downloads</li></a>
                        <a href="/cursos"> <li>Cursos</li></a>
                        <a href="/candidatos-eleicoes-2024-em-lagoa-dos-patos-mg.html"> <li>Eleições 2024</li></a>
                        <a href="/gleiton-aparecido-soares-de-souza/"><li>Sobre</li></a>
                        <a href="/contato"><li>Contato</li></a>
                        <a href="/rede"><li>S. Rede</li></a>
                        <a href="/pesquisar/"><li>Pesquisar</li></a>
                        </ul>
                    </nav>

                    <div class="atendimentoWhats">
            <div>
                <a href="https://api.whatsapp.com/send?l=pt-BR&phone=553899020384&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20de%20*Sala%20Mineira%20do%20empreendedor*%20em%20Lagoa%20dos%20Patos%20MG" target="_blank"><img src="/imagens-sala/whatsapp-icon-atendimento-sala-mineira-lagoa-dos-patos-min.png" alt=""></a>
            </div>
        </div>`
    return menu;
}

function fechaProp() {
    const fechaNiver = document.querySelector('.parabensLagoa')
    fechaNiver.classList.toggle('dblockLagoa')
}




function fixaNoTopoM() {
    const navv = document.getElementById('sol');
    const topNavi = navv.offsetTop;

    if (window.pageYOffset >= topNavi) {
        topNavi.classList.add("fixaTop");
    } else {
        topNavi.classList.remove("fixaTop");
    }

}
function menuTop() {
    return `<div class="topo-sala Quebra">
    <div>
        <a class="logoM" href="/">
            <div class="logocaracter">
        
                <h1><span class="colorwhite">SALA</span> <span class="colorOr">MINEIRA</span></h1>
        
                <h2><span class="colorwhite">do Empreendedor de</span> <span class="colorOr">Lagoa dos Patos-MG</span></h2>
        
        
            </div>
        </a>
    </div>
    <div id="banneranuncie">
        <a  class="logoM" href="/divulgue-aqui.html">
            <div>
                <div class="AnuncieAqui DFlex">
                    <i class="bi bi-megaphone-fill"></i>
                    <!--<i class="bi bi-phone-vibrate"></i>-->
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
        </a>
    </div>
</div>
<div class="topo-menu" id="menuPrincipal" onload="MenuPrincipal()">
   
</div>`
}
function selecioneTipoForm() {
    const selecTipo = document.getElementById('selectTipo').value;
    const setaD = document.getElementById('setaD');
    const classdoForm = document.getElementById('classDoForm')
    const avcpfcnpj = document.getElementById('avcpfcnpj')
    if (selecTipo == "CNPJ") {
        avcpfcnpj.setAttribute('style', 'display: none')
        classdoForm.classList.remove('DFlex');
        setaD.setAttribute('style', 'display: none')
        paraCPF.classList.add("cnPJ");
        paraCNPJ.classList.remove("cnPJ");

    } else if (selecTipo == "CPF") {
        avcpfcnpj.setAttribute('style', 'display: none')
        classdoForm.classList.remove('DFlex');
        setaD.setAttribute('style', 'display: none')
        paraCPF.classList.remove("cnPJ");
        paraCNPJ.classList.add("cnPJ");
    } else {
        paraCPF.classList.add('cnPJ')
        paraCNPJ.classList.add("cnPJ");
        classdoForm.classList.add('DFlex');
        setaD.setAttribute('style', 'display: block')
        avcpfcnpj.setAttribute('style', 'display: block')
    }





}


function adsNoArtigo() {





    const menu = MenuPrincipal();
    const adsense = Math.floor(Math.random() * 6) + 1;



    menuPrincipal.innerHTML = menu;
    const adsGoogle = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8921692840146247"
    crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
    style="display:block"
    data-ad-format="fluid"
    data-ad-layout-key="-6x+dw+1m-1u+3o"
    data-ad-client="ca-pub-8921692840146247"
    data-ad-slot="4354203081"></ins>
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
    </script>`
    if (adsense == 1) {
        adsScreen = `<aside>
        <p>
        A Sala Mineira do Empreendedor é o resultado da parceria entre o SEBRAE MINAS e a JUCEMG – Junta Comercial do Estado de Minas Gerais. Ela foi desenvolvida para melhorar e simplificar o ambiente de negócios em todo Estado, atuando lado a lado com as administrações municipais, oferecendo apoio para empreendimentos de todos os portes.
        Aqui, você irá encontrar um espaço único para formalizar o seu empreendimento, obter orientações, informações e todo o conhecimento necessário para o seu desenvolvimento profissional.Tudo o que você precisa para fazer o seu negócio seguir em frente, de um jeito simples e prático.        
        </p>
        <p>Visite Nosso Blog</p></br><a href="/blog/"><img class="brilho" src="/imagens-sala/visite-nosso-blog.jpg" /></a></br></br>${artigosLagoadosPatos()}
        
    </aside>`
    } else if (adsense == 2) {
        adsScreen = `${maisArtigos()}`
    } else if (adsense == 3) {
        adsScreen = `<a href="/divulgue-aqui.html"><img class="brilho" src="/imagens-sala/anuncie-gratis-aqui-salamineira.jpg" /></a></br>
        ${artigosSalaMineira()}`
    }
    else if (adsense == 4) {
        adsScreen = `<p>Visite Nosso Blog</p></br><a href="/blog/"><img class="brilho" src="/imagens-sala/visite-nosso-blog.jpg" /></a></br></br>${artigosLagoadosPatos()}`
    }
    else if (adsense == 5) {
        adsScreen = `${artigosSalaMineira()}`
    }
    else if (adsense == 6) {
        adsScreen = `${artigosLagoadosPatos()}`
    } else {
        adsScreen = `<p>Visite Nosso Blog</p></br><a href="/blog/"><img class="brilho" src="/imagens-sala/visite-nosso-blog.jpg" /></a></br>
        ${artigosSalaMineira()}`
    }

    adsArtigo.innerHTML = `${adsScreen}`
    // propArtifo.innerHTML = `${adsGoogle}`

    footerM.innerHTML = footerMenu();



}

function maisArtigos() {
    return `<ul class="leiaMais">
    <h3>Leia Mais</h3>
    <li><a href="/horario-de-funcionamento.html">Horário de funcionamento da Sala Mineira do empreendedor</a></li>
    <li><a href="/downloads-leis-lagoa-dos-patos-mg.html">Leis do Municipio de Lagoa dos Patos MG
    </a></li>
    <li><a href="/habitantes-de-lagoa-dos-patos-mg.html">Conheça nossos munícipes da nossa cidade de Lagoa dos Patos MG</a></li>
    <li><a href="/fiv-sebrae-lagoa-dos-patos-mg/">Fiv em Lagoa dos Patos MG</a></li>
    <li><a href="/cursos-gratuitos-senac-em-montes-claros-mg">Cursos gratuitos com 196 vagas no Senac Montes Claros MG</a></li>
    <li><a href="/acao-social-emissao-de-carteira-de-identidade-lagoa-dos-patos-mg/">Secretaria de Assistência Social, CRAS e prefeitura municipal realiza ação social em Lagoa dos Patos MG</a></li>
    <li><a href="/campanha-de-vacinacao-antirrabica-em-lagoa-dos-patos-mg/">Campanha de vacinação antirrábica em Lagoa dos Patos MG</a></li>
</ul>
<p style="text-align: center;">.... Anuncio ....</p>
<a href="/as-construtora.html"><img class="brilho" src="/imagens-sala/2022/03/as-construtora-lagoa.jpeg" alt="AS Construtora Andeilton soares de souza AS construtora Lagoa dos Patos MG"></a>
`
}
function artigosSalaMineira() {
    return `<ul class="leiaMais">
    <h3>Leia Mais</h3>
    <li><a href="/fiv-sebrae-lagoa-dos-patos-mg/">Fiv em Lagoa dos Patos MG</a></li>
    <li><a href="/horario-de-funcionamento.html">Horário de funcionamento da Sala Mineira do empreendedor</a></li>
    <li><a href="/cursos-gratuitos-senac-em-montes-claros-mg">Cursos gratuitos com 196 vagas no Senac Montes Claros MG</a></li>
    <li><a href="/downloads-leis-lagoa-dos-patos-mg.html">Leis do Municipio de Lagoa dos Patos MG
    </a></li>
    <li><a href="/habitantes-de-lagoa-dos-patos-mg.html">Conheça nossos munícipes da nossa cidade de Lagoa dos Patos MG</a></li>
    <li><a href="/acao-social-emissao-de-carteira-de-identidade-lagoa-dos-patos-mg/">Secretaria de Assistência Social, CRAS e prefeitura municipal realiza ação social em Lagoa dos Patos MG</a></li>
    <li><a href="/campanha-de-vacinacao-antirrabica-em-lagoa-dos-patos-mg/">Campanha de vacinação antirrábica em Lagoa dos Patos MG</a></li>
</ul>
<p style="text-align: center;">.... Anuncio ....</p>
        <a href="/as-construtora.html"><img class="brilho"  src="/imagens-sala/2022/03/as-construtora-lagoa-dos-patos.jpeg" alt="AS Construtora Andeilton soares de souza AS construtora Lagoa dos Patos MG"></a>`
}
function artigosLagoadosPatos() {
    return `<ul class="leiaMais">
    <h3>Leia Mais</h3>
    <li><a href="/downloads-leis-lagoa-dos-patos-mg.html">Leis do Municipio de Lagoa dos Patos MG
    </a></li>
    <li><a href="/fiv-sebrae-lagoa-dos-patos-mg/">Fiv em Lagoa dos Patos MG</a></li>
    <li><a href="/cursos-gratuitos-senac-em-montes-claros-mg">Cursos gratuitos com 196 vagas no Senac Montes Claros MG</a></li>
    <li><a href="/acao-social-emissao-de-carteira-de-identidade-lagoa-dos-patos-mg/">Secretaria de Assistência Social, CRAS e prefeitura municipal realiza ação social em Lagoa dos Patos MG</a></li>
    <li><a href="/horario-de-funcionamento.html">Horário de funcionamento da Sala Mineira do empreendedor</a></li>
    <li><a href="/habitantes-de-lagoa-dos-patos-mg.html">Conheça nossos munícipes da nossa cidade de Lagoa dos Patos MG</a></li>
    <li><a href="/campanha-de-vacinacao-antirrabica-em-lagoa-dos-patos-mg/">Campanha de vacinação antirrábica em Lagoa dos Patos MG</a></li>
</ul>
<p style="text-align: center;">.... Anuncio ....</p>
        <a href="/as-construtora.html"><img class="brilho"  src="/imagens-sala/2022/03/as-construtora-lagoa-dos-patos-mg.jpeg" alt="AS Construtora Andeilton soares de souza AS construtora Lagoa dos Patos MG"></a>`
}
function bannerAnuncieAqui() {
    return `<img class="imganuncioaqui dnone" src="/img/anuncie-gratis-lagoa-dos-patos-mg.jpeg" alt="">
    <a  class="logoM" href="/divulgue-aqui.html">
        <div>
            <div class="AnuncieAqui DFlex">
                <i class="bi bi-megaphone-fill"></i>
                <!--<i class="bi bi-phone-vibrate"></i>-->
               
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
    return `
   <div class="infoFuncionamento"> 
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
            <li><a href="http://177.152.105.125:8070/e-cidade/login.php" target="_blank">IP De Acesso E-Cidade</a></li>
            <li><a href="/sugestoes.html">Sugestões</a></li>
        </nav>
    </div>
    
    <div class="blocofooter">
        <h2>Nossas redes</h2>
        <nav class="menuFoot">
            <li><a href="/hotel-lagoa-dos-patos-mg.html">Onde Ficar? Onde Almoçar?</a></li>
            <li><a href="/local/">Comerciantes E Prestadores De Serviços Em Lagoa Dos Patos</a></li>
            
        </nav>
    </div>
    <div class="blocofooter">
        <h2>Fique conectado</h2>
        
        <nav class="menuFoot">
            <li><a href="/use-mascara-lagoa-dos-patos/">Use Máscaras Em Lagoa Dos Patos</a></li>            
            <li><a href="/fotos-lagoa-dos-patos-mg/">Fotos Lagoa Dos Patos-MG</a></li>
            <li><a href="/blog">Veja Mais...</a></li>
        </nav>
    </div>
</div>`
}

function fecharBD() {
    document.getElementById('decMei').style.display = "none"
}
function decMEI2022() {


    const n = rdo();
    const imagen = `https://salamineira.com/declaracao-mei-2022/declaracao-mei-2022-lagoa-dos-patos-mg-${n}.jpeg`


    document.getElementById('MEI2022').innerHTML = `<div id="decMei" class="imageTopD">    
    <a href="http://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/dasnsimei.app/Identificacao" target="_blank" rel="follow"><img src="${imagen}" alt=""></a>
    <i onclick="fecharBD()" class="bi bi-x-square-fill"> Fechar</i>
    <p>Clique na imagem para acessar</p>
</div>`
}
function rdo() {
    return Math.floor(Math.random() * 6);
}
// document.getElementById('modalIndex').innerHTML = `<div id="myModal" class="modal">
//             <!-- Modal content -->
//             <div class="modal-content">
//                 <!--nesse evento "onclick" é onde fecho a model, deve ser colocado no X-->
//                 <span class="close" onclick="fecharModel()">&times;</span>

//                 <!-- <p>Você precisa personalizar sua model</p> -->
//                 <p style="text-align: center;">.... Anúncio ....</p>
//                 <a href="/as-construtora/">
//                     <img src="/imagens-sala/2022/03/as-construtora-lagoa-dos-patos-mg.jpeg"
//                         alt="AS Construtora Andeilton soares de souza AS construtora Lagoa dos Patos MG">
//                 </a>
//             </div>

//         </div>`

function fecharCNP() {
    const vejamosS = document.querySelector('#vejamosS')
    vejamosS.innerHTML = '';
}

async function buscaCNPJB() {
    //console.log(urlC)
    var ati = []
    const vejamosS = document.querySelector('#vejamosS')
    const pesquisaCN = document.querySelector('#pesquisaCN').value

    const urlC = `https://minhareceita.org/${pesquisaCN}`

    console.log(pesquisaCN)
    //const urlC = `https://minhareceita.org/26300217000100`

    const response = await fetch(urlC);
    const data = await response.json();
    var atvsec = document.querySelector('#atvsec')
    if (data.cnpj != undefined || pesquisaCN.toString().lenght > 0) {

        const reve = data.data_situacao_cadastral != null ? data.data_situacao_cadastral.split('-').reverse() : ''
        console.log(reve)
        var uatualiza = `${reve[0]}/${reve[1]}/${reve[2]}`


        vejamosS.innerHTML = `
        
        <div class="mostraAnimaCNPJ">
            <div>
                <h4>CNPJ: </h4><p> ${data.cnpj}</p>
            </div>
            <div>
                <h4>RAZÃO SOCIAL:</h4><p>${data.razao_social}</p>
            </div>
            <div>
                <h4>NOME FANTASIA:</h4> <p>${data.nome_fantasia}</p>
            </div>
            <div>
                <h4>CEP:</h4><p>${data.cep}</p>
            </div>
            <div>
                <h4>CIDADE:</h4><p>${data.municipio}</p>
            </div>
            <div>
                <h4>BAIRRO:</h4><p>${data.bairro}</p>
            </div>
            <div>
                <h4>ENDEREÇO:</h4><p>${data.logradouro}</p>
            </div>
            <div>
                <h4>NÚMERO:</h4> <p>${data.numero}</p>
            </div>
            <div>
                <h4>ATIVIDADE PRINCIPAL: </h4> <p>${data.cnae_fiscal_descricao}</p>
            </div>
            <div>
                <h4>ATIVIDADE SECUNDÁRIA: <span id="atvSec"></span></h4>
                 
            </div>
            <div>
                <h4>ÚLTIMA ATUALIZAÇÃO: </h4> <p>${uatualiza}</p>
            </div>
            <i class="bi bi-x-square-fill" onclick="fecharCNP()">FECHAR</i>
        </div>`

        for (let i = 0; i < data.cnaes_secundarios.length; i++) {
            const fSecond = `<br>${data.cnaes_secundarios[i].descricao} <br>`
            atvSec.innerHTML += fSecond
        }
        console.log(JSON.stringify(ati))



    } else if (pesquisaCN.lenght == undefined) {
        vejamosS.innerHTML = ` <div class="mostraAnimaCNPJ">INSIRA UM CNPJ, TENTE NOVAMENTE </div>`
    }
    else {
        vejamosS.innerHTML = ` <div class="mostraAnimaCNPJ">CNPJ INEXISTENTE, TENTE NOVAMENTE </div>`
    }
}
//buscaCNPJB()

async function cadastroCNPJB() {
    //console.log(urlC)
    var ati = []
    const vejamosS = document.querySelector('#vejamosS')
    const pesquisaCN = document.querySelector('#pesquisaCN').value



    const urlC = `https://minhareceita.org/${pesquisaCN}`

    console.log(pesquisaCN)
    //const urlC = `https://minhareceita.org/26300217000100`

    const response = await fetch(urlC);
    const data = await response.json();
    var atvsec = document.querySelector('#atvsec')
    if (data.cnpj != undefined || pesquisaCN.toString().lenght > 0) {

        const reve = data.data_situacao_cadastral != null ? data.data_situacao_cadastral.split('-').reverse() : ''

        var uatualiza = `${reve[0]}/${reve[1]}/${reve[2]}`

        const cnpjC = `${data.cnpj[0]}${data.cnpj[1]}.${data.cnpj[2]}${data.cnpj[3]}${data.cnpj[4]}.${data.cnpj[5]}${data.cnpj[6]}${data.cnpj[7]}/${data.cnpj[8]}${data.cnpj[9]}${data.cnpj[10]}${data.cnpj[11]}-${data.cnpj[12]}${data.cnpj[13]}`

        vejamosS.innerHTML = `
       
        
        <span id="cdrasto">
            <div class="cEmpresa">
            <br> <br>
            CNPJ: <input type="text" name="" id="cnpjR" value="${cnpjC}"> <br> <br>
            RAZÃO SOCIAL: <input type="text" name="" id="razaoR" value="${data.razao_social}"> <br> <br>
            
            NOME FANTASIA: <input type="text" name="" id="nfantaR" value="${data.nome_fantasia}"> <br> <br>
            
            CIDADE: <input type="text" name="" id="cidadeR" value="${data.municipio} - ${data.uf}">
            <br> <br>
            <button onclick="empresaR()">Cadastrar Empresa</button>
                </div>
        </span>`




    } else if (pesquisaCN.lenght == undefined) {
        vejamosS.innerHTML = ` <div class="mostraAnimaCNPJ">INSIRA UM CNPJ, TENTE NOVAMENTE </div>`
    }
    else {
        vejamosS.innerHTML = ` <div class="mostraAnimaCNPJ">CNPJ INEXISTENTE, TENTE NOVAMENTE </div>`
    }
}
function empresaR() {
    const cnpj = document.querySelector('#cnpjR').value
    const razaoR = document.querySelector('#razaoR').value
    const nfantaR = document.querySelector('#nfantaR').value
    const cidadeR = document.querySelector('#cidadeR').value
    const maisEmpresa = [{
        "cnpj": cnpj,
        "razao": razaoR,
        "fantasia": nfantaR,
        "cidade": cidadeR
    }]
    
        const arrEmpresaR = JSON.parse(localStorage.getItem('empresaR'))
        console.log(arrEmpresaR)
        arrEmpresaR.push(maisEmpresa)

        console.log(arrEmpresaR)
        localStorage.setItem('empresaR', JSON.stringify(maisEmpresa))

        regarregaEmpresass()

        cdrasto.innerHTML = ` <div class="cEmpresa">
        <br> <br>
        <h3>CADASTRO EFETUADO COM SUCESSO</h3>
        <br> <br>
        <a ><button onclick="fechar(), preencheDadoss()" >FECHAR</button></a>
            </div>`
    
}
if (localStorage.getItem('empresaR') == null) { localStorage.setItem('empresaR', '[]') }

function fechar() {
    cdrasto.innerHTML = ''
}
function regarregaEmpresass() {
    const cdrasto = document.querySelector('#empresasss')
    const empre = JSON.parse(localStorage.getItem('empresaR'))
    console.log(empre[0])
    cdrasto.innerHTML = ``
    cdrasto.innerHTML = `<option >Selecione</option>`
    for (let i = 0; i < empre.length; i++) {

        cdrasto.innerHTML += `<option value="${i}" >${empre[i].razao} - ${empre[i].cnpj}</option>`
    }

}
function preencheDadoss() {
    const posicao = document.querySelector('#empresasss').selectedIndex - 1

    

    const empre = JSON.parse(localStorage.getItem('empresaR'))
    cnpj.value = empre[posicao].cnpj
    mei.value = empre[posicao].razao
    local.value = empre[posicao].cidade
}
//preencheDadoss()
const linkURL = "/editaistopo"
// "urlS": urls,
// "dataP": abertura,
// "processo": processos,
// "publicado": publicacao,
// "abertura": abertura,
// "modalidade": modalidade,
// "situacao": situacao,
// "infolicita": infoLicita



async function editaisEmAb() {
    const editaisEmAberto = document.querySelector('#editaisEmAberto')
    const response = await fetch(linkURL);
    const data = await response.json()
    const cardEdita = document.querySelectorAll('.cardEdita')
    const modal = document.querySelectorAll('.modal')
    for (let index = 0; index < cardEdita.length; index++) {
        const element = cardEdita[index];
        const modl = modal[index];

        element.remove(element)
        element.remove(modl)

    }
    data.map((editalt, index) => {

        if (editalt.processo.toString().replace(/ /g, '').length > 10) {
            if (editalt.situacao == "Situação : Aberta") {
                var imageSituacao = '/img-editais/edital-aberto.jpg'
            } else if (editalt.situacao == "Situação : Em andamento") {
                var imageSituacao = '/img-editais/edital-em-andamento.jpg'
            } else if (editalt.situacao == "Situação : Revogada") {
                var imageSituacao = '/img-editais/edital-revogado.jpg'
            } else {
                var imageSituacao = '/img-editais/edital-finalizado.jpg'
            }
            if (index < 5) {
                editaisEmAberto.innerHTML += `    <div class="cardEdita" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal_${index}" >
        <div class="luzRefletor"></div>
        <div class="infoEditalS">
            <p>${editalt.processo.replace(/PREGÃO PRESENCIAL/gi, 'P.P')}</p>
            <h2>${editalt.situacao.replace(/Situação : /g, '').toUpperCase()}</h2>
            <h3>${editalt.dataP} </br>Clique e veja</h3>
        </div>
        <div class="sombraEdi"></div>
    </div>

    <div class="modal fade" id="exampleModal_${index}" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${editalt.processo} - ${editalt.dataP} - ${editalt.modalidade}</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">${editalt.situacao.replace(/Situação : /g, '')}</div>
            <div class="modal-body">${editalt.infolicita}</div>
            <a href="${editalt.urlS}" target="_blank"><button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Veja o edital Completo</button></a>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Fechar</button>
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
        </div>
    </div>
</div>
    `
            }

        }
    })
    spinLoad.remove()
    //console.clear()
    console.log('www.gleiton.com.br')
    console.warn('Por: Gleiton Soares')

}

document.querySelector('#editaisEmAberto') != null ? editaisEmAb() : ''


async function geraAba(valor) {
    const valorModal = `exampleModal_${valor}`
    console.log(valorModal)
    const abreEditalInfo = document.querySelector('#abreEditalInfo')
    const response = await fetch(linkURL);
    const data = await response.json()
    abreEditalInfo.innerHTML = ` <div class="modal fade" id="${valorModal}" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${data[valor].processo} - ${data[valor].dataP} - ${data[valor].modalidade}</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">${data[valor].infolicita}</div>
            <a href="${data[valor].urlS}" target="_blank"><button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Veja o edital Completo</button></a>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Fechar</button>
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
        </div>
    </div>
</div>`
}

document.querySelectorAll('a[href="https://asconstrutora.com.br"]').forEach(link => {
    console.log(link)
    link.href = 'https://asconstrutora.netlify.app/';
});

