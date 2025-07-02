const data = new Date();
var diaD = data.getDay()
const dia = data.getDate()
const mes = data.getMonth() + 1
const ano = data.getFullYear()
var hora = data.getHours();

var feriados = ["20/1/2023", "20/2/2023", "21/2/2023", "22/2/2023", "1/3/2023", "28/3/2024", "29/3/2024", "6/4/2023", "7/4/2023", "21/4/2023", "1/5/2023", "8/6/2023","9/6/2023",,"3/7/2023", "7/9/2023", "8/9/2023", "18/9/2023","12/10/2023","13/10/2023", "2/11/2023", "3/11/2023", "15/11/2023","11/12/2023", "12/12/2023", "13/12/2023", "25/12/2023", "26/12/2023", "27/12/2023", "28/12/2023", "29/12/2023", "30/12/2023", "31/12/2023", "1/1/2024","12/2/2024","13/2/2024","14/2/2024","10/5/2024","13/5/2024","30/5/2024","31/5/2024","6/8/2024","28/10/2024","29/8/2024","7/10/2024","15/11/2024","20/11/2024","29/11/2024","11/12/2024","20/12/2024","24/12/2024","25/12/2024","26/12/2024","27/12/2024","31/12/2024","1/1/2025","2/1/2025","3/1/2025","20/1/2025","3/3/2025","4/3/2025","5/3/2025","18/3/2025","19/3/2025","20/3/2025","17/4/2025","18/4/2025","21/4/2025","23/4/2025","24/4/2025","25/4/2025","1/5/2025","2/5/2025","14/5/2025","28/5/2025","2/7/2025"]

const anoCompara = `${dia}/${mes}/${ano}`


//
const funciona = document.querySelector('#funciona');
const infoAMais = document.querySelector('.infoAMais')



if(hora < 8) {
    infoAMais.textContent = 'A partir das 08:00hs'
} else if (hora > 8){
    infoAMais.textContent = 'Encerramos as 16:00hs'
} else {
    infoAMais.textContent = ''
}



for (let index = 0; index < feriados.length; index++) {

    if (diaD == 6 || diaD == 0) {

        funciona.innerHTML = `<div class="funcionamento cvermelho">
        <div >
            <i class="bi bi-emoji-frown-fill"></i>
            <p>Hoje <strong> ${anoCompara} NÃO</strong> estamos em funcionamento</p>
            
        </div>

    </div>`

    } 


    if (anoCompara == feriados[index]) {
        funciona.innerHTML = `<div class="funcionamento cvermelho">
        <div >
            <i class="bi bi-emoji-frown-fill"></i>
            <p>Hoje <strong> ${anoCompara} NÃO</strong> estamos em funcionamento</p>
            <button><a href="/horario-de-funcionamento.html">Veja o calendário completo</a></button>
        </div>
    </div>`
    }

   

   

}
const funcionaAmanha = document.querySelector('#funcionaAmanha');
const diaA = data.getDay() + 1
const diaB = data.getDate() + 1



if (mes == 2 && diaB == 29 || mes == 2 && diaB == 30 || mes == 2 && diaB == 31) {
    funcionaAmanha.innerHTML = `<div class="funcionamento cvermelho">
        <div >
            <i class="bi bi-emoji-frown-fill"></i>
            <p>Amanhã <strong>NÃO</strong> estaremos funcionando</p>
        </div>
    </div>`
}



const diaSeguinte = `${diaB}/${mes}/${ano}`





for (let i = 0; i < feriados.length; i++) {

    if (diaA == 6 || diaA == 0 || diaA == 7) {
        funcionaAmanha.innerHTML = `<div class="funcionamento cvermelho">
        <div >
            <i class="bi bi-emoji-frown-fill"></i>
            <p>Amanhã <strong>NÃO</strong> Iremos funcionar - Bom descanso</p>
        </div>
    </div>`

    }
    if (diaSeguinte == feriados[i]) {
        funcionaAmanha.innerHTML = `<div class="funcionamento cvermelho">
        <div >
            <i class="bi bi-emoji-frown-fill"></i>
            <p>Amanhã <strong>NÃO</strong> estaremos funcionando - Verifique o horario</p>
        </div>
    </div>`
    }


}

function dataVer() {

}
