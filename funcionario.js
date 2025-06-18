
const urlL = "/funcionarios";
var sBrowser, sUsrAg = navigator.userAgent;

if (sUsrAg.indexOf("Firefox") > -1) {
    alert("UTILIZE O GOOGLE CHROME, PARA UTILIZAR O SISTEMA CORRETAMENTE, ");
}

function fecharIn() {
    const informacoes = document.querySelector('#fechT')
    informacoes.innerHTML = ''
}
async function infoCadastroFu() {
    const informacoes = document.querySelector('#infoCadastroF')
    
    const response = await fetch(urlL)
    const data = await response.json();

    data.sort( function(a,b) {
        if(a.nome > b.nome) return 1;
        if(a.nome < b.nome) return -1;
        return 0
    }) ;
    var comCPF = 0
    var semCPF = 0
    var admiss = 0
    var semadmiss = 0
    
    data.map((mostraFunc) => {
        //nomess.innerHTML += mostraFunc.nome + `<br>`
        if(mostraFunc.cpf.length > 0){
            comCPF = comCPF + 1
        } else {
            semCPF = semCPF + 1
        }
        if(mostraFunc.admissao.length > 0){
            admiss = admiss + 1
        } else {
            semadmiss = semadmiss + 1
        }

        informacoes.innerHTML = `
        Servidores Cadastrados: ${data.length} <br>
        CPF incluído: ${comCPF}<br>
        Sem CPF: ${semCPF}<br>
        Com Admissão: ${admiss}<br>
        Sem Admissão: ${semadmiss}<br>`
    })
}
infoCadastroFu()
async function carregaFuncionarios() {
    const nomeFuncionario = document.querySelector('#nomeFuncionario')
    const funcionarioInfo = document.querySelector('.infoFuncionario')
    const response = await fetch(urlL)
    const data = await response.json();

    data.sort( function(a,b) {
        if(a.nome > b.nome) return 1;
        if(a.nome < b.nome) return -1;
        return 0
    }) ;
    
    data.map((mostraFunc, i) => {
        loadFuncionario.innerHTML = ''
        listServidor.innerHTML += `<li class="servidorSelecionado" onmouseover="PlaySound('mySound')" 
        onmouseout="StopSound('mySound')" id="servidorSelecionado${i}" value="${mostraFunc.nome}" onclick="mostraInfo(${i})">${mostraFunc.nome} ${mostraFunc.cpf}</li>`
        const optionGera = document.createElement('option');
        optionGera.setAttribute('value', `${mostraFunc.nome} `);
        optionGera.setAttribute('class', 'buscaOption')
        optionGera.textContent = `${mostraFunc.nome} ${mostraFunc.cpf}`

        const divFunci = document.createElement('div')
        divFunci.setAttribute('class', 'divdoFuncionario')
        const nomeF = document.createElement('p')
        nomeF.innerHTML = `NOME: ${mostraFunc.nome}`
        const CPFF = document.createElement('p')
        CPFF.innerHTML = `CPF: <input type="text" name="" id="" value="${mostraFunc.cpf}">`

        const Admissao = document.createElement('p')
        Admissao.innerHTML = `ADMISSÃO: <input type="text" name="" id="" value="${mostraFunc.admissao}">`

        const cargo = document.createElement('p')
        cargo.innerHTML = `CARGO: <input type="text" name="" id="" value="${mostraFunc.cargo}"> `


        divFunci.appendChild(nomeF);
        divFunci.appendChild(CPFF);
        divFunci.appendChild(Admissao);
        divFunci.appendChild(cargo);

        funcionarioInfo.appendChild(divFunci);


        nomeFuncionario.appendChild(optionGera);

        // funcionarioInfo.innerHTML += `
        // <p>NOME:</p>
        // <p>CPF: <input type="text" name="" id=""></p>
        // <p>ADMISSÃO: <input type="text" name="" id=""></p>
        // <p>CARGO: <input type="text" name="" id=""></p>`
    })

    
}
carregaFuncionarios();

async function mostraInfo(idF) {
    const porSearch = document.querySelector(`#servidorSelecionado${idF}`).innerHTML
    const nomeFuncionarioOne = document.querySelector('#nomeFuncionario');
    const mostraFuncionario = document.querySelector('#mostraFuncionario');
    
    const nomeFuncionario = nomeFuncionarioOne.options[nomeFuncionarioOne.selectedIndex].textContent;
    const funcionarioInfo = document.getElementsByClassName('divdoFuncionario');

   
    const response = await fetch(urlL)
    const data = await response.json();
    
    data.map((mostraFunc) => {
        
        if(nomeFuncionario == mostraFunc.nome + " " + mostraFunc.cpf ||  porSearch == mostraFunc.nome + " " + mostraFunc.cpf) {
            mostraFuncionario.innerHTML = ` <div class="loadFuncionario">
                <p >NOME: <input type="text" name="" id="nommeDoFunc" value="${mostraFunc.nome}" placeholder="ex: Nome Completo"></p>
                <p>MATRICULA: <input type="text" name="" id="matriculaDoFunc" value="${mostraFunc.matricula}" placeholder="ex: 1745"></p>
                <p>CPF: <input type="text" name="" id="cpfDoFunc" value="${mostraFunc.cpf}" placeholder="ex: 083.030.206-92"></p>
                <p>ADMISSÃO: <input type="text" name="" id="admissaoDoFunc" value="${mostraFunc.admissao}" placeholder="ex: 21/12/21"></p>
                <p >CARGO: <input type="text" name="" id="cargoDoFunc" value="${mostraFunc.cargo}" placeholder="ex: AGENTE DE DESEN..."></p> </p>
                
            </div>`
            
        }
    })
}

function enviarDados() {
    const nommeDoFunc = document.querySelector('#nommeDoFunc').value
    const matriculaDoFunc = document.querySelector('#matriculaDoFunc').value
    const cpfDoFunc = document.querySelector('#cpfDoFunc').value
    const admissaoDoFunc = document.querySelector('#admissaoDoFunc').value
    const enviarFo = document.querySelector('#enviarFo')

    if(cpfDoFunc.length == 0){
        enviarFo.innerHTML = `
        <a href="https://api.whatsapp.com/send?phone=553899167841&text=Olá, complete o cadastro de ${nommeDoFunc}, CPF: ${cpfDoFunc} e a admissão ${admissaoDoFunc}, obrigado" target="_blank"><button onclick="enviarDados()">PREENCHA O CPF E ADMISSÃO ANTES</button></a>`
    } else {
        enviarFo.innerHTML = `
    <a href="https://api.whatsapp.com/send?phone=553899167841&text=Olá, complete o cadastro de ${nommeDoFunc}, CPF: ${cpfDoFunc} e a admissão ${admissaoDoFunc}, obrigado" target="_blank"><button onclick="enviarDados()">ENVIAR</button></a>`
    }

    

}
//acima agora abaixo corrigir






function startFolha() {
    const mesR = document.querySelector('#mesReferencia');
    const confere = mesR.options[mesR.selectedIndex].value;
    const verFunci = document.querySelector('#nomeFuncionario');
    const confereFunc = verFunci.options[verFunci.selectedIndex].value;

    if (confere.length > 0 && confereFunc.length > 0) {
        imprimLivro();
        
    } else {
        //alert("Por favor, confira o mês de referencia e funcionário");
        const colorirMes = document.querySelector('#cMes');
        colorirMes.classList.add('cFunc')
        const colorirFunc = document.querySelector('#cFunc');
        colorirFunc.classList.add('cFunc')
        removeCFunc()
        removeCMes()

    }

}
function loadP() {
    location.href = 'https://salamineira.com/livro/';
}
function removeCFunc() {

    const colorirMes = document.querySelector('#cFunc');
    const colorirM = document.querySelector('#nomeFuncionario');
    const verMes = colorirM.options[colorirM.selectedIndex].value;

    if (verMes.split('').length > 0) {
        colorirMes.classList.remove('cFunc')
    }
}
function removeCMes() {

    const colorirMes = document.querySelector('#cMes');
    const colorirM = document.querySelector('#mesReferencia');
    const verMes = colorirM.options[colorirM.selectedIndex].value;

    if (verMes.split('').length > 0) {
        colorirMes.classList.remove('cFunc')
    }


}

async function imprimLivro() {
    const promise = await fetch(urlL)
    var data = await promise.json();
    //var data = await arrCompleto();   

    const doc = document.querySelector('#tabelaData');
    const cabecaTabela = document.querySelector('#cabecatabela');

    var ass = ["", "", "", "", "", "SÁBADO", "DOMINGO"];
    var feriados2024 = ["<p>* FERIADOS EM JANEIRO:</p> <li>01 - Confraternização Universal</li> <li>20 - Dia de São Sebastião - Feriado Municipal</li>", "<p>* FERIADOS EM FEVEREIRO:</p> <li>12 - Carnaval</li> <li>13 - Carnaval</li> <li>22 - Quarta feira de cinzas / ponto Facultativo</li>", "<p>* FERIADOS EM MARÇO:</p> <li>01 - Aniversário da cidade de Lagoa dos Patos MG</li> <li>29 - Paixão de Cristo</li>", "<p>* FERIADOS EM ABRIL:</p> <li>21 de Abril - Tiradentes - Feriado Nacional</li>", "<p>* FERIADOS EM MAIO:</p> <li>01 - Dia do Trabalho - Feriado Nacional</li> <li>08 - Corpus Christi / Facultativo - Feriado Nacional</li>", "<p>* FERIADOS EM JUNHO:</p> <li>-</li>", "<p>* FERIADOS EM JULHO:</p> <li>NÃO EXISTEM FERIADOS MUNICIPAIS NESTA DATA</li>", "<p>* FERIADOS EM JULHO:</p> <li>NÃO EXISTEM FERIADOS MUNICIPAIS PARA ESTA DATA</li>", "<p>* FERIADOS EM AGOSTO:</p> <li>NÃO EXISTEM FERIADOS MUNICIPAIS PARA ESTA DATA</li>", "<p>* FERIADOS EM SETEMBRO:</p> <li>07 - Independência do Brasil - Feriado Nacional</li>", "<p>* FERIADOS EM OUTUBRO:</p> <li>12 - Dia de Nossa Senhora Aparecida - Feriado Nacional</li>", "<p>* FERIADOS EM NOVEMBRO:</p> <li>02 - Novembro, Finados - Feriado Nacional</li> <li>15 de novembro, Proclamação da República - Feriado Nacional</li> <li>20 de novembro - Dia Nacional de Zumbi e da Consciência Negra</li>", "<p>* FERIADOS EM DEZEMBRO:</p> <li>25 - Natal - Feriado Nacional</li>"]

    var feriados2023 = ["<p>* FERIADOS EM JANEIRO:</p> <li>20 - Dia de São Sebastião - Feriado Municipal</li>", "<p>* FERIADOS EM FEVEREIRO:</p> <li>20 - Segunda Feira de carnaval</li> <li>21 - Carnaval - Feriado Nacional</li> <li>22 - Quarta feira de cinzas / ponto Facultativo</li>", "<p>* FERIADOS EM MARÇO:</p> <li>01 - Aniversário da cidade de Lagoa dos Patos MG</li>", "<p>* FERIADOS EM ABRIL:</p> <li>07 - Paixão de Cristo - Feriado Nacional</li> <li>21 de Abril - Tiradentes - Feriado Nacional</li>", "<p>* FERIADOS EM MAIO:</p> <li>01 - Dia do Trabalho - Feriado Nacional</li>", "<p>* FERIADOS EM JUNHO:</p> <li>08 - Corpus Christi / Facultativo - Feriado Nacional</li>", "<p>* FERIADOS EM JULHO:</p> <li>NÃO EXISTEM FERIADOS MUNICIPAIS NESTA DATA</li>", "<p>* FERIADOS EM JULHO:</p> <li>NÃO EXISTEM FERIADOS MUNICIPAIS PARA ESTA DATA</li>", "<p>* FERIADOS EM AGOSTO:</p> <li>NÃO EXISTEM FERIADOS MUNICIPAIS PARA ESTA DATA</li>", "<p>* FERIADOS EM SETEMBRO:</p> <li>07 - Independência do Brasil - Feriado Nacional</li>", "<p>* FERIADOS EM OUTUBRO:</p> <li>12 - Dia de Nossa Senhora Aparecida - Feriado Nacional</li>", "<p>* FERIADOS EM NOVEMBRO:</p> <li>02 - Novembro, Finados - Feriado Nacional</li> <li>15 de novembro, Proclamação da República - Feriado Nacional</li>", "<p>* FERIADOS EM DEZEMBRO:</p> <li>25 - Natal - Feriado Nacional</li>"]


    // for (let index = 0; index <= data.length; index++) {        
    //     nomeFuncionario.innerHTML += `<option value="${data[index].nome}">${data[index].nome}</option>`; 

    // }

    var ComparaF = document.querySelector('#nomeFuncionario');
    var comparaFuncionario = ComparaF.options[ComparaF.selectedIndex].value;

    ComparaF.setAttribute('disabled', '')
    ComparaF.innerHTML = `<option value="">${comparaFuncionario} - Clique em Novo</option>`

    var mesRefe = document.querySelector('#mesReferencia');
    var smesReferencia = mesRefe.options[mesRefe.selectedIndex].value;

    mesRefe.setAttribute('disabled', '')
    mesRefe.innerHTML = `<option value="">${smesReferencia} - Clique em Novo</option>`

    var tamanhoM = parseInt(selecionaMes(smesReferencia));
    const mesCorreto = tamanhoM.toString().length



    var anoRef = document.querySelector('#anorefi');
    var anoReferencia = anoRef.options[anoRef.selectedIndex].value;

    var iniM = document.querySelector('#iniM');
    var inicioM = iniM.options[iniM.selectedIndex].value;

    var fiM = document.querySelector('#fiM');
    var fimM = fiM.options[fiM.selectedIndex].value;

    var iniT = document.querySelector('#iniT');
    var inicioT = iniT.options[iniT.selectedIndex].value;

    var fiT = document.querySelector('#fiT');
    var fimT = fiT.options[fiT.selectedIndex].value;

    const saida = [`${fimM}`, `${fimM}`, `${fimM}`, `${fimM}`, `${fimM}`, "SÁBADO", "DOMINGO"];
    const feriadoFevereiro = ["2023-02-20", "2023-02-21", "2023-02-22"];
    var retornoTarde = [`${inicioT}`, `${inicioT}`, `${inicioT}`, `${inicioT}`, `${inicioT}`, "SÁBADO", "DOMINGO"];

    const saidaTarde = [`${fimT}`, `${fimT}`, `${fimT}`, `${fimT}`, `${fimT}`, "SÁBADO", "DOMINGO"];

    var seman = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    var semana = [`${inicioM}`, `${inicioM}`, `${inicioM}`, `${inicioM}`, `${inicioM}`, "SÁBADO", "DOMINGO"];




    if (mesCorreto == "1") {
        var mesCerto = "0" + tamanhoM;
    } else {
        var mesCerto = tamanhoM;
    }

    const mesD = parseInt(mesCerto)

    var temDias = total_dias_mes(anoReferencia, mesD);
    var feriadoDia = mesD - 1

    for (let i = 1; i <= 31; i++) {
        const diaM = i.toString();

        if (diaM.length <= 1) {
            var diaA = "0" + i;
        }
        var dataI = `${anoReferencia}-${mesCerto}-${diaA}`;
        var dataA = new Date(`${dataI}`).getDay();

        doc.innerHTML += `<tr>
        <td>${diaA}</td>
        <td>${semana[dataA]}</td>
        <td>${ass[dataA]}</td>
        
        <td>${saida[dataA]}</td>
        <td>${retornoTarde[dataA]}</td>
        <td>${saidaTarde[dataA]}</td>
        <td>${ass[dataA]}</td>
        </tr>`;
        diaA++;
    }

    // for (let inde = 0; inde < 12; inde++) {
    //     mesReferencia.innerHTML += `<option value="${mesR[inde]}" onclick="imprimLivro()">${mesR[inde]}</option>`;
    // }
    // var mesRefe = document.querySelector('#mesReferencia');
    // smesReferencia = mesRefe.options[mesRefe.selectedIndex].value;
    // var mesF = document.querySelector('#mesF').value = smesReferencia;

    
    const nommeDoFunc = document.querySelector('#nommeDoFunc').value    
    const matriculaDoFunc = document.querySelector('#matriculaDoFunc').value
    const cpfDoFunc = document.querySelector('#cpfDoFunc').value
    const admissaoDoFunc = document.querySelector('#admissaoDoFunc').value
    const cargoDoFunc = document.querySelector('#cargoDoFunc').value;
    const enviarFo = document.querySelector('#enviarFo')

    console.log(cargoDoFunc)

    

   var ctabela = `<tr>
    <td colspan="3">
        <p>EMPREGADOR: NOME / EMPRESA</p>
        <h5>PREFEITURA MUNICIPAL DE LAGOA DOS PATOS</h5>
    </td>
    <td colspan="2">
        <p>CEI / CNPJ°</p>
        <h5>16.901.381/0001-10</h5>
    </td>
    <td colspan="0" hidden>
        <p></p>
    </td>
    <td colspan="0" hidden>
        <p></p>
    </td>
    
</tr>
<tr>
    <td colspan="4">
        <p>ENDEREÇO</p>
        <h5>PRAÇA 31 DE MARÇO, 111, CENTRO</h5>
    </td>
    <td colspan="1" hidden>
        <p>ENDEREÇO</p>
    </td>
    <td colspan="1" hidden>
        <p>ENDEREÇO</p>
    </td>
    <td colspan="1" hidden>
        <p>ENDEREÇO</p>
    </td>
</tr>
<tr>
   
    <td colspan="2">
        <p>EMPREGADO (A)</p>
        <h5>${nommeDoFunc}</h2>
    </td>
    <td colspan="1">
    <p>MATRÍCULA</p>
    <h5>${matriculaDoFunc}</h5>
    </td>
    <td colspan="1">
        <p>DATA DE ADMISSÃO</p>
        <h5>${admissaoDoFunc}</h5>
    </td>
    
</tr>
<tr>
    <td colspan="2">
        <p>CARGO/FUNÇÃO:</p>
        <h5>${cargoDoFunc}</h5>
    </td>
    <td colspan="2">
        <p>CPF:</p>
        <h5>${cpfDoFunc}</h2>
    </td>
    <td colspan="0" hidden>
        <p>DATA DE ADMISSÃO</p>
        <h5></h5>
    </td>
    
</tr>
<tr>
    <td colspan="2">
        <p>HORÁRIO DE TRABALHO DE SEG. A SEXTA-FEIRA:</p>
        <h5>${inicioM} - ${fimM} / ${inicioT} - ${fimT} hs</h5>
    </td>
    <td colspan="1">
        <p>MÊS:</p>
        <h5>${smesReferencia}</h2>
    </td>
    <td colspan="1" >
        <p>ANO</p>
        <h5>${anoReferencia}</h5>
    </td>
    
</tr>`

cabecaTabela.innerHTML = ctabela;


if (anoReferencia == '2023') {
        footTab.innerHTML = `<div>
    <p>* O MÊS DE ${smesReferencia} POSSUI ${temDias} DIAS.</p>
</div>
${feriados2023[feriadoDia]}`
    } else {
        footTab.innerHTML = `<div>
    <p>* O MÊS DE FEVEREIRO POSSUI ${temDias} DIAS.</p>
</div>` }

if (anoReferencia == '2024') {
    footTab.innerHTML = `<div>
<p>* O MÊS DE ${smesReferencia} POSSUI ${temDias} DIAS.</p>
</div>
${feriados2024[feriadoDia]}`
} else {
    footTab.innerHTML = `<div>
<p>* O MÊS DE FEVEREIRO POSSUI ${temDias} DIAS.</p>
</div>` }

    const nof = document.querySelector('#nommeDoFunc').value

    titleFol.innerHTML = comparaFuncionario + " - " + smesReferencia + "-" + anoReferencia
    document.querySelector('title').textContent = `${nof} - ${smesReferencia} de ${anoReferencia}`
    window.print()
    geradorL.innerHTML = `<button onclick=" imprimir()"  >IMPRIMIR NOVAMENTE</button>
    <button onclick="location.reload()">NOVO</button>`
}
//FIM FUNÇÃO IMPRIMIR FOLHA
function imprimir() {
    window.print()
}

function modoNoite() {
    var bodyClasse = document.querySelector('#bodyClasse')
    bodyClasse.classList.toggle('bodyS');

    const verifica = localStorage.getItem('modoDark')

   

    if(verifica == 0){
        localStorage.setItem('modoDark', 1)
    } else {
        localStorage.setItem('modoDark', 0)
    }

   
}
if (localStorage.getItem('modoDark') === null) {    
    localStorage.setItem('modoDark', 0);
  } else {
    // Copiando o array existente no localstorage e adicionando o novo objeto ao final.
    localStorage.getItem('modoDark');
  }
    
const verificas = localStorage.getItem('modoDark')
var bodyClasses = document.querySelector('#bodyClasse')



if(verificas == 1) {
    bodyClasses.classList.add('bodyS')
} else {
    bodyClasses.classList.remove('bodyS')
}

function abrirAjuda() {
    const mostraD = document.querySelector('#mostraR');
    const abreA = document.querySelector('#duviasS');
    abreA.innerHTML = ''
    abreA.setAttribute('class', 'dimiBaixar')
    const primeiraDiv = document.createElement('div');
    const primeiroTexto = document.createElement('p');
    primeiroTexto.innerHTML = `Selecione o funcionário e o mês de referência <br>Configure de acordo com a imagem abaixo:`;
    const imagemEx = document.createElement('img');
    imagemEx.setAttribute('src', '/mostrar-duvidas-sistema.png');
    imagemEx.setAttribute('alt', 'Duvidas ao usar sistema');
    primeiraDiv.appendChild(primeiroTexto)
    primeiraDiv.appendChild(imagemEx)

    const segundaDiv = document.createElement('div');
    const config = document.createElement('div')
    config.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/yErVP8GgnhQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <h6>Configurações para impressão</h6>
    <p>*ATENÇÃO: UTILIZAR O CHROME PARA GERAR A FOLHA DE PONTO</p>
    <h4>Layout: Retrato</h4>
    <h4>Tamanho do Papel: A4</h4>
    <h4>Margens: Padrão</h4>
    <h4>Escala: Padrão</h4>
    <h4>Opções: Desmarcar - Cabeçalhos e rodapé <br> Marcar - Gráficos de segundo plano</h4>
    <a href="#"><button id="fechaAjuda" onclick="fecharAjuda()">Clique aqui para Fechar</button></a>`;
    segundaDiv.appendChild(config);

    abreA.appendChild(primeiraDiv);
    abreA.appendChild(segundaDiv)
    mostraD.setAttribute('disabled', '')



    //abreA.classList.toggle('dnone')
}
function fecharAjuda() {
    const abreB = document.querySelector('#duviasS');

    const abreA = document.querySelector('#duviasS').innerHTML = ''

    const mostraD = document.querySelector('#mostraR');
    mostraD.removeAttribute('disabled')
    abreB.setAttribute('class', 'dimiBaixar')
}
//setInterval("imprimLivro()", 1000)
//imprimLivro()

function selecionaMes(extenso) {
    var mesR = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];

    for (let index = 0; index < mesR.length; index++) {
        if (extenso == mesR[index]) {
            var nMes = parseInt([index + 1])
        }

    }
    return nMes;


}
function total_dias_mes(ano, mes) {
    let date = new Date(ano, mes, 0);
    return date.getDate();
}

function verificaLocal() {
    //loadP()

    pegaArray()

    const arraySalvo = window.localStorage.getItem('funcionariosLDP');
    console.log(typeof arraySalvo)
    if (arraySalvo == typeof String) {
        gerarFuncionario()
        


    } else {
        location.reloxad()
    }
}
//gerarFuncionario()
const funcionariosFunc = []
function cadastroFuncionario() {
    const addFuncionario = arrayFuncionario();

   
}
