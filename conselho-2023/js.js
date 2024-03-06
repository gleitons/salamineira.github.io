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
if (verResultadoVotacao == "#resultadourna") {
    fechaVotos()


}


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
        setTimeout('enviarResutVotacao()', 1000)



    }

})

function enviarResutVotacao() {
    const formulario = document.querySelector('#enviarResultado')
    salvaHorarioVotado()
    localStorage.setItem('bloquearVotacao', '1')
    formulario.submit();
    //setTimeout(window.location.href = './', 3000)


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
                const propostaOnline = p.proposta.toString()
                if (propostaOnline.length > 0) {
                    propostaDoCandidato.innerHTML = p.proposta
                } else {
                    propostaDoCandidato.innerHTML = `<h2>Ainda sem Proposta Anexa</h2> <h3>Conselho Tutelar</h3> <p>É um órgão público municipal, que tem sua origem na lei, integrando-se ao conjunto das instituições nacionais e subordinando-se ao ordenamento jurídico brasileiro. Criado por Lei Municipal e efetivamente implantado, passa a integrar de forma definitiva o quadro das instituições municipais. Desenvolve uma ação contínua e ininterrupta. Sua ação não deve sofrer solução de continuidade, sob qualquer pretexto. Uma vez criado e implantado, não desaparece; apenas renovam-se os seus membros.</p> <p>Não depende de autorização de ninguém - nem do Prefeito, nem do Juiz - para o exercício das atribuições legais que lhe foram conferidas pelo Estatuto da Criança e do Adolescente: artigos 136, 95, 101 (I a VII) e 129 (I a VII). Em matéria técnica de sua competência, delibera e age, aplicando as medidas práticas pertinentes, sem interferência externa. Exerce suas funções com independência, inclusive para denunciar e corrigir distorções existentes na própria administração municipal relativas ao atendimento às crianças e adolescentes. Suas decisões só podem ser revistas pelo Juiz da Infância e da Juventude, a partir de requerimento daquele que se sentir prejudicado.</p>`
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
    document.querySelector('.votos').innerHTML = ''
    const response = await fetch('./candidatos')
    // const data = await response.json()
    const datad = await response.json()
    const votoreal = await JSON.parse(localStorage.getItem('votos'))

    


    var todosVotos = []
    for (let index = 0; index < datad.length; index++) {
        const candiD = {
            "nome": datad[index].nome,
            "nomecompleto": datad[index].nomecompleto,
            "numero": datad[index].numero,
            "imagem": `./${datad[index].numero}.png`,
            "votos": JSON.stringify(votoreal[index]).replace(/[^0-9]/gi, '')
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
    var somaVotos = data[0].votos * 2
    data.map((c, index) => {
        const porc = Math.floor((c.votos * 100) / somaVotos)
        if (porc > 10) {
            var calcPorcentagem = 10
        }
        const posit = index + 1
        const resultadoPost = posit <= 5 ? 'block' : 'none';
        document.querySelector('.votos').innerHTML += `<div class="faceCandidato " >
        <img src="./${c.numero}-min.jpg" alt="">
        <div>
            <div style="width: ${porc * 2}%; height: 20px; background-color: rgb(105, 255, 60); border-radius: 2px;"></div>
            <h3 class="numeroUrnaH2">${c.votos} VOTOS</h3>
            <h6>${c.nome}</h6>
        </div>
        <p class="colocacao">${posit}</p>
        <img class="vencedor" style="display:${resultadoPost};" src="./vencedor-min.png" alt="vencedor">
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
    setTimeout('atencao()', 1000)
   

}
if (localStorage.getItem('aceitatermos') == 'sim') {
    document.querySelector('#termos').classList.add('dnone')
} else {
    document.querySelector('#termos').classList.remove('dnone')
}

function aceitatermos() {
    //document.querySelector('.votos').innerHTML = ``
    localStorage.setItem('aceitatermos', 'nao')
    document.querySelector('#termos').classList.toggle('dnone')
    // if(localStorage.getItem('aceitatermos') == null) {

    // }
    //location.reload()


    // Votados()
    // setTimeout('atencao()', 1000)

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

            document.querySelectorAll('.ccc div')[2].style.visibility = 'visible'
            location.reload()


        }
        document.querySelectorAll('.ccc div')[2].style.visibility = 'hidden'

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
/**  
 noback v0.0.1 
 library for prevent backbutton 
 Author: Kiko Mesquita: http://twitter.com/kikomesquita 
 Based on stackoverflow 
 * Copyright (c) 2015 @ kikomesquita 
*/

(function (window) {
    'use strict';

    var noback = {

        //globals 
        version: '0.0.1',
        history_api: typeof history.pushState !== 'undefined',

        init: function () {
            window.location.hash = '#no-back';
            noback.configure();
        },

        hasChanged: function () {
            if (window.location.hash == '#no-back') {
                window.location.hash = '#BLOQUEIO';
                //mostra mensagem que não pode usar o btn volta do browser
                if ($("#msgAviso").css('display') == 'none') {
                    $("#msgAviso").slideToggle("slow");
                }
            }
        },

        checkCompat: function () {
            if (window.addEventListener) {
                window.addEventListener("hashchange", noback.hasChanged, false);
            } else if (window.attachEvent) {
                window.attachEvent("onhashchange", noback.hasChanged);
            } else {
                window.onhashchange = noback.hasChanged;
            }
        },

        configure: function () {
            if (window.location.hash == '#no-back') {
                if (this.history_api) {
                    history.pushState(null, '', '#BLOQUEIO');
                } else {
                    window.location.hash = '#BLOQUEIO';
                    //mostra mensagem que não pode usar o btn volta do browser
                    if ($("#msgAviso").css('display') == 'none') {
                        $("#msgAviso").slideToggle("slow");
                    }
                }
            }
            noback.checkCompat();
            noback.hasChanged();
        }

    };

    // AMD support 
    if (typeof define === 'function' && define.amd) {
        define(function () { return noback; });
    }
    // For CommonJS and CommonJS-like 
    else if (typeof module === 'object' && module.exports) {
        module.exports = noback;
    }
    else {
        window.noback = noback;
    }
    noback.init();
}(window));

function atencao() {
    const faceCandMostra = document.querySelectorAll('.faceCandidato')
  
    for (let i = 0; i < faceCandMostra.length; i++) {
        faceCandMostra[i].addEventListener('click', () => {
          
            document.querySelector('#fechavv').classList.add('avisaS')
            document.querySelector('#fechavv').style.backgroundColor = 'red'
        })
    }

}


// var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
// fs(window.TEMPORARY, 10, function () {
//     document.querySelector('#anonimo').classList.add('dnone')
//     console.log("Aba normal");
// }, function (error) {
//     document.querySelector('#anonimo').classList.remove('dnone')
//     console.log("Aba anônima");
// });



// function fogos() {
//     //<![CDATA[
// // Fuegos artificiales
// var bits=200; // Número de pontos
// var intensity=10; // Intensidade da explosao (recomendado entre 3 e 10)
// var speed=30; // Velocidade (qnto menor for o numero, mais rapido)
// var colours=new Array("#03f", "#f03", "#0e0", "#93f", "#0cc", "#f93");
// // Cores dos fogos

// var dx, xpos, ypos, bangheight;
// var Xpos=new Array();
// var Ypos=new Array();
// var dX=new Array();
// var dY=new Array();
// var decay=new Array();
// var colour=0;
// var swide=800;
// var shigh=600;
// function write_fire() {
// var b, s;
// b=document.createElement("div");
// s=b.style;
// s.position="absolute";
// b.setAttribute("id", "bod");
// document.body.appendChild(b);
// set_scroll();
// set_width();
// b.appendChild(div("lg", 3, 4));
// b.appendChild(div("tg", 2, 3));
// for (var i=0; i<bits; i++) b.appendChild(div("bg"+i, 1, 1));
// }
// function div(id, w, h) {
// var d=document.createElement("div");
// d.style.position="absolute";
// d.style.overflow="hidden";
// d.style.width=w+"px";
// d.style.height=h+"px";
// d.setAttribute("id", id);
// return (d);
// }
// function bang() {
// var i, X, Y, Z, A=0;
// for (i=0; i<bits; i++) {
// X=Math.round(Xpos[i]);
// Y=Math.round(Ypos[i]);
// Z=document.getElementById("bg"+i).style;
// if((X>=0)&&(X<swide)&&(Y>=0)&&(Y<shigh)) {
// Z.left=X+"px";
// Z.top=Y+"px";
// }
// if ((decay[i]-=1)>14) {
// Z.width="3px";
// Z.height="3px";
// }
// else if (decay[i]>7) {
// Z.width="2px";
// Z.height="2px";
// }
// else if (decay[i]>3) {
// Z.width="1px";
// Z.height="1px";
// }
// else if (++A) Z.visibility="hidden";
// Xpos[i]+=dX[i];
// Ypos[i]+=(dY[i]+=1.25/intensity);
// }
// if (A!=bits) setTimeout("bang()", speed);
// }

// function stepthrough() {
// var i, Z;
// var oldx=xpos;
// var oldy=ypos;
// xpos+=dx;
// ypos-=4;
// if (ypos<bangheight||xpos<0||xpos>=swide||ypos>=shigh) {
// for (i=0; i<bits; i++) {
// Xpos[i]=xpos;
// Ypos[i]=ypos;
// dY[i]=(Math.random()-0.5)*intensity;
// dX[i]=(Math.random()-0.5)*(intensity-Math.abs(dY[i]))*1.25;
// decay[i]=Math.floor((Math.random()*16)+16);
// Z=document.getElementById("bg"+i).style;
// Z.backgroundColor=colours[colour];
// Z.visibility="visible";
// }
// bang();
// launch();
// }
// document.getElementById("lg").style.left=xpos+"px";
// document.getElementById("lg").style.top=ypos+"px";
// document.getElementById("tg").style.left=oldx+"px";
// document.getElementById("tg").style.top=oldy+"px";
// }
// function launch() {
// colour=Math.floor(Math.random()*colours.length);
// xpos=Math.round((0.5+Math.random())*swide*0.5);
// ypos=shigh-5;
// dx=(Math.random()-0.5)*4;
// bangheight=Math.round((0.5+Math.random())*shigh*0.4);
// document.getElementById("lg").style.backgroundColor=colours[colour];
// document.getElementById("tg").style.backgroundColor=colours[colour];
// }
// window.onscroll=set_scroll;
// function set_scroll() {
// var sleft, sdown;
// if (typeof(self.pageYOffset)=="number") {
// sdown=self.pageYOffset;
// sleft=self.pageXOffset;
// }
// else if (document.body.scrollTop || document.body.scrollLeft) {
// sdown=document.body.scrollTop;
// sleft=document.body.scrollLeft;
// }
// else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
// sleft=document.documentElement.scrollLeft;
// sdown=document.documentElement.scrollTop;
// }
// else {
// sdown=0;
// sleft=0;
// }
// var s=document.getElementById("bod").style;
// s.top=sdown+"px";
// s.left=sleft+"px";
// }
// window.onresize=set_width;
// function set_width() {
// if (typeof(self.innerWidth)=="number") {
// swide=self.innerWidth;
// shigh=self.innerHeight;
// }
// else if (document.documentElement && document.documentElement.clientWidth) {
// swide=document.documentElement.clientWidth;
// shigh=document.documentElement.clientHeight;
// }
// else if (document.body.clientWidth) {
// swide=document.body.clientWidth;
// shigh=document.body.clientHeight;
// }
// }
// window.onload=function() { if (document.getElementById) {
// set_width();
// write_fire();
// launch();
// setInterval('stepthrough()', speed);
// }}
// //]]>
// }


//setInterval('partic()', 1000)

function partic() {
    const particleCount = 300; // Experimente alterar a contagem de partículas e veja o que acontece
const colors = ["Pink", "White"]; // Você não está limitado a apenas 2 cores aqui!
const particles = [];

const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.velocity = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    };
    this.alpha = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
    this.radius -= 0.01;
    this.draw();
  }
}

function createFirework(x, y) {
  for (let i = 0; i < particleCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particle = new Particle(x, y, color);
    particles.push(particle);
  }
}


}

function encerrado() {
    document.querySelector('.avisoencerrado').innerHTML += `<p>APP ENCERRADO COM SUCESSO!</p>`
}
setInterval('encerrado()', 1000)