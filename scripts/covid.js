/*---COVID-19 LAGOA DOS PATOS MG ------*/
function covidRecente(){
    const selecioneDia = document.getElementById('selectDia').value;
    if (selecioneDia == "19_01_2021") {
        covid_19_01_2022();
    } else if(selecioneDia == "22_01_2022"){
        covid_22_01_2022();
    } 
    else if(selecioneDia == "18_01_2022"){
        covid_18_01_2022();
    } else if(selecioneDia == "14_01_2021"){
        covid_14_01_2021();
    } else if(selecioneDia == "12_02_2021"){
        covid_12_02_2021();
    }
     else if(selecioneDia == "26_02_2021"){
        covid_26_02_2021();
    } else if(selecioneDia == "03_03_2021"){
        covid_03_03_2021();
    } else if(selecioneDia == "25_03_2021"){
        covid_25_03_2021();
    }else if(selecioneDia == "06_04_2021"){
        covid_06_04_2021();
    } else if(selecioneDia == "16_04_2021"){
        covid_16_04_2021();
    } 
    else if(selecioneDia == "13_05_2021"){
        covid_13_05_2021();
    } else if(selecioneDia == "22_06_2021"){
        covid_22_06_2021();
    } else if(selecioneDia == "01_07_2021"){
        covid_01_07_2021();
    } else if(selecioneDia == "10_07_2021"){
        covid_10_07_2021();
    } else if(selecioneDia == "13_07_2021"){
        covid_13_07_2021();
    } else if(selecioneDia == "16_08_2021"){
        covid_16_08_2021();
    } else if(selecioneDia == "24_08_2021"){
        covid_24_08_2021();
    } else if(selecioneDia == "25_08_2021"){
        covid_25_08_2021();
    } else if(selecioneDia == "27_08_2021"){
        covid_27_08_2021();
    } else if(selecioneDia == "31_08_2021"){
        covid_31_08_2021();
    } else if(selecioneDia == "10_09_2021"){
        covid_10_09_2021();
    } else if(selecioneDia == "19_01_2022"){
        covid_19_01_2022();
    } 
    else if(selecioneDia == "28_01_2022"){
        covid_28_01_2022();
    } 
    else if(selecioneDia == "31_01_2022"){
        covid_31_01_2022();
    } 
    else if(selecioneDia == "02_02_2022"){
        covid_02_02_2022();
    } else if(selecioneDia == "08_02_2022"){
        covid_08_02_2022()
    } else if(selecioneDia == "15_02_2022"){
        covid_15_02_2022()
    } else if(selecioneDia == "18_02_2022"){
        covid_18_02_2022()
    } else if(selecioneDia == "23_02_2022"){
        covid_23_02_2022()
    } else if(selecioneDia == "23_02_2022"){
        covid_02_03_2022()
    } else if(selecioneDia == "10_07_2020"){
        covid_10_07_2020()
    } 
    else {
        
        covid_02_03_2022();
    };
}



function estyleColor(valor){
    const moduloSuspeito = document.getElementById('colInfoCovid');
    const corLetraCovid = document.getElementById('suspeitos');
    if (valor <= 2) {
        moduloSuspeito.style.backgroundColor = 'rgb(25, 255, 25)';
        corLetraCovid.style.color = 'black';
    } else if(valor <= 5 && valor >= 3){
        moduloSuspeito.style.backgroundColor = 'rgb(0, 130, 0)';
    } else if(valor <= 10 && valor >= 6){
        moduloSuspeito.style.backgroundColor = 'rgb(222, 254, 15)';
        corLetraCovid.style.color = 'black';
    } else if(valor <= 15 && valor >= 11){
        moduloSuspeito.style.backgroundColor = 'rgb(242, 105, 0)';
        corLetraCovid.style.color = 'white';
    } else {
        moduloSuspeito.style.backgroundColor = 'red';
        corLetraCovid.style.color = 'white';
    }
}
function covid_02_03_2022(){
    const data = "02/03/2022"
    const ativos = 08;
    const descartadoss = 662;
    const confirmadoss = 228;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "01";
    const curadoss = "219";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}

function covid_23_02_2022(){
    const data = "23/02/2022"
    const ativos = 09;
    const descartadoss = 641;
    const confirmadoss = 220;
    const internadoss = "02";
    const isolamentos = "02";    
    const obitoss = "01";
    const curadoss = "210";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_10_07_2020(){
    const data = "23/02/2022"
    const ativos = 01;
    const descartadoss = 2;
    const confirmadoss = 1;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "00";
    const curadoss = "0";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"imagens/1-caso-de-coronavirus-em-lagoa-dos-patos-mg-covid-19-lagoa-dos-patos-mg.png" alt = "1 caso de covid lagoa dos patos mg 1 caso de coronavirus em lagoa dos patos mg 20/07/2020"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}

function covid_18_02_2022(){
    const data = "18/02/2022"
    const ativos = 06;
    const descartadoss = 625;
    const confirmadoss = 212;
    const internadoss = "01";
    const isolamentos = "01";    
    const obitoss = "01";
    const curadoss = "205";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_15_02_2022(){
    const data = "15/02/2022"
    const ativos = 05;
    const descartadoss = 615;
    const confirmadoss = 209;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "01";
    const curadoss = "203";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_08_02_2022(){
    const data = "08/02/2022"
    const ativos = 09;
    const descartadoss = 602;
    const confirmadoss = 202;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "01";
    const curadoss = "192";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_02_02_2022(){
    const data = "02/02/2022"
    const ativos = 30;
    const descartadoss = 587;
    const confirmadoss = 196;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "01";
    const curadoss = "165";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_31_01_2022(){
    const data = "31/01/2022"
    const ativos = 17;
    const descartadoss = 562;
    const confirmadoss = 181;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "01";
    const curadoss = "163";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_22_01_2022(){
    const data = "22/01/2022"
    const ativos = 18;
    const descartadoss = 535;
    const confirmadoss = 156;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "01";
    const curadoss = "137";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_19_01_2022(){
    const data = "19/01/2022"
    const ativos = 15;
    const descartadoss = 526;
    const confirmadoss = 152;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "01";
    const curadoss = "136";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   
    
    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]


    
}
function covid_28_01_2022(){
    const data = "28/01/2022"
    const ativos = 17;
    const descartadoss = 552;
    const confirmadoss = 174;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "01";
    const curadoss = "155";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]    
}


function covid_18_01_2022(){
    const data = "19/01/2022";
    const ativos = 11;
    const descartadoss = 519;
    const confirmadoss = 148;
    const internadoss = "00";
    const isolamentos = "00";    
    const obitoss = "01";
    const curadoss = "136";
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   
    
    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]    
}
function covid_10_09_2021(){
    const data = "10/09/2021"    
    const ativos = 10;
    const descartadoss = 386;
    const confirmadoss = 127;
    const internadoss = 0;
    const isolamentos = 00;    
    const obitoss = 01;
    const curadoss = 121;


    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

}
function covid_31_08_2021(){
    const data = "31/08/2021"    
    const ativos = 23;
    const descartadoss = 372;
    const confirmadoss = 120;
    const internadoss = 0;
    const isolamentos = 00;    
    const obitoss = 01;
    const curadoss = 96;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

}
function covid_27_08_2021(){
    const data = "27/08/2021"    
    const ativos = 19;
    const descartadoss = 358;
    const confirmadoss = 115;
    const internadoss = 0;
    const isolamentos = 00;    
    const obitoss = 01;
    const curadoss = 95;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

}
function covid_25_08_2021(){
    const data = "25/08/2021"    
    const ativos = 13;
    const descartadoss = 352;
    const confirmadoss = 109;
    const internadoss = 0;
    const isolamentos = 00;    
    const obitoss = 01;
    const curadoss = 95;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

}
function covid_24_08_2021(){
    const data = "24/08/2021"    
    const ativos = 11;
    const descartadoss = 350;
    const confirmadoss = 107;
    const internadoss = 0;
    const isolamentos = 00;    
    const obitoss = 01;
    const curadoss = 95;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

}
function covid_16_08_2021(){
    const data = "16/08/2021"    
    const ativos = 02;
    const descartadoss = 341;
    const confirmadoss = 96;
    const internadoss = 0;
    const isolamentos = 05;    
    const obitoss = 01;
    const curadoss = 93;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   
    
    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

}
function covid_13_07_2021(){
    const data = "13/07/2021"    
    const ativos = 11;
    const descartadoss = 304;
    const confirmadoss = 92;
    const internadoss = 0;
    const isolamentos = 05;    
    const obitoss = 01;
    const curadoss = 81;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

}
function covid_10_07_2021(){
    const data = "10/07/2021"    
    const ativos = 07;
    const descartadoss = 288;
    const confirmadoss = 86;
    const internadoss = 0;
    const isolamentos = 04;    
    const obitoss = 01;
    const curadoss = 79;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;  
    
    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

}
function covid_01_07_2021(){
    const data = "01/07/2021"    
    const ativos = 12;
    const descartadoss = 271;
    const confirmadoss = 82;
    const internadoss = 0;
    const isolamentos = 05;    
    const obitoss = 01;
    const curadoss = 70;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

}
function covid_22_06_2021(){
    const data = "22/06/2021"    
    const ativos = 02;
    const descartadoss = 255;
    const confirmadoss = 69;
    const internadoss = 0;
    const isolamentos = 06;    
    const obitoss = 01;
    const curadoss = 67;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_13_05_2021(){
    const data = "13/05/2021"
    const ativos = 03;
    const descartadoss = 235;
    const confirmadoss = 61;
    const internadoss = 0;
    const isolamentos = 07;    
    const obitoss = 01;
    const curadoss = 58;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_16_04_2021(){
    const data = "16/04/2021"
    const ativos = 03;
    const descartadoss = 221;
    const confirmadoss = 48;
    const internadoss = 0;
    const isolamentos = 05;    
    const obitoss = 01;
    const curadoss = 45;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_06_04_2021(){
    const data = "06/04/2021"
    const ativos = 04;
    const descartadoss = 210;
    const confirmadoss = 44;
    const internadoss = 0;
    const isolamentos = 04;    
    const obitoss = 01;
    const curadoss = 40;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}

function covid_25_03_2021(){
    const data = "25/03/2021"
    const ativos = 03;
    const descartadoss = 164;
    const confirmadoss = 39;
    const internadoss = 0;
    const isolamentos = 06;    
    const obitoss = 01;
    const curadoss = 36;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_03_03_2021(){
    const data = "03/03/2021"
    const ativos = 04;
    const descartadoss = 175;
    const confirmadoss = 35;
    const internadoss = 0;
    const isolamentos = 02;    
    const obitoss = 00;
    const curadoss = 31;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;   
    
    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_26_02_2021(){
    const data = "26/02/2021"
    const ativos = 02;
    const descartadoss = 172;
    const confirmadoss = 33;
    const internadoss = 0;
    const isolamentos = 03;    
    const obitoss = 00;
    const curadoss = 31;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}
function covid_12_02_2021(){
    const data = "12/02/2021"
    const ativos = 06;
    const descartadoss = 165;
    const confirmadoss = 31;
    const internadoss = 0;
    const isolamentos = 02;    
    const obitoss = 00;
    const curadoss = 25;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}

function covid_14_01_2021(){
    const data = "14/01/2021"
    const ativos = 02;
    const descartadoss = 151;
    const confirmadoss = 25;
    const internadoss = 0;
    const isolamentos = 08;    
    const obitoss = 00;
    const curadoss = 23;
    const notF = descartadoss+confirmadoss;
    const dia = data.slice(0,2)
    const mes = data.slice(3,5)
    const ano = data.slice(6)
    const ativoss= estyleColor(ativos);
    
    const tImagem = document.getElementById('trocaImagemCovid').src = `"/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-${dia}-${mes}-${ano}.jpg"`; 



    dataC.innerHTML = `${data} `
    suspeitos.innerHTML = `${ativos}`;
    confirmados.innerHTML = `${confirmadoss}`;
    internados.innerHTML = `${internadoss}`;
    isolamento.innerHTML = `${isolamentos}`;
    descartados.innerHTML = `${descartadoss}`;
    obitos.innerHTML = `${obitoss}`;
    curados.innerHTML = `${curadoss}`;
    notificados.innerHTML = `${notF}`;
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;    

    return [data, ativos, descartadoss,confirmadoss, internadoss, isolamentos, obitoss, curadoss]

    
}

function vejaimgCovid(){
    const cImage = document.getElementById('verImg');
    const imgcovid = document.getElementById('imgcovid');
   
    cImage.textContent = 'Fechar Imagem' 
    imgcovid.classList.toggle('dnone');
     
   
       
    
    
      

}
function fechaimgCovid(){
    const imgcovid = document.getElementById('imgcovid');
    imgcovid.addEventListener('click',
    imgcovid.classList.add('dnone')); 
}