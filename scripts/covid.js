/*---COVID-19 LAGOA DOS PATOS MG ------*/
function covidRecente(){
    const selecioneDia = document.getElementById('selectDia').value;
    if (selecioneDia == "19_01_2021") {
        covid_19_01_2022();
    } else if(selecioneDia == "18_01_2022"){
        covid_18_01_2022();
    } else if(selecioneDia == "14_01_2021"){
        covid_14_01_2021();
    } else if(selecioneDia == "12_02_2021"){
        covid_12_02_2021();
    } else if(selecioneDia == "26_02_2021"){
        covid_26_02_2021();
    } else if(selecioneDia == "03_03_2021"){
        covid_03_03_2021();
    } else if(selecioneDia == "25_03_2021"){
        covid_25_03_2021();
    }else if(selecioneDia == "06_04_2021"){
        covid_06_04_2021();
    } else if(selecioneDia == "16_04_2021"){
        covid_16_04_2021();
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
    }
    else {
        covid_19_01_2022();
    };
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
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-13-05-2021.jpg"; 

    dataC.innerHTML = `${data}`
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
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-16-04-2021.jpg"; 

    dataC.innerHTML = `${data}`
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
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-06-04-2021.jpg"; 

    dataC.innerHTML = `${data}`
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
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-25-03-2021.jpg"; 

    dataC.innerHTML = `${data}`
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
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-03-03-2021.jpg"; 

    dataC.innerHTML = `${data}`
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
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-26-02-2021.jpg"; 

    dataC.innerHTML = `${data}`
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
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-12-02-2021.jpg"; 

    dataC.innerHTML = `${data}`
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
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-19-01-2022.jpg"; 

    dataC.innerHTML = `${data}`
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
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-14-01-2021.jpg"; 

    dataC.innerHTML = `${data}`
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
    
}
function covid_18_01_2022(){
    const data = "19/01/2022"
    
    const desc = 519;
    const conf = 148;
    const notF = desc+conf;
    const tImagem = document.getElementById('trocaImagemCovid').src = "/imagens-sala/2022/01/covid-19-lagoa-dos-patos-mg/covid-19-lagoa-dos-patos-mg-18-01-2022.jpg"; 
    suspeitos.innerHTML = "11";
    confirmados.innerHTML = `${conf}`;
    internados.innerHTML = "00";
    isolamento.innerHTML = "00";
    descartados.innerHTML = `${desc}`;
    obitos.innerHTML = "01";
    curados.innerHTML = "136";
    notificados.innerHTML = `${notF}`;
    
    imgcovid.innerHTML = `<p>Clique na imagem para fechar</p>
    <img id="trocaImagemCovid" src=${tImagem} onclick="fechaimgCovid()" alt="covid-19 Lagoa dos Patos MG">`;
    
}
function vejaimgCovid(){
    const cImage = document.getElementById('verImg');
    const imgcovid = document.getElementById('imgcovid');
    cImage.addEventListener('click',
    imgcovid.classList.remove('dnone'));            

}
function fechaimgCovid(){
    const imgcovid = document.getElementById('imgcovid');
    imgcovid.addEventListener('click',
    imgcovid.classList.add('dnone')); 
}