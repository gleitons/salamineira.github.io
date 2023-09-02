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
const verResultadoVotacao = window.location.hash
if(verResultadoVotacao == "#resultadourna") {
    fechaVotos()
    console.log('gerou')
}

console.log(verResultadoVotacao)

document.querySelectorAll('.ccc div')[2].addEventListener('click', () => {
    const numerosUR = `${numeroUrna[0].innerHTML}${numeroUrna[1].innerHTML}${numeroUrna[2].innerHTML}`
    const nomeUrnaVerifica = document.querySelector('.nomeC').textContent
    const oNomeNaUrna = document.querySelector('#nomeU').textContent


    if (numerosUR.toString().length >= 3 && nomeUrnaVerifica != 'APERTE CORRIGE PARA INSERIR NOVAMENTE' && nomeUrnaVerifica != 'NOME') {

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
    salvaHorarioVotado()
    localStorage.setItem('bloquearVotacao', '1')
    formulario.submit();
}

document.addEventListener('click', () => {
    const numeroInseridoNaUrna = `${numeroUrna[0].innerHTML}${numeroUrna[1].innerHTML}${numeroUrna[2].innerHTML}`
    insereCandidato(numeroInseridoNaUrna)
    fazPiscar()
    preAbreImgCandidato()
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
    const imgT = document.querySelector('#imgUrna').src.split('/')[4]
    //replace(/-min.jpg/g, '.png')

    if (imgTroca != 'tela.png') {
        imagemD.classList.toggle('dnone')

        document.querySelector('#imgSub').src = `./img/${imgTroca}`
        const nUrna = `${numeroUrna[0].innerHTML}${numeroUrna[1].innerHTML}${numeroUrna[2].innerHTML}`

        data.map((p) => {
            if (nUrna == p.numero) {
                nomeCC.textContent = p.nomecompleto.toUpperCase()
                if (p.proposta.length > 0) {
                    propostaDoCandidato.innerHTML = p.proposta
                } else {
                    //propostaDoCandidato.innerHTML = p.proposta
                }

            }
        })
    }


}
async function preAbreImgCandidato() {
    const response = await fetch('./candidatos')
    const data = await response.json()


    data.map((p) => {
        document.querySelector('.preload').innerHTML += `<img src="./img/${p.numero}.png" alt="">`
    })
    document.querySelector('.preload').innerHTML = ''
    //document.querySelector('.preload').classList.add('dnone')



}
function loadAtualiza() {
    window.location.href = 'https://salamineira.com/conselho-2023/#resultadourna'
}
async function Votados() {
   // document.querySelector('.votos').innerHTML = ''
    const response = await fetch('./candidatos')
   // const data = await response.json()
    const datad = await response.json()
    const votoreal = await JSON.parse(localStorage.getItem('votos'))
    
    var somaVotos =  200

    
    var todosVotos = []
    for (let index = 0; index < datad.length; index++) {

        const candiD = {
            "nome": datad[index].nome,
            "nomecompleto": datad[index].nomecompleto,
            "numero": datad[index].numero,
            "imagem": `./${ datad[index].numero}.png`,
            "votos":JSON.stringify(votoreal[index]).replace(/[^0-9]/gi, '')
        }
        todosVotos.push(candiD)
      
        
    }
   

   
   const data = todosVotos

  

    

    data.sort(function (a, b) {
        if (parseInt(a.votos) > parseInt(b.votos)) {
            return -1;
        }
        if (a.votos < b.votos) {
            return 1;
        }
        // a must be equal to b
        return 0;
    });

   

    data.map((c, index) => {
        const porc = Math.floor((c.votos * 100) / somaVotos)
        if (porc > 10) {
            var calcPorcentagem = 10
        }
        document.querySelector('.votos').innerHTML += `<div class="faceCandidato">
        <img src="./${c.numero}-min.jpg" alt="">
        <div>
            <div style="width: ${porc * 2}%; height: 20px; background-color: rgb(105, 255, 60); border-radius: 2px;"></div>
            <h3 class="numeroUrnaH2">${c.votos} VOTOS</h3>
            <h6>${c.nome}</h6>
        </div>
    </div>`
    


    })
    document.querySelector('.votos').innerHTML += `<h3 class="numeroUrnaH2">ESTAMOS AGUARDANDO A LIBERAÇÃO DA ENQUETE</h3><button onclick="loadAtualiza()" >Clique aqui para atualizar</button>
    `
}
Votados()

function fechaVotos() {
    document.querySelector('.votos').innerHTML = ``
    document.querySelector('#votosOn').classList.toggle('dnone')
    Votados()
}


function fazPiscar() {
    if (numeroUrna[0].innerHTML.toString().length == 0) {
        numeroUrna[0].classList.add('pisca')
    } else if (numeroUrna[1].innerHTML.toString().length == 0) {
        numeroUrna[0].classList.remove('pisca')
        numeroUrna[1].classList.add('pisca')
    } else if (numeroUrna[2].innerHTML.toString().length == 0) {
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

function aguardaVotar() {
    const data = new Date();
    const tempoPassado = new Date(data - new Date(localStorage.getItem('horaAtual'))).getMinutes()
    const tempoMostrador = 30



    document.querySelector('#horaC').textContent = parseInt(tempoPassado - tempoMostrador) * (-1) + ' Min'
    const valorSobrando = ((parseInt(tempoMostrador) - parseInt(tempoPassado)))

    if (localStorage.getItem('bloquearVotacao') == '1') {
        document.querySelector('#timeVoto').style.display = 'block'
        if (valorSobrando <= 0) {
            localStorage.setItem('bloquearVotacao', '0')

        }

    } else {
        document.querySelector('#timeVoto').style.display = 'none'
    }


}

setInterval('aguardaVotar()', 3000)

aguardaVotar()
function salvaHorarioVotado() {
    const data = new Date();
    localStorage.setItem('horaAtual', data)
}
//salvaHorarioVotado()