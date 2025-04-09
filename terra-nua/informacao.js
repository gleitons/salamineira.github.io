function gerarNomes(anoS) {
    // const url2016 = `./cidades-mg-${anoS}`
    const cidadeC = document.querySelector('#cidadeC')
    const response = localStorage.getItem(`city${anoS}`);
    const data = JSON.parse(response)
    // console.log(data)

    data.map((nomeCity) => {
        const seletorCidade = document.createElement('option');
        seletorCidade.setAttribute('value', nomeCity.nome);
        seletorCidade.textContent = nomeCity.nome;
        cidadeC.appendChild(seletorCidade)
    })

}



async function avaliacoes(anoS) {
    const url = `./cidades-mg-${anoS}`
    const cidadeCC = document.querySelector('#cidadeC')
    var cidadeC = cidadeCC.options[cidadeCC.selectedIndex].value

    const tabelaAvaliacaoVenal = document.querySelector('#tabelaAvaliacaoVenal')
    const response = await fetch(url)
    var data = await response.json()    

    localStorage.setItem(`city${anoS}`, JSON.stringify(data))

    gerarNomes(anoS)

   

    

    const cidadeMaior = await data.sort(function (a, b) {
        
            
            const aa = parseFloat(a.aptidaoBoa.toString().replace('.', ''))
            const bb = parseFloat(b.aptidaoBoa.toString().replace('.', ''))
            // console.log(aa) 
            if (aa < bb) return 1;
            if (aa > bb) return -1;
            return 0;
        
        
    })
   
   
   
    data.map((city) => {        
        if (cidadeC == city.nome ) {
            const aptBoa = city.aptidaoBoa
            tabelaAvaliacaoVenal.innerHTML = `
        <h2>Preço por Ha (hectare)</h2>
        <div style="height:45px;">
        <img src="./imagens/emater-mg-logo-6FDB59CBDA-seeklogo.com_.png.webp" alt="">
    </div>
    <div class="apareceInfo">
        <h2>Valor de terra nua do município de ${city.nome}</h2>
        <tr>
            <tr>Ano</tr>
        
        </tr>
        <tr>
            <span class="selecioneAn">
                <tr>${city.ano}</tr>
            </span>
        </tr>
        <table class="tabelaS">
        <thead class="cabeca">
        </thead>
        <tbody class="corpo">
        
            <tr>
                <td>1º:</td>
                <td>Lavoura aptidão boa</td>
                <td>R$ ${aptBoa.replace(/"/g, '')}</td>
            </tr>
            <tr>
                <td>2º:</td>
                <td>Lavoura aptidão regular</td>
                <td>R$ ${city.aptdaoRegular.replace(/"/g, '')}</td>
            </tr>
            <tr>
                <td>3º:</td>
                <td>Lavoura aptidão restrita</td>
                <td>R$ ${city.aptdaoRestrita.replace(/"/g, '')}</td>
            </tr>
            <tr>
                <td>4º:</td>
                <td>Pastagem plantada</td>
                <td>R$ ${city.pastagemPlantada.replace(/"/g, '')}</td>
            </tr>
        
            <tr>
                <td>5º:</td>
                <td>Silvicultura ou Pastagem
                    Natural</td>
                    <td>R$ ${city.pastagemNatural}</td>
            </tr>
            <tr>
                <td>6º:</td>
                <td>Preservação da Fauna ou
                    Flora</td>
                    <td>R$ ${city.reserva}</td>
            </tr>
        </tbody>
        <tfoot>
           <tr>
            <td></td>
           </tr>
        
        
        </tfoot>
        <p class="cidadeInfo">${city.nome.toUpperCase()}</p>
        </table>
        <p class="cidadeDown" onclick="esconde()" >CLIQUE AQUI - Veja a Assinatura da Reunião em ${city.ano} em Lagoa dos Patos - MG</p>
        
        <p >Baixe a planilha completa - <a href="./arquivos/valor-terra-nua-${anoS}.pdf#">Clique Aqui</a></p>
        <p class="curiosidadeS" ><strong>*CURIOSIDADE:</strong> Você sabia que a cidade com maior Valor da terra nua em Minas Gerais das cidades cadastradas acima: Em <strong>${city.ano} foi ${cidadeMaior[0].nome}</strong>, com valor venal de aptidão Boa no valor de  <strong class=""vtnMaior>R$ ${cidadeMaior[0].aptidaoBoa}</strong> mil reais por Hectare. A menor aptidão Boa foi a cidade de <strong>${cidadeMaior[data.length - 1].nome}</strong> com valor de terra nua, aptidão boa avaliado em <strong>R$ ${cidadeMaior[data.length - 1].aptidaoBoa}</strong> Reais. <br>
        O valor 0,00 indica 0,00 reais ou que o município não preencheu as informações de VTN.</p>
        <div class="assinaturaTermo ocultaEsome" id="imgOclude">
        <img src="./img/terra-nua-${anoS}.jpg" onclick="esconde()" style="cursor:pointer;" alt="Valor de terra nua do município de ${city.nome} no ano de ${city.ano}">
        </div>
    </div>`
        }

    })
    if(data.length < 2) {
        document.querySelector('.curiosidadeS').style.display = 'none'
    }
    

}

function esconde() {
    const imgOclude = document.querySelector('#imgOclude')
    imgOclude.classList.toggle('ocultaEsome')
}

function gerarMenu() {
    var menuTopInfo = document.querySelector('#menuTopInfo')

    for (let i = 2010; i <= 2025; i++) {
        menuTopInfo.innerHTML += `<a href="./venal-${i}.html">
        <li>${i}</li>
        </a>`
    }


}
gerarMenu()

function filtrarItens() {
    // Obtém o valor do campo de entrada de pesquisa
    var termo = document.getElementById("searchInput").value.toLowerCase();
    // Obtém todos os itens da lista
    var itens = document.getElementById("listaItens").getElementsByTagName("li");
    // Loop através de todos os itens da lista
    for (var i = 0; i < itens.length; i++) {
        var item = itens[i];
        var textoItem = item.textContent.toLowerCase();
        // Verifica se o texto do item contém o termo de pesquisa
        if (textoItem.indexOf(termo) > -1) {
            // Se o termo de pesquisa for encontrado no texto do item, mostra o item
            item.style.display = "";
        } else {
            // Caso contrário, esconde o item
            item.style.display = "none";
        }
    }
}
function verMaior(a, b) {
    //console.log(a.aptidaoBoa)
    const aa = Number(a.aptidaoBoa)
    const bb = Number(b.aptidaoBoa)
    //console.log(aa)
    //console.log(bb)
    if (aa < bb) return 1;
    if (aa > bb) return -1;
    return 0;

}
// Adiciona um evento de input ao campo de pesquisa para chamar a função de filtragem
// document.getElementById("searchInput").addEventListener("input", filtrarItens);
