


const url = '/falecimentos';


const tabelaE = document.createElement('table');
const headTabela = document.createElement('tbody');
const linhaTabela = document.createElement('tr');
const colunaTabela = document.createElement('td');
const ano = document.createTextNode("Ano");
const homens = document.createTextNode("Homens");



colunaTabela.appendChild(ano)
colunaTabela.appendChild(homens)
linhaTabela.appendChild(colunaTabela);
headTabela.appendChild(linhaTabela)
tabelaE.appendChild(headTabela)




//document.getElementById("criarTabela").appendChild(tabelaE);



//document.querySelector('#criarTabela').value = tabelaE;



async function falecidos() {
    const response = await fetch(url);
    const data = await response.json();
    const imgH = '/falecimento/desconhecido-homem.png';
    const imgM = '/falecimento/desconhecido-mulher.png'
    const vidroR = document.querySelector('.vidroF');
    const tagApelido = document.getElementById('apelidoT');


    data.sort(toDate);

    function ordemDecrescente(a, b) {

        return a.falecimento - b.falecimento;
    }

    function ordemCrescente(a, b) {

        return toDate(b) - toDate(a);
    }

    function toDate(fal) {
        const parts = fal.falecimento.split("/");

        const dataFor = new Date(parts[2], parts[1] - 1, parts[0]);

        return dataFor;

    }
    function tabelaEs(anoNote) {
        cont = 0;
        masc = 0;
        femi = 0;
        data.map((obi) => {
            const datas = obi.falecimento.split("/");
            const ano = datas[2];
            // const mes = datas[1] - 1;
            // const dia = datas[0]

            if (ano == anoNote) {
                cont++;
                if (obi.sexo == 'm') {
                    masc++;
                } else {
                    femi++;
                }
            }

        });
        return [cont, masc, femi];

    }




    var con = 0;

    function contadorObitos() {
        document.querySelector('#testt').innerHTML = 'ok'
        var total = 0;
        var totHomens = 0;
        var totMulheres = 0;

        
        
        for (let index = 2022; index >= 1800; index--) {
            if (tabelaEs(index)[0] > 0) {
                const falecimentoAno = tabelaEs(index);
                document.querySelector('#tabEstatistica').innerHTML += `           
            <tbody>
                <tr>
                    <td>${index}</td>
                    <td>${falecimentoAno[1]}</td>
                    <td>${falecimentoAno[2]}</td>
                    <td>${falecimentoAno[0]}</td>                             
                </tr>                                   
            </tbody>         `
            
            }
            

            
            total = total + tabelaEs(index)[0];
            totHomens = totHomens + tabelaEs(index)[1];
            totMulheres = totMulheres + tabelaEs(index)[2];
            

            

        }
        document.querySelector('#totalCont').innerHTML += `           
            
                <tr>
                    <td>Total</td>
                    <td>${totHomens}</td>
                    <td>${totMulheres}</td>
                    <td>${total}</td>                             
                </tr>                                   
                   `
        console.log(total)
    }



    contadorObitos();

    data.sort(toDate)
    data.sort(ordemCrescente);

    await data.map((falec) => {

        const falecID = falec.falecimento;


        const falecimento = falec.falecimento;
        const imgFalecimento = falec.imagem;

        if (falec.nascimento == "") { falec.nascimento = "Desconhecido" };

        if (falec.sexo == 'm') {
            filho = "Filho"
            if (imgFalecimento.length == 0) {
                falec.imagem = imgH;
            }


        } else {
            if (imgFalecimento.length == 0) {
                falec.imagem = imgM;
            }
        }

        if (falec.apelido == "") {


            var apel = "";
        } else {
            var apel = `Conhecido como ${falec.apelido}`
        }


        
        con = con + 1;
       
            if (5 > con) {
                document.querySelector('#lutoTitle').innerHTML += `
                <div class="lutosC">
                    <img class="fita" src="/imagens/fita-falecimento.png" alt="">
                    <div class="imagemL">
                        <img src="${falec.imagem}" alt="">
                    </div>
                    <div class="vidroF">
                        <p class="nomeF">${falec.nome}</p>
                        <p class="aplido" id="apelidoT">${apel}</p>
                        <div class="nascFalec">
                            <i class="bi bi-star-fill"> ${falec.nascimento}</i>
                            <i class="bi bi-heartbreak-fill"> ${falec.falecimento}</i>
                        </div>
                        <p class="falecMae">${filho} de ${falec.mae}</p>
                    </div>
                    <div class="nota">
                        <p>${falec.nota}</p>
                    </div>
                </div>`;
            } else {
            document.querySelector('#lutoTitle').innerHTML += `                
                <div class="ocultando">
                                <button id="cliqueOculto${con}" class="btnMostra" onclick="ocultarMostar(${con})" >${falec.nome} </br><i class="bi bi-star-fill"> ${falec.falecimento}</i></button>
                                <div id="falecOculto${con}" class="lutosC dnone">                                    
                                    <div>
                                        <img class="fita" src="/imagens/fita-falecimento.png" alt="">
                                        <div class="imagemL">
                                            <img src="${falec.imagem}" alt="">
                                        </div>
                                        <div class="vidroF">
                                            <p class="nomeF">${falec.nome}</p>
                                            <p class="aplido" id="apelidoT">${apel}</p>
                                            <div class="nascFalec">
                                                <i class="bi bi-star-fill"> ${falec.nascimento}</i>
                                                <i class="bi bi-heartbreak-fill"> ${falec.falecimento}</i>
                                            </div>
                                            <p class="falecMae">${filho} de ${falec.mae}</p>
                                        </div>
                                        <div class="nota">
                                            <p>${falec.nota}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
            `;
        }
        
            
        
        
            
    });
}

falecidos();
function verficaM(a, b) {
    return a.birthday.getTime() - b.birthday.getTime()
}

function ocultarMostar(numb) {
    console.log(numb)
    const botao = document.querySelector(`#cliqueOculto${numb}`);
    const ocultado = document.querySelector(`#falecOculto${numb}`)

    botao.addEventListener('click', ()=> {
        console.log('clicoou')
        ocultado.classList.toggle('dnone');
       
    })

   
}