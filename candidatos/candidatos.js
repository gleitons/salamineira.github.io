

const geC = async () => {
    const url = '/candidatos/eleicao'
    const resp = await fetch(url)
    const data = await resp.json()
    localStorage.setItem('candidatos', JSON.stringify(data))

}
geC()
const candidatosC = document.querySelector('.candidatosC')

const geraCandidatos = async () => {
    await geC()
    ///candidatos/${element.numero}-min-min.png
    const dosItens = localStorage.getItem('candidatos')

    const data = JSON.parse(dosItens)
    candidatosC.innerHTML = ``
    data.forEach(element => {
        console.log(element.proposta)
        if(element.proposta == 'e') {            
            const divC = document.createElement('div')
            divC.innerHTML = `<abbr class="oabbr"   title="${element.urna} - ${element.numero}"><a href="#showCandidato"><p class="eleito">E <i class="bi bi-check"></i></p>
            <img onclick="selecionaCandidato(${element.numero})" id=${element.numero} src="/candidatos/${element.numero}.jpg" alt="${element.numero}">
            <p class="onumb">${element.numero.toString().split('.')[0]}</a></abbr>`
            candidatosC.appendChild(divC)
        } else {
            const divC = document.createElement('div')
            divC.innerHTML = `<abbr class="oabbr"   title="${element.urna} - ${element.numero}"><a href="#showCandidato">
            <img onclick="selecionaCandidato(${element.numero})" id=${element.numero} src="/candidatos/${element.numero}.jpg" alt="${element.numero}">
            <p class="onumb">${element.numero.toString().split('.')[0]}</a></abbr>`
            candidatosC.appendChild(divC)
        }

    });

    const ccarregaImagns = document.querySelector('.ccarregaImagns')
    data.forEach(e => {
        const im = document.createElement('img')
        im.src = '/candidatos/' + e.numero + '.png';
        im.alt = e.numero
        console.log(im)
        ccarregaImagns.appendChild(im)
    })
    ccarregaImagns.style.display = 'none'

}

geraCandidatos()
function checkImageExists(url, callback) {
    const img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = url;
}
function retiraPisca() {
    const imgs = document.querySelectorAll('.oabbr a img')
    
    for (let index = 0; index < imgs.length; index++) {
        const element = imgs[index];
        if(element.className == 'piscas') {
            console.log(element.className)
            element.classList.remove('piscas')

        }
    }
}
const carreg = document.querySelector('.carreg')
function piscaCan(numero) {
    const docNumero = document.getElementById(numero)
   
    docNumero.classList.add('piscas')
}
function selecionaCandidato(numb) {
    retiraPisca()
    carreg.style.display = "block"
    const data = JSON.parse(localStorage.getItem('candidatos'))
    const doIdBtn = document.querySelector("#doIdBtn")
    data.forEach((e) => {
        if (e.numero == numb) {
            doIdBtn.setAttribute('href', `#${e.numero}`)
            piscaCan(e.numero)
            const showCand = document.querySelector(`.showCand`)
            showCand.innerHTML = ''
            for (let index = 0; index < 10; index++) {
                const valor = index == 0 ? '' : '-' + index;
                checkImageExists(`/candidatos/${e.numero}${valor}.png`, function (exists) {
                    if (exists) {
                        const imgCC = document.createElement('img')
                        imgCC.src = `/candidatos/${e.numero}${valor}.png`
                        imgCC.alt = `${e.numero} - ${e.nome}`
                        showCand.appendChild(imgCC)
                    }
                    // } else {
                    //     // console.log('A imagem não existe!');
                    // }
                });


            }


        }
    })
    carreg.style.display = "none";

}

geraCandidatos()

