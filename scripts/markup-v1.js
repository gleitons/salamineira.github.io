function calcularMarkup() {

    const vCusto = pc.value != "" ? pc.value : 0
    // const precoCusto = vCusto.replace(',', '.');

    const dfP = df.value != "" ? df.value : 0
    // const despesaFixa = 100 * (porcentagem(df));

    const dvP = dv.value != "" ? dv.value : 0
    // const despesaVari = 100 * (porcentagem(dv));

    const mlP = ml.value != "" ? ml.value : 0
    // const margemLucro = 100 * (porcentagem(ml));

    // const margemLucro = mLucro.replace(',', '.');

    if (vCusto.length > 0) {

        const Markup = 100 / (100 - (parseFloat(dfP) + parseFloat(dvP) + parseFloat(mlP)));
        console.log(Markup)

        const precoVenda = vCusto * Markup;
        console.log(precoVenda)

        // if (precoVenda == precoCusto) {
        //     pVenda.innerHTML = `Adicione as despesas`;
        // } else {
            pVenda.innerHTML = `R$ ${(precoVenda).toFixed(2)}`;
            
        // }
        resMarkup.innerText = (Markup).toFixed(2);

        // abreLink()
        

    } else {
        alert('Preencha o preço de Custo')
    }



}

function porcentagem(valor) {
    const porcent = valor / 100;
    return porcent;

}
function limpar() {
    const calculadoraMark = document.querySelectorAll('.calculadoraMark input')
    for(let i = 0; i < calculadoraMark.length; i++) {
        calculadoraMark[i].value = ''
    }

    console.log(calculadoraMark)
}

function abreLink() {
    const nomeProduto = document.querySelector('#nomeProduto').value
    const pc = document.querySelector('#pc').value
    const df = document.querySelector('#df').value
    const dv = document.querySelector('#dv').value
    const ml = document.querySelector('#ml').value
    const vMarke = document.querySelector('#resMarkup').textContent
    const pVenda = document.querySelector('#resMarkup').textContent

    window.open(`./calculadora-mark.html#${nomeProduto}#${pc}#${df}#${dv}#${ml}#${vMarke}#${pVenda}', '_blank`);
}