function calcularMarkup(){
    
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
        const Markup = 100/(100 - (despesaFixa + despesaVari + margemLucro));
        const precoVenda = precoCusto * Markup;
        if (precoVenda == precoCusto) {
            pVenda.innerHTML = `Adicione as despesas`;
        } else {
            pVenda.innerHTML = `R$ ${(precoVenda).toFixed(2)}`;
        }
        resMarkup.innerText = (Markup).toFixed(2);
        
    } else {
        alert('Preencha o preço de Custo')
    }

    

}

function porcentagem(valor) {
    const porcent = valor/100;
    return porcent;
    
}
/*
const vCusto = document.getElementById('pc').value;
    const precoCusto = vCusto.replace(',', '.');
    const dFixa = 100 * (porcentagem(document.getElementById('df').value));
    const despesaFixa = dFixa.replace(',', '.');
    const dVari = 100 * (porcentagem(document.getElementById('dv').value));
    const despesaVari = dVari.replace(',', '.');
    const mLucro = 100 * (porcentagem(document.getElementById('ml').value));
    const margemLucro = mLucro.replace(',', '.');
    */