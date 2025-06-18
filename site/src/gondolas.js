function fixaPage(){
    slide1();
    Menu();

}



function slide1() {
    document.getElementById('hero').src = 'brasilgondolas.com.br/slides-pro/gondolas-de-aco-21-11.png';
    setTimeout('slide2()', 4000);
    document.getElementById('linkBanner').href = '/';
   
}
function slide2() {
    document.getElementById('hero').src = 'brasilgondolas.com.br/slides-pro/banner-novidade-carrinhos.png';
    setTimeout('slide1()', 4000);
    document.getElementById('linkBanner').href = '/';
}
function Menu() {
    document.getElementById('menu').innerHTML = `<nav class="menuT DFlex">
    <li><a href="/">Inicio</a></li>
    <li><a href="/">Produtos</a></li>
    <li><a href="#">Sobre Nós</a></li>
    <li><a href="#">Fale Conosco</a></li>
</nav>`
}