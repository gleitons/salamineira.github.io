const url = "/funcionarios"
console.log(" ")
console.log("Escrito Por Gleiton Aparecido Soares de Souza")
console.log("Acesse: www.gleiton.com.br")
console.log(" ")

function modoNoite() {
    const modoN = document.querySelector('.preencher');
    const modoL = document.querySelector('.mNoturno');
    modoN.classList.toggle('preencherDark');
    modoL.innerHTML = `<i class="bi bi-moon-stars-fill">Light</i>`
    
}

function startFolha() {
    const mesR = document.querySelector('#mesReferencia');
    const  confere = mesR.options[mesR.selectedIndex].value;
    const verFunci = document.querySelector('#nomeFuncionario');
    const confereFunc = verFunci.options[verFunci.selectedIndex].value;

    if(confere.length > 0 && confereFunc.length > 0 ){
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
    location.reload();
}
function removeCFunc() {
   
    const colorirMes = document.querySelector('#cFunc');
    const colorirM = document.querySelector('#nomeFuncionario');
    const verMes = colorirM.options[colorirM.selectedIndex].value;
   
    if(verMes.split('').length > 0) {
        colorirMes.classList.remove('cFunc')
    }
}
function removeCMes() {
   
    const colorirMes = document.querySelector('#cMes');
    const colorirM = document.querySelector('#mesReferencia');
    const verMes = colorirM.options[colorirM.selectedIndex].value;
  
    if(verMes.split('').length > 0) {
        colorirMes.classList.remove('cFunc')
    }
       
        
}

//setInterval('removeCMes()', 1000)







async function imprimLivro() {

    const promise = await fetch(url)
    var data = await promise.json();
    const doc = document.querySelector('#tabelaData');
    const cabecaTabela = document.querySelector('#cabecatabela');
    const saida = ["11:00", "11:00", "11:00", "11:00", "11:00", "SÁBADO", "DOMINGO"];
    const feriadoFevereiro = ["2023-02-20", "2023-02-21", "2023-02-22"];
    var retornoTarde = ["13:00", "13:00", "13:00", "13:00", "13:00", "SÁBADO", "DOMINGO"];

    const saidaTarde = ["16:00", "16:00", "16:00", "16:00", "16:00", "SÁBADO", "DOMINGO"];

    var seman = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    var semana = ["08:00", "08:00", "08:00", "08:00", "08:00", "SÁBADO", "DOMINGO"];
    var ass = ["", "", "", "", "", "SÁBADO", "DOMINGO"];
    var feriados = ["<p>* FERIADOS EM JANEIRO:</p> <li>20 - Dia de São Sebastião - Feriado Municipal</li>", "<p>* FERIADOS EM FEVEREIRO:</p> <li>20 - Segunda Feira de carnaval</li> <li>21 - Carnaval - Feriado Nacional</li> <li>22 - Quarta feira de cinzas / ponto Facultativo</li>", "<p>* FERIADOS EM MARÇO:</p> <li>01 - Aniversário da cidade de Lagoa dos Patos MG</li>", "<p>* FERIADOS EM ABRIL:</p> <li>07 - Paixão de Cristo - Feriado Nacional</li> <li>21 de Abril - Tiradentes - Feriado Nacional</li>", "<p>* FERIADOS EM MAIO:</p> <li>01 - Dia do Trabalho - Feriado Nacional</li>", "<p>* FERIADOS EM JUNHO:</p> <li>08 - Corpus Christi / Facultativo - Feriado Nacional</li>", "<p>* FERIADOS EM JULHO:</p> <li>NÃO EXISTEM FERIADOS MUNICIPAIS NESTA DATA</li>", "<p>* FERIADOS EM JULHO:</p> <li>NÃO EXISTEM FERIADOS MUNICIPAIS PARA ESTA DATA</li>", "<p>* FERIADOS EM AGOSTO:</p> <li>NÃO EXISTEM FERIADOS MUNICIPAIS PARA ESTA DATA</li>", "<p>* FERIADOS EM SETEMBRO:</p> <li>07 - Independência do Brasil - Feriado Nacional</li>", "<p>* FERIADOS EM OUTUBRO:</p> <li>12 - Dia de Nossa Senhora Aparecida - Feriado Nacional</li>", "<p>* FERIADOS EM NOVEMBRO:</p> <li>02 - Novembro, Finados - Feriado Nacional</li> <li>15 de novembro, Proclamação da República - Feriado Nacional</li>","<p>* FERIADOS EM DEZEMBRO:</p> <li>25 - Natal - Feriado Nacional</li>" ]
    

    // for (let index = 0; index <= data.length; index++) {        
    //     nomeFuncionario.innerHTML += `<option value="${data[index].nome}">${data[index].nome}</option>`; 

    // }

    var ComparaF = document.querySelector('#nomeFuncionario');
    var comparaFuncionario = ComparaF.options[ComparaF.selectedIndex].value;

    var mesRefe = document.querySelector('#mesReferencia');
    var smesReferencia = mesRefe.options[mesRefe.selectedIndex].value;

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
        </tr>`

        
        diaA++;
        
    }
    


    // for (let inde = 0; inde < 12; inde++) {
    //     mesReferencia.innerHTML += `<option value="${mesR[inde]}" onclick="imprimLivro()">${mesR[inde]}</option>`;
    // }
    // var mesRefe = document.querySelector('#mesReferencia');
    // smesReferencia = mesRefe.options[mesRefe.selectedIndex].value;
    // var mesF = document.querySelector('#mesF').value = smesReferencia;

   

    data.map((func) => {
      
        if (func.nome == comparaFuncionario) {
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
    <td colspan="1">
        <p>MATRÍCULA</p>
        <h5>${func.matricula}</h5>
    </td>
    <td colspan="2">
        <p>EMPREGADO (A)</p>
        <h5>${func.nome}</h2>
    </td>
    <td colspan="1">
        <p>DATA DE ADMISSÃO</p>
        <h5>${func.admissao}</h5>
    </td>
    
</tr>
<tr>
    <td colspan="2">
        <p>CARGO/FUNÇÃO:</p>
        <h5>${func.cargo}</h5>
    </td>
    <td colspan="2">
        <p>CPF:</p>
        <h5>${func.cpf}</h2>
    </td>
    <td colspan="0" hidden>
        <p>DATA DE ADMISSÃO</p>
        <h5>22/09/2023</h5>
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

        }


    });
    

    if (anoReferencia == '2023') {
       
        footTab.innerHTML = `<div>
    <p>* O MÊS DE ${smesReferencia} POSSUI ${temDias} DIAS.</p>
</div>
${feriados[feriadoDia]}`
    } else {
        footTab.innerHTML = `<div>
    <p>* O MÊS DE FEVEREIRO POSSUI ${temDias} DIAS.</p>
</div>
    `
    }
    
    titleFol.innerHTML =  comparaFuncionario + " - " + smesReferencia + "-" + anoReferencia
    window.print()

    geradorL.innerHTML = `<button onclick=" imprimir()"  >IMPRIMIR NOVAMENTE</button>
    <button onclick="loadP()">NOVO</button>`
    


}
//FIM FUNÇÃO IMPRIMIR FOLHA
function imprimir() {
    window.print()
}

function abrirAjuda() {
    const mostraD = document.querySelector('#mostraR');
    const abreA = document.querySelector('#duviasS');
    const primeiraDiv = document.createElement('div');
    const primeiroTexto = document.createElement('p');
    primeiroTexto.innerHTML = `Selecione o funcionário e o mês de referência <br>Configure de acordo com a imagem abaixo:`;
    const imagemEx = document.createElement('img');
    imagemEx.setAttribute('src', '/mostrar-duvidas-sistema.png');
    imagemEx.setAttribute('alt','Duvidas ao usar sistema');
    primeiraDiv.appendChild(primeiroTexto)
    primeiraDiv.appendChild(imagemEx)

    const segundaDiv = document.createElement('div');
    const config = document.createElement('div')
    config.innerHTML = `<h6>Configurações para impressão</h6>
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
    const abreA = document.querySelector('#duviasS').innerHTML = ''
    const mostraD = document.querySelector('#mostraR');
    mostraD.removeAttribute('disabled')
}
//setInterval("imprimLivro()", 1000)
//imprimLivro()

function selecionaMes(extenso) {
    var mesR = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    
    for (let index = 0; index < mesR.length; index++) {
        if (extenso == mesR[index]) {
           var nMes = parseInt([index+1])
        }
        
    }
    return nMes;  

   
}
function total_dias_mes(ano, mes) {
    let date = new Date(ano, mes, 0);
    return date.getDate();
}