

function gerarNomes(anoS) {
   // const url2016 = `./cidades-mg-${anoS}`
    const cidadeC = document.querySelector('#cidadeC')
    const response = localStorage.getItem(`city${anoS}`);
    const data = JSON.parse(response)

    data.map((nomeCity) => {
        const seletorCidade = document.createElement('option');
        seletorCidade.setAttribute('value', nomeCity.nome);
        seletorCidade.textContent = nomeCity.nome;
        cidadeC.appendChild(seletorCidade)



    })
    
}

async function avaliacoes(anoS) {
    const url = `./cidades-mg-${anoS}`
    console.log(url)
    const cidadeCC = document.querySelector('#cidadeC')
    var cidadeC = cidadeCC.options[cidadeCC.selectedIndex].value

    const tabelaAvaliacaoVenal = document.querySelector('#tabelaAvaliacaoVenal')
    const response = await fetch(url)
    var data = await response.json()

    function verMaior(a, b) {
        //console.log(a.aptidaoBoa)
        const aa = Number(a.aptidaoBoa.replace(/[^0-9]/g, ''))
        const bb = Number(b.aptidaoBoa.replace(/[^0-9]/g, ''))
        //console.log(aa)
        //console.log(bb)
        if (aa < bb) return 1;
        if (aa > bb) return -1;
        return 0;
        
    }
    // function verMenor(c, d) {
    //     //console.log(a.aptidaoBoa)
    //     const cc = Number(c.aptidaoBoa.replace(/[^0-9]/g, ''))
    //     const dd = Number(d.aptidaoBoa.replace(/[^0-9]/g, ''))
    //     //console.log(aa)
    //     //console.log(bb)
    //     if (cc < dd) return -1;
    //     if (cc > dd) return  1;
    //     return 0;
        
    // }
   

    var agoraN =  data.sort(verMaior)
    //var menorValor = data.sort(verMenor)

    //console.log(menorValor)

    if(localStorage.getItem(`city${anoS}`) == null){
        
        localStorage.setItem(`city${anoS}`, JSON.stringify(data))
    }

    data.map((city) => {
        if(cidadeC == city.nome) {
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
        <p class="curiosidadeS" ><strong>*CURIOSIDADE:</strong> Você sabia que a cidade com maior valor da terra nua em <strong>${city.ano} foi ${agoraN[0].nome}</strong>, com valor venal de aptidão Boa no valor de R$ <strong>${agoraN[0].aptidaoBoa} mil reais</strong></p>
        <div class="assinaturaTermo ocultaEsome" id="imgOclude">
        <img src="./img/terra-nua-${anoS}.jpg" onclick="esconde()" style="cursor:pointer;" alt="Valor de terra nua do município de ${city.nome} no ano de ${city.ano}">
        </div>
    </div>`   
        }       
        
    })
 gerarNomes(anoS)
 
  

    
}

function esconde() {
    const imgOclude = document.querySelector('#imgOclude')
    imgOclude.classList.toggle('ocultaEsome')
}

function gerarMenu() {
    var menuTopInfo = document.querySelector('#menuTopInfo')

    for(let i = 2015; i <= 2023; i++) {
        menuTopInfo.innerHTML += `<a href="./venal-${i}.html">
        <li>${i}</li>
        </a>`
    }
   

}
gerarMenu()
