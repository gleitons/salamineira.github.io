const anuncios = eventosEmLagoadosPatos();

anuncios.forEach(function (anuncio) {
    console.log(anuncio.nome);
    document.getElementById('anunciantes').innerHTML += `<a href="${anuncio.link}" target = "_blank">
    <div class="comerciantePrestador">
        <img class="imgC" src="${anuncio.imagem}" alt="">
        <h2>${anuncio.nome}</h2>
        <p>${anuncio.tipo}</p>
        <p>${anuncio.area}</p>
    </div>
</a>`

});






function eventosEmLagoadosPatos() {
    return [
        {
            'imagem': 'https://www.asconstrutora.com.br/images/as-construtora-logo-andeilton-soares-de-souza-ltda.png',
            'nome': 'AS CONSTRUTORA LTDA *Patrocínio*',
            'link': '/as-construtora/',
            'tipo': 'Prestador de Serviços',
            'area': 'Construção e reforma'
        },
        {
            'imagem': '/imagens/cartaz-forro-arraste-pe-lagoa-dos-patos-2014-f.jpeg',
            'nome': 'FORRÓ DO ARRASTA PÉ EM LAGOA DOS PATOS MG',
            'link': '/eventos-em-lagoa-dos-patos-mg/forro-do-arrasta-pe-em-lagoa-dos-patos-mg.html',
            'tipo': '28/06/2014',
            'area': 'ARTISTAS TRADICIONAIS'
        },
        {
            'imagem': 'https://static.wixstatic.com/media/7343dd_54e721f3d1f5460b9c1c9775c650bf3b~mv2.png/v1/fill/w_335,h_334,al_c,q_85/Capa-matheus-andre-engenheiro-civil-lago.jpg',
            'nome': 'MATEUS ANDRÉ ENG',
            'link': '/matheus-andre-eng/',
            'tipo': 'Prestador de Serviços',
            'area': 'Serviços de engenharia'
        },
        {
            'imagem': 'https://static.wixstatic.com/media/7343dd_c87118ec4a4346d79c0a088a728f9298~mv2.png/v1/fill/w_336,h_335,al_c,q_85/solar-prime-lagoa-dos-patos-mg.jpg',
            'nome': 'MATEUS DUARTE ENGENHARIA',
            'link': '/solar-prime/',
            'tipo': 'Prestador de Serviços',
            'area': 'Engenharia Elétrica'
        },
        {
            'imagem': 'https://www.salamineira.com/img/duarte-engenharia-mateus-duarte-dos-santos-36598006000150-mostra.jpeg',
            'nome': 'DUARTE ENGENHARIA',
            'link': 'https://www.salamineira.com/duarte-engenharia/',
            'tipo': 'Prestador de Serviços',
            'area': 'Engenharia Elétrica'
        },
        {
            'imagem': 'https://www.naturfive.com/imagens-naturfive/restaurante-prato-nobre.jpeg',
            'nome': 'RESTAURANTE PRATO NOBRE',
            'link': '/restaurante-prato-nobre/',
            'tipo': 'Comerciante',
            'area': 'Restaurante e Lanchonete'
        },
        {
            'imagem': 'https://www.salamineira.com/imagens-sala/2022/02/logo-tijolego-home.jpeg',
            'nome': 'TIJOLEGO',
            'link': '/tijolego.html',
            'tipo': 'Comerciante',
            'area': 'Tijolos ecológicos'
        },
        {
            'imagem': 'https://www.salamineira.com/imagens-sala/2022/03/hotel-estrela-lagoa-dos-patos-mg.jpeg',
            'nome': 'HOTEL ESTRELA LAGOA DOS PATOS MG',
            'link': 'https://www.salamineira.com/hotel-em-lagoa-dos-patos-mg.html',
            'tipo': 'Prestador de Serviços',
            'area': 'Hotel e Hospedagem'
        },
        {
            'imagem': 'https://www.salamineira.com/imagens-sala/2022/03/hotel-cosmos-capa.png',
            'nome': 'HOTEL COSMOS LAGOA DOS PATOS MG',
            'link': 'https://www.salamineira.com/imagens-sala/2022/03/hotel-cosmos-capa.png',
            'tipo': 'Prestador de Serviços',
            'area': 'Hotel e Hospedagem'
        },
        {
            'imagem': 'https://img.elo7.com.br/product/zoom/258B7CB/adesivo-parede-restaurante-prato-feito-comida-caseira-lenha-adesivo-restaurante-fritas-salada.jpg',
            'nome': 'ANUNCIE GRÁTIS',
            'link': 'https://www.salamineira.com/divulgue-aqui/',
            'tipo': 'Anuncie Grátis',
            'area': 'Clique aqui e Anuncie'
        },
        {
            'imagem': 'https://static.wixstatic.com/media/7343dd_af04788053004d29a4004c2e8e8bdb3b~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01/divulgue-seu-negocio-sala-mineira-empree.jpg',
            'nome': 'ANUNCIE GRÁTIS',
            'link': 'https://www.salamineira.com/divulgue-aqui/',
            'tipo': 'ANUNCIE GRÁTIS',
            'area': 'CLIQUE AQUI E ANUNCIE'
        },

    ]
}
//anunciantes