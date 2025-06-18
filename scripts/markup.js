const calculadoraMark = document.querySelectorAll('.calculadoraMark input')

console.log(calculadoraMark)



function calcularMarkup() {
    const nomeProduto = calculadoraMark[0].value
    const precoCusto = calculadoraMark[1].value
    const depesasFixas = calculadoraMark[2].value / 100
    const despesasVariaveis = calculadoraMark[3].value / 100
    const margemDeLucro = calculadoraMark[4].value / 100

    const markup = 1/(1-depesasFixas-despesasVariaveis-margemDeLucro)
    const precoVenda = precoCusto * markup

    resMarkup.textContent = markup.toFixed(2)

    pVenda.textContent = `R$ ${precoVenda.toFixed(2)}`


}

function limpar() {
   
    for(let i = 0; i < calculadoraMark.length; i ++){
        calculadoraMark[i].value = ''
    }
}