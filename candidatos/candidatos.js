

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
        const divC = document.createElement('div')
        divC.innerHTML = `<abbr title="${element.urna} - ${element.numero}"><a href="#showCandidato"><img onclick="selecionaCandidato(${element.numero})"  src="/candidatos/${element.numero}.jpg" alt="${element.numero}"></a></abbr>`

        candidatosC.appendChild(divC)
    });
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
const carreg = document.querySelector('.carreg')
function selecionaCandidato(numb) {
    carreg.style.display = "block"
    const data = JSON.parse(localStorage.getItem('candidatos'))

    data.forEach((e) => {
        if (e.numero == numb) {
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

