const numeroDigitado = document.querySelectorAll('.botoes div')
const numeroUrna = document.querySelectorAll('.numeroUrna div')
const tic = new Audio('./tic.wav')
for (let i = 0; i < numeroDigitado.length; i++) {
    numeroDigitado[i].addEventListener('click', () => {

        if (numeroUrna[0].innerHTML == '') {
            numeroUrna[0].textContent = numeroDigitado[i].innerHTML
            tic.play()
        } else if (numeroUrna[1].innerHTML == '') {
            numeroUrna[1].textContent = numeroDigitado[i].innerHTML
            tic.play()
        } else if (numeroUrna[2].innerHTML == '') {
            numeroUrna[2].textContent = numeroDigitado[i].innerHTML
            tic.play()
        } else {
            document.querySelector('.nomeC').textContent = 'APERTE CORRIGE PARA INSERIR NOVAMENTE'
        }
    })
}

document.querySelectorAll('.ccc div')[1].addEventListener('click', () => {
    nomeU.textContent = ""
    for (let index = 0; index < numeroUrna.length; index++) {
        numeroUrna[index].innerHTML = ''
        document.querySelector('#nomeU').innerHTML = 'CANDIDATO'


    }
    document.querySelector('.nomeC').textContent = 'NOME'
})
document.querySelectorAll('.ccc div')[0].addEventListener('click', () => {
    const tic = new Audio('./titi.wav')
    for (let index = 0; index < numeroUrna.length; index++) {
        numeroUrna[index].innerHTML = '0'


    }
    tic.play()

})

document.querySelectorAll('.ccc div')[2].addEventListener('click', () => {
    const numerosUR = `${numeroUrna[0].innerHTML}${numeroUrna[1].innerHTML}${numeroUrna[2].innerHTML}`
    const nomeUrnaVerifica = document.querySelector('.nomeC').textContent
    const oNomeNaUrna = document.querySelector('#nomeU').textContent


    if (numerosUR.toString().length >= 3 && nomeUrnaVerifica != 'APERTE CORRIGE PARA INSERIR NOVAMENTE' && nomeUrnaVerifica != 'NOME')  {

        new Audio('./tictic.wav').play()
        document.querySelector('.ofim').style.display = 'block'
        document.querySelector('.numeroP').style.display = 'none'
        nomeCompletoC.value = nomeUrnaVerifica;
        numeroUrC.value = numerosUR
        nomeurnaC.value = oNomeNaUrna
        setTimeout('enviarResutVotacao()', 2000)
       

    }

})

function enviarResutVotacao() {
    const formulario = document.querySelector('#enviarResultado')
    formulario.submit();
}

document.addEventListener('click', () => {
    const numeroInseridoNaUrna = `${numeroUrna[0].innerHTML}${numeroUrna[1].innerHTML}${numeroUrna[2].innerHTML}`
    insereCandidato(numeroInseridoNaUrna)
    fazPiscar()
})

async function insereCandidato(numero) {
    const response = await fetch('./candidatos')
    const data = await response.json()

    if (numero.toString().length == 3) {

        data.map((candidato) => {

            if (numero == candidato.numero) {
                new Audio('./achou.wav').play()

                imgUrna.src = `./${numero}-min.jpg`

                nomeU.textContent = candidato.nome
                document.querySelector('.nomeC').textContent = candidato.nomecompleto
            }
            if (numero == '000') {
                imgUrna.src = `./${numero}-min.jpg`

                nomeU.textContent = "BRANCO"
                document.querySelector('.nomeC').textContent = "VOTO EM BRANCO"
            }


        })


    } else {
        imgUrna.src = `./tela-min.jpg`
    }


}

document.querySelectorAll('h1')[0].addEventListener('click', () => {
    document.querySelector('#listaCC').classList.toggle('dnone')
    document.querySelector('.mostraC').innerHTML = ''
})
document.querySelectorAll('.candidatos div')[0].addEventListener('click', () => {
    document.querySelector('#listaCC').classList.toggle('dnone')
    geradorDecandidatos()
})

function clickCandidato() {
    const canditadosVisto = document.querySelectorAll('.faceCandidato')


    for (let i = 0; i < canditadosVisto.length; i++) {
        canditadosVisto[i].addEventListener('click', () => {
            new Audio('./tictictic.wav').play()
            const insereNumeroUrna = canditadosVisto[i].querySelector('.numeroUrnaH2').innerHTML
            const numeraisU = insereNumeroUrna.split('')
            numeroUrna[0].textContent = numeraisU[0]
            numeroUrna[1].textContent = numeraisU[1]
            numeroUrna[2].textContent = numeraisU[2]
            console.log('numeraisU')
            document.querySelector('.mostraC').innerHTML = ''
            document.querySelector('#listaCC').classList.toggle('dnone')

        })

    }
}




async function geradorDecandidatos() {
    const response = await fetch('./candidatos')
    const data = await response.json()

    data.map((mc) => {
        document.querySelector('.mostraC').innerHTML += `<div class="faceCandidato">
        <img src="./${mc.numero}.png" alt="">
        <div>
            <h3>${mc.nome}</h3>
            <h2 class="numeroUrnaH2">${mc.numero}</h2>
        </div>
    </div>`
    })
    clickCandidato()
}

function fechaCC() {
    const imagemD = document.querySelector('#imgDoC')
    imagemD.classList.toggle('dnone')
}

async function abreImgCandidato() {
    const response = await fetch('./candidatos')
    const data = await response.json()

        const imagemD = document.querySelector('#imgDoC')
        const imgTroca = document.querySelector('#imgUrna').src.split('/')[4].replace(/-min.jpg/g, '.png')
        //replace(/-min.jpg/g, '.png')
        imagemD.classList.toggle('dnone')
        console.log(imgTroca)
        document.querySelector('#imgSub').src = `./img/${imgTroca}` 
        const nUrna = `${numeroUrna[0].innerHTML}${numeroUrna[1].innerHTML}${numeroUrna[2].innerHTML}`

        data.map((p) => {
            if(nUrna == p.numero) {
                nomeCC.textContent = p.nomecompleto.toUpperCase()
                if(p.proposta.length > 0){
                    propostaDoCandidato.innerHTML = p.proposta
                } else {
                    //propostaDoCandidato.innerHTML = p.proposta
                }
                
            }
        })

}
async function Votados() {
    const response = await fetch('./candidatos')
    const data = await response.json()
    var somaVotos = 0
    for(let i = 0; i < data.length; i++){
         somaVotos = somaVotos + data[i].votos
        console.log(data[i].votos)
       
    }
    data.sort(function (a, b) {
        if (a.votos > b.votos) {
          return -1;
        }
        if (a.votos < b.votos) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
    data.map((c) => {
        const porc = Math.floor((c.votos * 100) / somaVotos)
        if(porc > 10){
            var calcPorcentagem = 10
        }
        console.log(porc)
        document.querySelector('.votos').innerHTML += `<div class="faceCandidato">
        <img src="./${c.numero}-min.jpg" alt="">
        <div>
            <div style="width: ${porc * 2}%; height: 20px; background-color: rgb(105, 255, 60); border-radius: 8px;"></div>
            <h3 class="numeroUrnaH2">${c.votos} VOTOS</h3>
            <h6>${c.nome}</h6>
        </div>
    </div>`
    })
    document.querySelector('.votos').innerHTML += `<h3 class="numeroUrnaH2">A contagem da votação será adicionada a cada 2 dias ou assim que disponível</h3>`
}


function fechaVotos() {
    document.querySelector('.votos').innerHTML = ``
    document.querySelector('#votosOn').classList.toggle('dnone')
    Votados()
}

function fazPiscar() {
    if(numeroUrna[0].innerHTML.toString().length == 0){
        numeroUrna[0].classList.add('pisca')
    } else if (numeroUrna[1].innerHTML.toString().length == 0){
        numeroUrna[0].classList.remove('pisca')
        numeroUrna[1].classList.add('pisca')
    } else if (numeroUrna[2].innerHTML.toString().length == 0){
        numeroUrna[0].classList.remove('pisca')
        numeroUrna[1].classList.remove('pisca')
        numeroUrna[2].classList.add('pisca')        
    } else {
        numeroUrna[0].classList.remove('pisca')
        numeroUrna[1].classList.remove('pisca')
        numeroUrna[2].classList.remove('pisca')      
    }
    // numeroUrna[0].classList.add('pisca')
}
fazPiscar()
