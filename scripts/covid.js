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
    } else {
        covid_19_01_2022();
    };
}
function covid_19_01_2022(){
    const data = "19/01/2022"
    const ativos = 14;
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