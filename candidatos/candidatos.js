const candidatosC = document.querySelector('.candidatosC')

const geraCandidatos = async () => {
    const url = '/candidatos/eleicao'
    const resp = await fetch(url)
    const data = await resp.json()
    localStorage.setItem('candidatos', JSON.stringify(data))
    candidatosC.innerHTML = ``
    data.forEach(element => {
        candidatosC.innerHTML += `<div onclick="selecionaCandidato(${element.numero})>
                            <abbr title="${element.urna}"><a href="#showCandidato"><img onclick="selecionaCandidato(${element.numero})"  src="/candidatos/${element.numero}-min.png" alt="${element.numero}"></a></abbr>
                        </div>`
    });
}
function selecionaCandidato(numb) {
    const data = JSON.parse(localStorage.getItem('candidatos'))

    data.forEach((e) => {
        if(e.numero == numb){
            showCandidato.src = `/candidatos/${e.numero}.png`
            showCandidato.alt = `${e.numero} - ${e.urna}`
        }
    })

}
geraCandidatos()