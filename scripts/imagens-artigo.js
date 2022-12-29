const adsFixo = document.querySelector('#adsArtigo');
const adsFix = document.getElementsByTagName("nav")[0];
const adsTopo = adsFixo.offsetTop;

console.log(adsTopo)

window.onscroll = function () {
     fixaAds();
}


function fixaAds() {
    if (window.scrollY >= adsTopo ) {
        adsFixo.classList.add('fixaPropaganda');
        console.log(adsTopo)
    } else {
        adsFixo.classList.remove('fixaPropaganda');
        console.log(0)
    }
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