async function geraIcones() {
    const response = await fetch('./icons')
    const data = await response.json()
    const atalhosTela = document.querySelector('.iconsSeleciona')
    data.map((e) => {
        atalhosTela.innerHTML += `<img src="https://ialkyrog.sirv.com/sala/icones/${e}" alt="">`

    })
    SelectIcon()
}
geraIcones()

if (document.querySelector('#editarIconeS') != null) {
    loadIconesTop()
}
function loadIconesTop() {
    const data = JSON.parse(localStorage.getItem('todosAtalhos'))
    data.map((e) => {
        editarIconeS.innerHTML += `<option>${e.texto}</option>`
    })
}
function carregaIconsEditar() {
    const seleciona = document.querySelector('select#editarIconeS').selectedIndex - 1
    const data = JSON.parse(localStorage.getItem('todosAtalhos'))
    linkDoAtalho.value = data[seleciona].link
    nomeIcones.value = data[seleciona].texto
    document.querySelector('.atalhosTela img').src = data[seleciona].imagem
    document.querySelector('.atalhosTela p').textContent = data[seleciona].texto
    numberIcon.value = data[seleciona].id
}
function atualizadorDeIcone() {
    const nomeIcone = document.querySelector('#nomeIcone')
    const imgIcone = document.querySelector('.atalhosTela img').src
    const linkIcon = document.querySelector('#linkDoAtalho')
    const data = JSON.parse(localStorage.getItem('todosAtalhos'))

    const imgPadrao = './src/img/icons/vendedor.png'

    console.log(nomeIcone.value)
    console.log(imgIcone == imgPadrao)
    console.log(linkIcon.value)

    if (nomeIcone.value.length <= 0 || linkIcon.value.length <= 0) {
        alert('Preencha Todos os campos')
    } else {
        const oLink = linkIcon.value.toString()
        console.log(oLink.includes('https://'))
        if (oLink.includes('https://')) {
            var LinkDoIcone = oLink
        } else {
            var LinkDoIcone = `https://${oLink}`
        }

        const editarIcone = data
        const addIcons = {
            "id": data.length + 1,
            "imagem": `${imgIcone}`,
            "texto": `${nomeIcone.value}`,
            "link": `${LinkDoIcone}`
        }
        data.push(addIcons)
        localStorage.setItem('todosAtalhos', JSON.stringify(data))
        alert('ATALHO CADASTRADO COM SUCESSO!!')
        location.reload()
    }
}
function nomeIcone() {
    const inputIcone = document.querySelector('#nomeIcone').value
    const atalhosTela = document.querySelector('.atalhosTela p')
    atalhosTela.textContent = inputIcone
    executaixiBum()

}
function SelectIcon() {
    const iconsSeleciona = document.querySelectorAll('.iconsSeleciona img')
    const proto = location.protocol + '//'
    const host = location.host

    const link = proto + host

    console.log(link)

    iconsSeleciona.forEach((e) => {
        e.addEventListener('click', () => {
            const imgReload = e.src.replace(link, '')
            console.log(imgReload)
            const atalhosTela = document.querySelector('.atalhosTela img')
            atalhosTela.src = imgReload
            executaixiBum()
        })
    })
}

function executaixiBum() {
    const atalhosTela = document.querySelector('.atalhosTela')
    atalhosTela.classList.add('ixiBum')
    setTimeout('tiraIxim()', 400)
}
function tiraIxim() {
    const atalhosTela = document.querySelector('.atalhosTela')
    atalhosTela.classList.remove('ixiBum')

}

function geradorDeIcone() {

    const nomeIcone = document.querySelector('#nomeIcone')
    const imgIcone = document.querySelector('.atalhosTela img').src
    const linkIcon = document.querySelector('#linkDoAtalho')
    const data = JSON.parse(localStorage.getItem('todosAtalhos'))

    const imgPadrao = './src/img/icons/vendedor.png'

    console.log(nomeIcone.value)
    console.log(imgIcone == imgPadrao)
    console.log(linkIcon.value)

    if (nomeIcone.value.length <= 0 || linkIcon.value.length <= 0) {
        alert('Preencha Todos os campos')
    } else {
        const oLink = linkIcon.value.toString()
        console.log(oLink.includes('https://'))
        if (oLink.includes('https://')) {
            var LinkDoIcone = oLink
        } else {
            var LinkDoIcone = `https://${oLink}`
        }

        const addIcons = {
            "id": data.length + 1,
            "imagem": `${imgIcone}`,
            "texto": `${nomeIcone.value}`,
            "link": `${LinkDoIcone}`
        }
        data.push(addIcons)
        localStorage.setItem('todosAtalhos', JSON.stringify(data))
        alert('ATALHO CADASTRADO COM SUCESSO!!')
        location.reload()
    }



}