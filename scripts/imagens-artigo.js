const adsFixo = document.querySelector('#adsArtigo');
const adsFix = document.getElementsByTagName("nav")[0];
const adsTopo = adsFixo.offsetTop;


window.onscroll = function () {
     fixaAds();
}


function fixaAds() {
    if (window.scrollY >= adsTopo ) {
        adsFixo.classList.add('fixaPropaganda');
    } else {
        adsFixo.classList.remove('fixaPropaganda');
    }
}

const todosTr = document.querySelector('#todosTr')
if(todosTr != null) {
    const geraContato = async () => {
        const response = await fetch('/dados/defesa-civil')
        const data = await response.json()
        localStorage.setItem('contatosDefesa', JSON.stringify(data))
        const contatos = JSON.parse(localStorage.getItem('contatosDefesa'))
        //<td>${e.telefone2}</td>
        contatos.map((e) => {
            console.log(e.item)
            if(e.brasao != null) {
                var imagemB = e.brasao
            } else {
                var imagemB = `https://img.freepik.com/vetores-premium/modelo-de-brasao-imperial-de-luxo-escudo-heraldico-entrelacado-com-coroa-de-rei_274258-408.jpg?w=2000`
            }
            
            todosTr.innerHTML += ` <tr>
            <td>#${e.item}</td>
            <td><img src="${imagemB}" alt="Brasão da Cidade de ${e.cidade}"></td>
            <td>${e.cidade}</td>
            <td>${e.email}</td>
            
            <td>${e.telefone3}</td>
            <td>${e.telefone4}</td>
        </tr>`
        })
    }
    geraContato()
}

function mabs() {
    imageLoads.innerHTML = `
    <img 
    src="/imagens-sala/artigos/bob-saget-ator.jpg" alt="Morre ator bob Segat">`;
}
function cdsb() {
    imageLoads.innerHTML = `
    <img 
    src="/imagens-sala/artigos/artigo-sebrae-compre-do-bairro.png" alt="Compre do seu bairro">`;
}
function gdrma() {
    imageLoads.innerHTML = `
    <img 
    src="/imagens-sala/relatorio-mei-gratis-qualidade.jpg" alt="gerador de relatorio de receita bruta MEI">`;
}
function tijolego() {
    imageLoads.innerHTML = `<img src="/imagens-sala/2022/02/tilolego-banner.jpeg" alt="">`
}