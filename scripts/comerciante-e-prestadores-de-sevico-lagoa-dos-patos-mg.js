const anuncios = comerciantesPrestadores();

anuncios.forEach(function (anuncio) {
    const divAnun = document.getElementById('anunciantes')
    const linkA = document.createElement('a');
    linkA.setAttribute('href', `${anuncio.link}`);
    linkA.setAttribute('target', '_blank');
    const divInterno = document.createElement('div');
    divInterno.setAttribute('class', 'comerciantePrestador' );
    const imgS = document.createElement('img');
    imgS.setAttribute('class', 'imgC');
    imgS.setAttribute('src', `${anuncio.imagem}`)
    imgS.setAttribute('alt', `${anuncio.nome}`);

    const nomeh = document.createElement('h2');
    nomeh.textContent = `${anuncio.nome}`
    const tipoh = document.createElement('p');
    tipoh.textContent = `${anuncio.tipo}`
    const areah = document.createElement('p');
    areah.textContent = `${anuncio.area}`

    divInterno.appendChild(imgS)
    divInterno.appendChild(nomeh);
    divInterno.appendChild(tipoh)
    divInterno.appendChild(areah)

    linkA.appendChild(divInterno)

    divAnun.appendChild(linkA)


    

});






function comerciantesPrestadores() {
    return [
        {
            'imagem': 'https://www.asconstrutora.com.br/images/as-construtora-logo-andeilton-soares-de-souza-ltda.png',
            'nome': 'AS CONSTRUTORA LTDA',
            'link': '/as-construtora/',
            'tipo': 'Prestador de Serviços',
            'area': 'Construção e reforma'
        },
        {
            'imagem': 'https://static.wixstatic.com/media/7343dd_726d6ab589354b17a16c844314c6bf33~mv2.jpg/v1/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01/netfibra-lagoa-dos-patos-mg.jpg',
            'nome': 'NET FIBRA LAGOA',
            'link': '/net-fibra-lagoa/',
            'tipo': 'Prestador de Serviços',
            'area': 'Serviços de Internet'
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
            'imagem': '/imagens-sala/restaurante-prato-nobre.jpeg',
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