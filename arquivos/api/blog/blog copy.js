async function geraArtigo() {
    const url = "./blog"
    const response = await fetch(url);
    const data = await response.json();
    var apresentaBlog = document.querySelector('#posts')

    data.map((artigo, index) => {
        const divTitleArtigo = document.createElement('div')
        const divClassArtigo = document.createElement('div');
        divClassArtigo.classList.add('buttonVer');
        const addButton = document.createElement('button');
        addButton.setAttribute('onclick', `blogArquive(${index})`)
        addButton.innerHTML = `Title Artigo Blog <i class="bi bi-arrow-down-right-circle-fill"></i>`
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
    //console.log(data)


    //data.map((blog) => {
        var paragrafoOne = []
        var paragrafoTwo = []
        var paragrafoTree = []
        const verCorpo = blog.corpo.split('.')
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

            //console.log()
            //console.log(JSON.stringify(paragrafoTwo).replace(/\["/gi, '').replace(/","/gi, '').replace(/"]/gi, ''))
            //console.log(JSON.stringify(paragrafoTree).replace(/\["/gi, '').replace(/","/gi, '').replace(/"]/gi, ''))
        }

        const divBlog = document.createElement('div');
        divBlog.classList.add('blog')
        const addTitle = document.createElement('h2');
        addTitle.textContent = blog.titulo;
        const corpoTexto = document.createElement('p')
        corpoTexto.innerHTML = `<p>${JSON.stringify(paragrafoOne).replace(/\["/gi, '').replace(/","/gi, '').replace(/"]/gi, '')}</p> 
        <p>${JSON.stringify(paragrafoTwo).replace(/\["/gi, '').replace(/","/gi, '').replace(/"]/gi, '')}</p>
        <p>${JSON.stringify(paragrafoTree).replace(/\["/gi, '').replace(/","/gi, '').replace(/"]/gi, '')}</p>`
        var imagensDoArtigo = document.createElement('div')

        for (let im = 0; im < blog.imagens.length; im++) {
            var imagensSite = document.createElement('img');
            imagensSite.src += blog.imagens[im]
            imagensDoArtigo.appendChild(imagensSite)
        }

        // var asTags = document.querySelector('div')
        // for(let ta = 0; ta < blog.tags.length; ta++){

        //     var aTag = document.createElement('p');
        //     aTag.innerHTML = blog.tags[ta] 
        //     console.log(aTag)           
        //     asTags.appendChild(aTag)
        // }
        // console.log(asTags)
        divBlog.appendChild(addTitle)
        divBlog.appendChild(corpoTexto)
        divBlog.appendChild(imagensDoArtigo)
        //divBlog.appendChild(asTags)
        apresentaBlog.appendChild(divBlog)
    //})

}



//blogArquive()