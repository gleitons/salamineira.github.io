var infoVisivel = document.querySelector('#infoVisivel')
var urlEmpresas = '/empresas'



async function empresas() {

    const response = await fetch(urlEmpresas);
    const data = await response.json();

    data.map((empresaL) => {
        infoVisivel.innerHTML += `<li>${empresaL.razaoSocial} - ${empresaL.cnpjN} </li>`
    })

}