const showFooter = document.querySelector('.showFooter');
const url = window.location.pathname;

const xiConferencia = [
  '/eixo-3-da-conferencia-destaca-a-integracao-entre-beneficios-e-servicos-para-fortalecer-a-protecao-social-em-lagoa-dos-patos-mg/',
  '/eixo-2-da-conferencia-aperfeicoamento-continuo-do-suas-e-prioridade-para-fortalecer-a-assistencia-social-em-lagoa-dos-patos-mg/',
  '/eixo-1-da-conferencia-universalizacao-do-suas-e-caminho-para-garantir-acesso-e-equidade-em-lagoa-dos-patos-mg/'
];

// Cria a imagem
const imagem = document.createElement('img');

// Verifica se a URL atual está no array xiConferencia
if (xiConferencia.includes(url)) {
  imagem.setAttribute('src', 'https://salamineira.com/src/footer/apoio.png');
} else {
  imagem.setAttribute('src', 'https://salamineira.com/src/footer/footer-normal.png');
}

// Adiciona a imagem ao footer
showFooter.appendChild(imagem);
