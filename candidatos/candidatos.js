

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
  
    const dosItens = localStorage.getItem('candidatos')     
    
    const data =  JSON.parse(dosItens)
    candidatosC.innerHTML = ``
    data.forEach(element => {
        const divC = document.createElement('div')
        divC.innerHTML = `<abbr title="${element.urna} - ${element.numero}"><a href="#showCandidato"><img onmouseenter="selecionaCandidato(${element.numero})"  src="/candidatos/${element.numero}-min.png" alt="${element.numero}"></a></abbr>`

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
function selecionaCandidato(numb) {
    const data = JSON.parse(localStorage.getItem('candidatos'))

    data.forEach((e) => {
        if (e.numero == numb) {
            const showCand = document.querySelector(`.showCand`)
            showCand.innerHTML = ''
            for (let index = 0; index < 4; index++) {
                const valor = index == 0 ? '' : '-' + index;
                checkImageExists(`/candidatos/${e.numero}${valor}.png`, function (exists) {
                    if (exists) {
                        const imgCC = document.createElement('img')
                        imgCC.src = `/candidatos/${e.numero}${valor}.png`
                        imgCC.alt = `${e.numero} - ${e.nome}`
                        showCand.appendChild(imgCC)
                    } else {
                        console.log('A imagem não existe!');
                    }
                });

            }

            const img1 =
                console.log(img1.status())
            showCandidato.alt = `${e.numero} - ${e.urna}`

            showCandidato2.src = `/candidatos/${e.numero}-2.png`
            showCandidato2.alt = `${e.numero} - ${e.urna} `
            showCandidato3.src = `/candidatos/${e.numero}-3.png`
            showCandidato3.alt = `${e.numero} - ${e.urna}`
            showCandidato4.src = `/candidatos/${e.numero}-3.png`
            showCandidato4.alt = `${e.numero} - ${e.urna}`
        }
    })

}

geraCandidatos()

