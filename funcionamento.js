const data = new Date();
var diaD = data.getDay()
const dia = data.getDate()
const mes = data.getMonth() + 1
const ano = data.getFullYear()
var feriados = ["20/1/2023", "20/2/2023", "21/2/2023", "22/2/2023", "1/3/2023", "7/4/2023", "21/4/2023", "1/5/2023", "8/6/2023", "7/9/2023", "12/10/2023", "2/11/2023", "15/11/2023", "25/12/2023", "26/12/2023", "27/12/2023", "28/12/2023", "29/12/2023", "30/12/2023", "31/12/2023", "1/1/2024"]

const anoCompara = `${dia}/${mes}/${ano}`
//
const funciona = document.querySelector('#funciona');







for (let index = 0; index < feriados.length; index++) {


    if (diaD == 6 || diaD == 0) {
        

        funciona.innerHTML = `<div class="funcionamento cvermelho">
        <div >
            <i class="bi bi-emoji-frown-fill"></i>
            <p>Hoje <strong> ${anoCompara} NÃO</strong> estamos funcionando - Tenha um ótimo FDS</p>
        </div>

    </div>`

    }
    if (anoCompara == feriados[index]) {
        funciona.innerHTML = `<div class="funcionamento cvermelho">
        <div >
            <i class="bi bi-emoji-frown-fill"></i>
            <p>Hoje ${anoCompara}<strong> NÃO</strong> estamos funcionando - Feriado</p>
            <button><a href="/horario-de-funcionamento.html">Veja o calendário completo</a></button>
        </div>
    </div>`
    }


}
const funcionaAmanha = document.querySelector('#funcionaAmanha');
const diaA = data.getDay() + 1
const diaB = data.getDate() + 1

console.log(mes)

if(mes == 2 && diaB == 29 || diaB == 30 || diaB == 31){
    funcionaAmanha.innerHTML = `<div class="funcionamento cvermelho">
        <div >
            <i class="bi bi-emoji-frown-fill"></i>
            <p>Amanhã <strong>NÃO</strong> estaremos funcionando - Feriado</p>
        </div>
    </div>`
}


const diaSeguinte = `${diaB}/${mes}/${ano}`
console.log(diaB)




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
            <p>Amanhã <strong>NÃO</strong> estaremos funcionando - Feriado</p>
        </div>
    </div>`
    }


}








function dataVer() {

}
