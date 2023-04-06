async function geraArtigo() {
    const url = "./blog"
    const response = await fetch(url);
    const data = await response.json();
    var apresentaBlog = document.querySelector('#posts')

    data.map((artigo, index) => {
        const divTitleArtigo = document.createElement('div')
        const divClassArtigo = document.createElement('div');
        divClassArtigo.setAttribute('class', 'buttonVer');
        divClassArtigo.setAttribute('id', `divB${index}`)

        const addButton = document.createElement('button');
        addButton.setAttribute('onclick', `blogArquive(${index})`)
        addButton.innerHTML = `<h2>${artigo.titulo}</h2> ${index + 1} &#8505;`
        addButton.setAttribute('id', `btn${index}`)
        const divDoPost = document.createElement('div')
        divDoPost.setAttribute('id', `post${index}`)

        divClassArtigo.appendChild(addButton)
        divTitleArtigo.appendChild(divClassArtigo)
        divTitleArtigo.appendChild(divDoPost)
        apresentaBlog.appendChild(divTitleArtigo)

    })


}
geraArtigo()




async function blogArquive(numb) {
    const url = "./blog"
    const response = await fetch(url);
    const data = await response.json();
    var apresentaBlog = document.querySelector(`#post${numb}`)
    console.log(data[numb].corpo.split('.'))

    const btnM = document.querySelector(`#btn${numb}`)
    btnM.setAttribute('onclick', `apagaArtigo(${numb})`)



    var paragrafoOne = []
    var paragrafoTwo = []
    var paragrafoTree = []
    const verCorpo = data[numb].corpo.split('.')
    if (verCorpo.length % 2 == 0) {
        const dividePar = verCorpo.length / 2
        console.log(dividePar)
        for (let i = 0; i < verCorpo.length; i++) {

            if (i < dividePar) {
                paragrafoOne.push(verCorpo[i] + ".")
            }
            if (i >= dividePar && i < dividePar * 2) {
                paragrafoTwo.push(verCorpo[i] + ".")
            }
            if (i >= dividePar * 2 && i < verCorpo.length) {
                paragrafoTree.push(verCorpo[i] + ".")
            }
        }
    } else {
        const divideImpar = verCorpo.length / 3
        console.log(divideImpar)
        for (let i = 0; i < verCorpo.length; i++) {

            if (i < divideImpar) {
                paragrafoOne.push(verCorpo[i] + ".")
            }
            if (i >= divideImpar && i < divideImpar * 2) {
                paragrafoTwo.push(verCorpo[i] + ".")
            }
            if (i >= divideImpar * 2 && i < verCorpo.length) {
                paragrafoTree.push(verCorpo[i] + ".")
            }

        }
    }

    const divBlog = document.createElement('div');
    divBlog.classList.add('blog')
   
    const addTitle = document.createElement('h2');
    addTitle.textContent = data[numb].titulo;
    const corpoTexto = document.createElement('p')
    corpoTexto.innerHTML = `<p>${JSON.stringify(paragrafoOne).replace(/\["/gi, '').replace(/","/gi, '').replace(/"]/gi, '')}</p> 
        <p>${JSON.stringify(paragrafoTwo).replace(/\["/gi, '').replace(/","/gi, '').replace(/"]/gi, '')}</p>
        <p>${JSON.stringify(paragrafoTree).replace(/\["/gi, '').replace(/","/gi, '').replace(/"]/gi, '')}</p>`
    var imagensDoArtigo = document.createElement('div')

    for (let im = 0; im < data[numb].imagens.length; im++) {
        var imagensSite = document.createElement('img');
        imagensSite.src += data[numb].imagens[im]
        imagensDoArtigo.appendChild(imagensSite)
    }
    divBlog.appendChild(addTitle)
    divBlog.appendChild(corpoTexto)
    divBlog.appendChild(imagensDoArtigo)
    apresentaBlog.appendChild(divBlog)

    document.querySelector(`#post${numb}`)
    const DivbtnM = document.querySelector(`#divB${numb}`)
    DivbtnM.classList.toggle('buttonCima')


}



function apagaArtigo(numbArtigo) {
    const telaArtigo = document.querySelector(`#post${numbArtigo}`)
    telaArtigo.innerHTML = ''
    const btnM = document.querySelector(`#btn${numbArtigo}`)
    btnM.setAttribute('onclick', `blogArquive(${numbArtigo})`)
    const DivbtnM = document.querySelector(`#divB${numbArtigo}`)
    DivbtnM.classList.toggle('buttonCima')



    //console.log(telaArtigo)
}