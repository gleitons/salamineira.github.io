function calcularMarkup() {

    const vCusto = document.getElementById('pc').value;
    const precoCusto = vCusto.replace(',', '.');

    const df = (document.getElementById('df').value).replace(',', '.');
    const despesaFixa = 100 * (porcentagem(df));

    const dv = (document.getElementById('dv').value).replace(',', '.');
    const despesaVari = 100 * (porcentagem(dv));

    const ml = (document.getElementById('ml').value).replace(',', '.');
    const margemLucro = 100 * (porcentagem(ml));

    // const margemLucro = mLucro.replace(',', '.');

    if (vCusto.length > 0) {

        const Markup = 100 / (100 - (despesaFixa + despesaVari + margemLucro));
        const precoVenda = precoCusto * Markup;
        if (precoVenda == precoCusto) {
            pVenda.innerHTML = `Adicione as despesas`;
        } else {
            pVenda.innerHTML = `R$ ${(precoVenda).toFixed(2)}`;
            
        }
        resMarkup.innerText = (Markup).toFixed(2);

        abreLink()
        

    } else {
        alert('Preencha o preço de Custo')
    }



}

function porcentagem(valor) {
    const porcent = valor / 100;
    return porcent;

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