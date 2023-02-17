const url = ('/lagopatenses')

var items = [
    { name: 'xdward', value: 21 },
    { name: 'pharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'bagnetic', value: 0 },
    { name: 'Zeros', value: 37 }
];
console.log(items)


items.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
})
console.table(items)

async function mostrarPoliticos() {
    const response = await fetch(url);
    const data = await response.json()
    const lista = document.querySelector('#listaPopulacao')


    data.sort((a, b) => {
        if (a.nomeCompleto < b.nomeCompleto) return -1;
        if (a.nomeCompleto > b.nomeCompleto) return 1;
        return 0;
    })



    

    console.log(data)

    data.map((politico) => {
        lista.innerHTML += `<a href="/populacao/${politico.nome}">
            <div class="mostraP">
            <img src="${politico.imagemCapa}" alt="">
            <a href="/populacao/${politico.nome}/" target="_blank">
                <li>${politico.nomeCompleto} <br><span> ${politico.apelido}</span> </li>
            </a>
                </div>
        </a>`
        
    })


}
mostrarPoliticos()

function emOrdem(nomeOne, nometwo) {

}