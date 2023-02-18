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
        const linkP = document.createElement('a');
        linkP.setAttribute('href',`/populacao/${politico.nome}`);
        const mostraP = document.createElement('div');
        mostraP.setAttribute('class', 'mostraP');
        const imgCapa = document.createElement('img');
        imgCapa.setAttribute('src', `${politico.imagemCapa}`);
        imgCapa.setAttribute('alt', `${politico.nomeCompleto}`);
        const linkInterno = document.createElement('a');
        linkInterno.setAttribute('href', `/populacao/${politico.nome}/`);
        linkInterno.setAttribute('target', '_blank');
        const liNome = document.createElement('li');
        liNome.innerHTML = `${politico.nomeCompleto} <br><span> ${politico.apelido}</span>`;

        linkInterno.appendChild(liNome);
        mostraP.appendChild(imgCapa);
        mostraP.appendChild(linkInterno)
        linkP.appendChild(mostraP)

        lista.appendChild(linkP)

        
        
    })


}
mostrarPoliticos()

function emOrdem(nomeOne, nometwo) {

}