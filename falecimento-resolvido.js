const url = '/falecimentos-publicar';
localStorage.setItem('imgHomem', 'https://l3gado.s3.amazonaws.com/l3gado/arquivos/vela_site/gif1.gif')
///coroa-homem-mulher-online.jpg
const imgH = localStorage.getItem('imgHomem');

async function geraF() {
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem('falecidos', JSON.stringify(data))
    falecidos()
    insereImage()
}


function insereImage() {
    const itensHtml = document.querySelectorAll('.itensHtml')
    for (let i = 0; i < itensHtml.length; i++) {
        itensHtml[i].innerHTML = `<img src="https://static.wixstatic.com/media/154c4e_0f89712cd4e24c029520bff3c871e76d~mv2.png/v1/fill/w_640,h_258,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/154c4e_0f89712cd4e24c029520bff3c871e76d~mv2.png" alt="Falecimentos obitos mortes em lagoa dos patos mg">`
    }

}


geraF()
function falecidos() {
    const infoD = document.querySelector('#infoDados')
    infoD.style.display = 'none'
    var tabelaM = 1;
    //const response = await fetch(url);
    const data = JSON.parse(localStorage.getItem('falecidos'))
    const imgM = '/img/loadanima.svg'
    const vidroR = document.querySelector('.vidroF');
    const tagApelido = document.getElementById('apelidoT');
    var falecIDi = document.getElementById('lutoTitle');
    data.sort(toDate);

    function ordemCrescente(a, b) {
        return toDate(b) - toDate(a);
    }

    function toDate(fal) {
        const parts = fal.falecimento.split("/");
        const dataFor = new Date(parts[2], parts[1] - 1, parts[0]);
        return dataFor;
    }
    data.sort(toDate)
    data.sort(ordemCrescente);

    var con = 0;
    document.querySelector('#homenagemFalecido').innerHTML = ''
    document.querySelector('#lutoTitle').innerHTML = ''


    data.forEach((falec) => {
        const falecID = falec.falecimento;
        const falecimento = falec.falecimento;
        if (falec.imagem == '') falec.imagem = imgH;
        if (falec.nascimento == "") {
            falec.nascimento = " Nascimento"
        };

        if (falec.sexo == 'm') {
            filho = "Filho"
        } else {
            filho = "Filha"
        }

        if (falec.apelido.length > 0) {
            const doApel = falec.sexo == 'f' ? `Conhecida` : `Conhecido`
            var apel = `${doApel} como ${falec.apelido}`
        }

        if (falec.mae.length > 1) {
            var mamae = `${filho} de ${falec.mae}`;
        }
        con = con + 1;
        const nomeID = falec.nome.replace(/ /g, '');

        const anoF = falec.falecimento.split('/');
        const anoN = falec.nascimento.split('/');
        if (falec.nascimento == ' Nascimento') {
            var idadeF = '';

        } else {
            const anoFalecimento = (`${anoF[2]}-${anoF[1]}-${anoF[0]}`)
            const anoNascimento = (`${anoN[2]}-${anoN[1]}-${anoN[0]}`)
            const idadeFOne = getAge(`${anoNascimento}`, `${anoFalecimento}`);
            var idadeF = parseInt(idadeFOne) + " anos";
        }
        const exibirBtn = btnFalecido(falec, con, idadeF, mamae)
        lutoTitle.appendChild(exibirBtn);
        if (4 >= con) {
            const numeroM1 = Math.floor(Math.random() * (20 - 1) + 1);
            const numeroM2 = Math.floor(Math.random() * (20 - 11) + 11);
            const numeroM3 = Math.floor(Math.random() * (30 - 21) + 21);
            const numeroM4 = Math.floor(Math.random() * (40 - 31) + 31);
            const mensa = [numeroM1, numeroM2, numeroM3, numeroM4]
            const apresenta = mensa[Math.floor(Math.random() * (4 - 1) + 1)]
            const homenagemFalecido = document.querySelector('#homenagemFalecido')

            var divGera = document.createElement('div')
            divGera.setAttribute('class', 'infoLutos');
            const divBottom = document.createElement('div')
            divBottom.innerHTML = `<div class="notaw"><p>${mensagens()[apresenta].mensagem}</p></div>`;

            const exibir = montarTeste(falec, apel, con, idadeF, mamae, falec.id);
            divGera.appendChild(exibir)
            homenagemFalecido.appendChild(divBottom)
            homenagemFalecido.appendChild(divGera)


        }
    });
}


//setTimeout('falecidos()', 10)


function tabelaEs(anoC) {
    //const url = '/falecimentos-publicar'
    //const resposta = await fetch(url);
    const data = JSON.parse(localStorage.getItem('falecidos'))
    var cont = 0;
    var masc = 0;
    var femi = 0;
    data.forEach((obi) => {
        const datas = obi.falecimento.split("/");
        const ano = datas[2];
        if (ano == anoC) {
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



function contadorObitos() {
    const tabBelaBtn = document.querySelector('#btnTabela');
    const tabelaT = document.getElementById('tabEstatistica')
    const carregaPorcent = document.getElementById('carregaPorcent')
    tabBelaBtn.setAttribute('onclick', 'fecharTabela()')
    abrirTabela();
    var total = 0;
    var totHomens = 0;
    var totMulheres = 0;
    var fimI = 2050
    var inici = 1982
    const oneP = fimI - inici
    const fimP = oneP / 100;
    var totalQtd = []
    for (let index = fimI; index >= inici; index--) {
        carregaPorcent.innerHTML = `${index}`
        if (tabelaEs(index) != '0,0,0') {
            var falecimentoAno = tabelaEs(index);
            const linhaTab = document.createElement('tr');
            const colunaTabIndex = document.createElement('td');
            colunaTabIndex.textContent = `${index}`
            const colunaTabFalecOne = document.createElement('td');
            colunaTabFalecOne.textContent = `${falecimentoAno[1]}`
            const colunaTabFalecTwo = document.createElement('td');
            colunaTabFalecTwo.textContent = `${falecimentoAno[2]}`
            const colunaTabFalecTree = document.createElement('td');
            colunaTabFalecTree.textContent = `${falecimentoAno[0]}`
            linhaTab.appendChild(colunaTabIndex);
            linhaTab.appendChild(colunaTabFalecOne);
            linhaTab.appendChild(colunaTabFalecTwo);
            linhaTab.appendChild(colunaTabFalecTree);
            tabelaT.appendChild(linhaTab)
            var totHomens = totHomens + falecimentoAno[1];
            var totMulheres = totMulheres + falecimentoAno[2];
            var total = total + falecimentoAno[0];
            totalQtd.push(index)
        }
    }
    document.querySelector('#totalCont').innerHTML += `
            <tr>
               <td>Total</td>
               <td>${totHomens}</td>
              <td>${totMulheres}</td>
              <td>${total}</td>                                           
          </tr>`
    document.querySelector('#calculando').innerHTML = `<p>Média de : <strong>${Math.floor((total / totalQtd.length))}</strong> mortes por ano</p>`
}

function abrirTabela() {
    const telaTab = document.querySelector('#tabFalec');
    const bttab = document.querySelector('#btnTabela')
    telaTab.style.display = 'block'
    bttab.style.display = 'none'
}
function fecharTabela() {
}
function montarOculto(numero) {
    //const resp = await fetch(url);
    const myOb = JSON.parse(localStorage.getItem('falecidos'))
    myOb.sort(toDate);
    function ordemCrescente(a, b) {
        return toDate(b) - toDate(a);
    }
    function toDate(fal) {
        const parts = fal.falecimento.split("/");
        const dataFor = new Date(parts[2], parts[1] - 1, parts[0]);
        return dataFor;
    }
    myOb.sort(toDate)
    myOb.sort(ordemCrescente);
    const anoF = myOb[numero - 1].falecimento.split('/');
    const anoN = myOb[numero - 1].nascimento.split('/');
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const hoje = today.toLocaleDateString().split('/');
    if (myOb[numero - 1].nascimento == '') {
        var idadeF = '';
        var tempoFalecido = '';
    } else {
        const diaAtual = (`${hoje[2]}-${hoje[1]}-${hoje[0]}`)
        const anoFalecimento = (`${anoF[2]}-${anoF[1]}-${anoF[0]}`)
        const anoNascimento = (`${anoN[2]}-${anoN[1]}-${anoN[0]}`)
        const idadeFOne = getAge(anoNascimento, anoFalecimento);
        var idadeF = parseInt(idadeFOne) + " anos";
        var tempoFalec = diaFalecidos(anoFalecimento)
    }
    const imprimiu = document.getElementById(`cliqueOculto${numero}`).value;
    const divdoBtn = document.createElement('div')
    const printDiv = document.querySelector(`#impri${numero}`);
    if (imprimiu.length == 0) {
        const mostra = document.getElementById(`cliqueOculto${numero}`);
        mostra.setAttribute('value', 'mostrou');
        mostra.setAttribute('onclick', `desmontar(${numero})`);
        printDiv.classList.toggle('class', 'dnone')
        printDiv.setAttribute('class', 'dblock');
        var falec = myOb[numero - 1];
        var apel = myOb[numero - 1].apelido;
        var con = numero;
    }
    const exibir = montarCard(falec, apel, con, idadeF, myOb.mae, tempoFalec)
    divdoBtn.appendChild(exibir)
    printDiv.appendChild(divdoBtn)
    insereImage()
}
setTimeout('homenagemDiaFalecidos()', 2000)

function montarCard(falec, apel, con, idadeF, mamae, tempoFalec, falecCodigo) {
    const imgsF = ["1.jpeg", "6.jpeg", "5.jpeg", "4.png", "3.jpeg", "2.webp", "7.jpeg", "anjo.jpg"]
    if (apel == undefined) apel = ""
    if (mamae == undefined) mamae = ""
    if (falec.nascimento == '') falec.nascimento = ' Nascimento'
    //https://l3gado.s3.amazonaws.com/l3gado/arquivos/vela_site/gif1.gif
    ///coroa-homem-mulher-online.jpg
    if (falec.imagem == '') falec.imagem = 'https://l3gado.s3.amazonaws.com/l3gado/arquivos/vela_site/gif1.gif';

    const divCodigo = document.createElement('div')
    divCodigo.innerHTML = ``
    const iconeE = document.getElementById(`abrirEditar${con}`)
    const divLuto = document.createElement('div');
    // divLuto.setAttribute('style', `background-image: url("/falecimento/1.jpeg");`)   

    divLuto.classList.add('lutosC');
    divLuto.style.backgroundImage = `url('/falecimento/${imgsF[Math.floor(Math.random() * 8)]}')`
    const imgFita = document.createElement('img');
    imgFita.src = ('/imagens/fita-falecimento.png');
    imgFita.classList.add('fita');
    divLuto.appendChild(imgFita);
    const divImgFalecido = document.createElement('div');
    divImgFalecido.classList.add('imagemL');
    divLuto.appendChild(divImgFalecido)
    const imgFalecido = document.createElement('img');
    imgFalecido.src = (`${falec.imagem}`);
    divImgFalecido.appendChild(imgFalecido)
    const divVidro = document.createElement('div')
    divVidro.classList.add('vidroF');
    const nomeFalecido = document.createElement('p');
    const apelidoFalecido = document.createElement('p');
    nomeFalecido.classList.add('nomeF');
    apelidoFalecido.setAttribute('class', 'aplido');
    nomeFalecido.textContent = `${falec.nome}`;
    apelidoFalecido.textContent = `${apel}`;
    apelidoFalecido.setAttribute('id', `apelidoT${apel}${con}`);
    const divNascFale = document.createElement('div');
    divNascFale.setAttribute('class', 'nascFalec');
    const iconeFalecimento = document.createElement('i');
    iconeFalecimento.setAttribute('class', 'bi bi-heartbreak-fill');
    iconeFalecimento.textContent = `${falec.falecimento}`;
    const iconeNacimento = document.createElement('i');
    iconeNacimento.setAttribute('class', 'bi bi-star-fill');
    iconeNacimento.textContent = `${falec.nascimento}`;
    const pStrong = document.createElement('strong');
    const idadefal = document.createElement('p');
    idadefal.textContent = `${idadeF}`;
    idadefal.setAttribute('class', 'aplido');
    idadefal.setAttribute('style', 'margin-bottom:.3em;');
    //const tempof = document.createElement('p');
    //tempof.textContent = `${tempoFalec}`
    //idadefal.appendChild(te   mpof)
    const nomeMae = document.createElement('p');
    nomeMae.setAttribute('class', 'falecMae')
    nomeMae.textContent = `${mamae}`;
    const divNotaFalecimento = document.createElement('div');
    divNotaFalecimento.setAttribute('class', 'nota')
    const NotaFalecimento = document.createElement('p');
    const conteudoHTML = document.createElement('div')
    conteudoHTML.innerHTML = falec.id
    const aNota = falec.nota != '' ? falec.nota : mensagens()[Math.floor(Math.random() * mensagens().length)].mensagem
    NotaFalecimento.textContent = aNota;
    divNotaFalecimento.appendChild(NotaFalecimento);
    pStrong.appendChild(idadefal);
    divNascFale.appendChild(iconeNacimento)
    divNascFale.appendChild(iconeFalecimento);
    divVidro.appendChild(nomeFalecido);
    divVidro.appendChild(apelidoFalecido)
    divVidro.appendChild(divNascFale);
    divVidro.appendChild(pStrong)
    divVidro.appendChild(nomeMae)
    divLuto.appendChild(divVidro);
    divLuto.appendChild(divNotaFalecimento);
    divLuto.appendChild(conteudoHTML)
    divLuto.appendChild(divCodigo)
    const divBtnEditar = document.createElement('div');
    divBtnEditar.classList.add('bntEditar');
    // const iconeEditar = document.createElement('i');
    // iconeEditar.classList.add('bi', "bi-pencil-fill");
    // iconeEditar.textContent = "Editar";
    // iconeEditar.setAttribute('id', `abrirEditar${con}`)
    // iconeEditar.setAttribute('onclick', `abrirEnviar(${con})`)
    // iconeE.style.display = "none"
    divLuto.appendChild(divBtnEditar);
    return divLuto;
}

function montarTeste(falec, apel, con, idadeF, mamae, falecCod) {
    if (apel == undefined) apel = ""
    if (mamae == undefined) mamae = ""
    var mostCID = ''
    falecCod != 0 ? mostCID = falecCod : '';
    const divCodigo = document.createElement('div')
    divCodigo.innerHTML = mostCID
    const divLuto = document.createElement('div');
    divLuto.classList.add('lutosC');
    const imgFita = document.createElement('img');
    imgFita.src = ('/imagens/fita-falecimento.png');
    imgFita.classList.add('fita');
    divLuto.appendChild(imgFita);
    const divImgFalecido = document.createElement('div');
    divImgFalecido.classList.add('imagemL');
    divLuto.appendChild(divImgFalecido)
    const imgFalecido = document.createElement('img');
    imgFalecido.src = (`${falec.imagem}`);
    divImgFalecido.appendChild(imgFalecido)
    const divVidro = document.createElement('div')
    divVidro.classList.add('vidroF');
    const nomeFalecido = document.createElement('p');
    const apelidoFalecido = document.createElement('p');
    nomeFalecido.classList.add('nomeF');
    apelidoFalecido.setAttribute('class', 'aplido');
    nomeFalecido.textContent = `${falec.nome}`;
    apelidoFalecido.textContent = `${apel}`;
    apelidoFalecido.setAttribute('id', `apelidoT${apel}${con}`);
    const divNascFale = document.createElement('div');
    divNascFale.setAttribute('class', 'nascFalec');
    const iconeFalecimento = document.createElement('i');
    iconeFalecimento.setAttribute('class', 'bi bi-heartbreak-fill');
    iconeFalecimento.textContent = `${falec.falecimento}`;
    const iconeNacimento = document.createElement('i');
    iconeNacimento.setAttribute('class', 'bi bi-star-fill');
    iconeNacimento.textContent = `${falec.nascimento}`;
    const pStrong = document.createElement('strong');
    const idadefal = document.createElement('p');
    idadefal.textContent = `${idadeF}`;
    idadefal.setAttribute('class', 'aplido');
    idadefal.setAttribute('style', 'margin-bottom:.3em;');
    const nomeMae = document.createElement('p');
    nomeMae.setAttribute('class', 'falecMae')
    nomeMae.textContent = `${mamae}`;
    const divNotaFalecimento = document.createElement('div');
    divNotaFalecimento.setAttribute('class', 'nota')
    const NotaFalecimento = document.createElement('p');
    NotaFalecimento.textContent = `${falec.nota}`;
    divNotaFalecimento.appendChild(NotaFalecimento);
    pStrong.appendChild(idadefal);
    divNascFale.appendChild(iconeNacimento)
    divNascFale.appendChild(iconeFalecimento);
    divVidro.appendChild(nomeFalecido);
    divVidro.appendChild(apelidoFalecido)
    divVidro.appendChild(divNascFale);
    divVidro.appendChild(pStrong)
    divVidro.appendChild(nomeMae)
    divLuto.appendChild(divVidro);
    divLuto.appendChild(divNotaFalecimento);
    divLuto.appendChild(divCodigo)
    const divBtnEditar = document.createElement('div');
    divBtnEditar.classList.add('bntEditar');
    // const iconeEditar = document.createElement('i');
    // iconeEditar.classList.add('bi', "bi-pencil-fill");
    // iconeEditar.textContent = "Editar";
    // iconeEditar.setAttribute('id', `abrirEditar${con}`)
    // iconeEditar.setAttribute('onclick', `abrirEnviar(${con})`)
    divLuto.appendChild(divBtnEditar);
    return divLuto;
}



function abrirEnviar(numero) {
    //const resp = await fetch(url);
    const myOb = JSON.parse(localStorage.getItem('falecidos'))
    myOb.sort(toDate);
    function ordemCrescente(a, b) {
        return toDate(b) - toDate(a);
    }

    function toDate(fal) {
        const parts = fal.falecimento.split("/");
        const dataFor = new Date(parts[2], parts[1] - 1, parts[0]);
        return dataFor;
    }
    myOb.sort(toDate)
    myOb.sort(ordemCrescente);
    const anoF = myOb[numero - 1].falecimento.split('/');
    const anoN = myOb[numero - 1].nascimento.split('/');
    if (myOb[numero - 1].nascimento == '') {
        var idadeF = '';

    } else {
        const anoFalecimento = (`${anoF[2]}-${anoF[1]}-${anoF[0]}`)
        const anoNascimento = (`${anoN[2]}-${anoN[1]}-${anoN[0]}`)

        const idadeFOne = getAge(anoNascimento, anoFalecimento);
        var idadeF = parseInt(idadeFOne) + " anos";
    }

    const imprimiu = document.getElementById(`cliqueOculto${numero}`).value;
    const printDiv = document.querySelector(`#impri${numero}`);


    if (imprimiu.length == 0) {
        const mostra = document.getElementById(`cliqueOculto${numero}`);

        mostra.setAttribute('value', 'mostrou');
        mostra.setAttribute('onclick', `desmontar(${numero})`);
        printDiv.classList.toggle('class', 'dnone')
        printDiv.setAttribute('class', 'dblock');
        var falec = myOb[numero - 1];
        var apel = myOb[numero - 1].apelido;
        var con = numero;
    }
    const exibir = montarEnvio(falec, apel, con, idadeF, myOb.mae)
    printDiv.appendChild(exibir)
}

function montarEnvio(falec, apel, con, idadeF) {
    const nomeID = falec.nome
    const div = document.querySelector(`#enviarInformacao${con}`)
    const dadosDt = `<div class="modal topod" id="exampleModal${con}" style="display: block;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header dflex">
                <h5 class="modal-title" id="exampleModalLabel${con}"> <i class="bi bi-heart-fill"> Ajude a
                        editar o cadastro de ${nomeID} - ${con}</i></h5>
                <button type="button" class="btn-close btnfechaModal${con}" data-bs-dismiss="modal" aria-label="Close"   onclick="fecharAbrirEnviar(${con})">
                <i class="bi bi-x-lg"></i></button>
            </div>
            <div class="modal-body">
                <form action="https://formsquash.io/f/GQziZ1MKm2rgVMzRsaOZ" method="post">
                    <div class="mb-3">
                    <label for="cars">Selecione:</label>
                    <select class="col-form-label" name="cadastro" id="cadastro${con}">
                    <option value="editar">Editar Cadastro</option>
                    <option value="manter">Manter Cadastro</option>
                    <option value="excluir">Excluir Cadastro</option>
                    </select>
                    <br>
                        <label for="recipient-name" class="col-form-label">Clique em cima do dado e
                            edite:</label> <br>
                        <label class="col-form-label">Nome:</label>
                        <input type="text" class="form-control" id="1_nome_${nomeID}${con}"
                            name="1_nome_${nomeID}${con}"
                            placeholder="${falec.nome} - ${con}">
                        <label class="col-form-label">Apelido:</label>
                        <input type="text" class="form-control" id="2_apelido_${nomeID}${con}" name="2_apelido_${nomeID}${con}" placeholder=" ${falec.apelido}">

                        <label class="col-form-label">Data Nascimento:</label>
                        <input type="date" class="form-control"
                            id="3_nascimento-${nomeID}${con}"
                            name="3_nascimento-${nomeID}${con}">

                        <label class="col-form-label">Data Falecimento:</label>
                        <input type="date" class="form-control"
                            id="4_falecimento-${nomeID}${con}"
                            name="4_falecimento-${nomeID}${con}">

                        <label class="col-form-label">Nome da Mãe:</label>
                        <input type="text" class="form-control" id="5_mae_${nomeID}${con}"
                            name="5_mae22_${nomeID}${con}" placeholder="INSIRA NOME DA MÃE">

                        <label class="col-form-label">Nome do Pai:</label>
                        <input type="text" class="form-control" id="6_pai-${nomeID}${con}"
                            name="6_pai-${nomeID}${con}" placeholder="INSIRA NOME DO PAI">

                        <label class="col-form-label">Foto:</label> <br>
                        <p>Estamos Configurando nosso servidor para receber imagens, volte em breve.</p>
                        <p>Caso deseje, poderá enviar uma foto em especial <a href="/envie-obito-lagoa-dos-patos-mg.html">clicando aqui</a>.</p>
                        
                        <input class="form-control" name="99_imagemLogo" id="valueImg${con}" onchange="previewFile(${con})" accept="image/*" type="hidden" readonly="">

                        <input  type="hidden" name="99_logoImagem64" id="logoEmpresa${con}">
                        <div class="fotoHomenagem">
                            <img src="" alt="" id="previewfoto${con}">
                        </div>
                        <br><label class="col-form-label">Adicione uma Mensagem:</label> <br>
                        <textarea class="form-control" name="9_mensagem-${nomeID}${con}"
                            id="9_mensagem-${nomeID}_${con}" cols="30" rows="5"
                            placeholder="Adicione uma mensagem para ${falec.nome}"></textarea>
                        <input type="hidden" class="form-control" id="hide-${nomeID}"
                            name="hide-${nomeID}${con}"
                            placeholder="${falec.none}">
                        <input type="hidden" class="form-control" id="recipient-name${con}" readonly="">
                        <input type="hidden" id="idFalecimento${nomeID}${con}" value="22">
                    </div>
                    <div class="mb-3">
                        <label for="message-text" class="col-form-label">Mais erros? Descreva
                            abaixo:</label>
                        <textarea class="form-control" id="mais-erros${nomeID}${con}"></textarea>
                    </div>
                    <div class="modal-footer dflex">
                        
                        <button type="button" class="btn btn-secondary " data-bs-dismiss="modal" id="bBaixo${con}"  onclick="fecharAbrirEnviar(${con})">Fechar</button>
                       
                            <input type="submit" class="btn btn-primary"
                                ><i class="bi bi-heart-fill"> Ajudar</i></>
                        
                    </div>
                </form>
                
            </div>
            
        </div>
    </div>
</div>`
    div.innerHTML = dadosDt
    //return div
}

function cardVisto(numero) {
    const card = document.querySelector(`#enviarInformacao${numero}`);
    card.setAttribute('class', 'vistoCard')
    card.innerHTML = `<i class="bi bi-hearts">Obrigado por tentar Editar</i>`
}
function desmontar(numero) {
    const divMontada = document.getElementById(`impri${numero}`);
    const divMButton = document.getElementById(`cliqueOculto${numero}`)
    const iconeE = document.getElementById(`abrirEditar${numero}`)


    divMontada.removeAttribute('class', 'dblock')
    divMontada.innerHTML = "";
    divMButton.setAttribute('onclick', `montarOculto(${numero})`)
    divMButton.setAttribute('value', "");
    iconeE.style.display = "block"

}

function btnFalecido(falec, con, idadeF, mamae) {
    const divBtn = document.createElement('div');
    const btnF = document.createElement('button');
    divBtn.setAttribute('class', 'divMostra')
    divBtn.appendChild(btnF)
    btnF.setAttribute('id', `cliqueOculto${con}`)
    btnF.setAttribute('onclick', `montarOculto(${con})`)
    btnF.setAttribute('value', "")
    const icone = document.createElement('i');
    const divMostraF = document.createElement('div');
    divMostraF.setAttribute('id', `impri${con}`)
    icone.textContent = `${falec.falecimento}`
    btnF.innerHTML = `<strong>${falec.nome}</br>${falec.apelido} </strong></br>`;
    icone.setAttribute('class', 'bi bi-heartbreak-fill');
    btnF.setAttribute('class', 'btnMostra')

    const divLutosc = document.createElement('div');
    divLutosc.setAttribute('class', 'btnEditarV')
    // const iconeEditar = document.createElement('i');
    // iconeEditar.classList.add('bi', "bi-pencil-fill", "btnEd");
    // iconeEditar.textContent = "Editar";
    // iconeEditar.setAttribute('id', `abrirEditar${con}`)
    // iconeEditar.setAttribute('onclick', `abrirEnviar(${con})`)
    const divEnviarInfo = document.createElement('div');
    divEnviarInfo.setAttribute('id', `enviarInformacao${con}`)

    // divLutosc.appendChild(iconeEditar)
    divBtn.appendChild(divLutosc)
    btnF.appendChild(icone);
    btnF.appendChild(divMostraF)
    divBtn.appendChild(divEnviarInfo)
    return divBtn;
    `onclick="ocultarMostar(${con})"
    <button id="cliqueOculto${con}" class="btnMostra" onclick="ocultarMostar(${con})" >${falec.nome} </br><i class="bi bi-star-fill"> ${falec.falecimento}</i></button>`

}




function verficaM(a, b) {
    return a.birthday.getTime() - b.birthday.getTime()
}

function ocultarMostar(numb) {
    const botao = document.querySelector(`#cliqueOculto${numb}`);
    const ocultado = document.querySelector(`#falecOculto${numb}`)

    botao.addEventListener('click', () => {
        ocultado.classList.toggle('dnone');

    })


}

function previewFile(num) {

    const preview = document.querySelector(`img`);
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // convert image file to base64 string
        preview.src = reader.result;


        document.querySelector(`#logoEmpresa${num}`).value = preview.src
        document.querySelector(`#previewfoto${num}`).src = preview.src;

    }, false);

    if (file) {
        reader.readAsDataURL(file);

    }
}

function fecharAbrirEnviar(nume) {
    const bClose = document.getElementById(`bBaixo${nume}`);
    const botaoFecha = document.querySelector(`.btnfechaModal${nume}`);
    const ocultado = document.querySelector(`#exampleModal${nume}`)

    botaoFecha.addEventListener('click', () => {
        ocultado.style.display = "none";

    })
    bClose.addEventListener('click', () => {
        ocultado.style.display = "none";
    })




}

function abrirModal(valor) {
    const abrireEditar = document.querySelector(`#abrirEditar${valor}`);
    const abrirbotao = document.querySelector(`#exampleModal${valor}`);

    abrireEditar.addEventListener('click', () => {
        abrirbotao.style.display = "block";
    })
}

function getAge(nascimento, falecimentoF) {
    var falecimento = new Date(falecimentoF);
    var birthDate = new Date(nascimento);
    var age = falecimento.getFullYear() - birthDate.getFullYear();
    var m = falecimento.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && falecimento.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function diaFalecidos(falecimento) {
    const now = new Date(); // Data de hoje
    const past = new Date(falecimento); // Outra data no passado
    const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
    const dateAnos = days / 365;
    const mesesDias = dateAnos - (dateAnos.toFixed(0))
    var meses = (mesesDias * 365) / 30;
    var diasDM = meses.toFixed(0, 2)
    var mesesC = meses.toFixed();
    var dias = ((meses.toFixed(0)) - (meses.toFixed(3)) * 30)
    if (dateAnos >= 0.70) {
        var an = Math.round(dateAnos.toFixed(2));
        if (an > 1) {
            var anos = `${an} Anos`
        } else {
            var anos = `${an} Ano`
        }

    } else {
        var anos = ''
    }
    if (mesesC > 1) {
        var me = (meses.toFixed(0));
        var mesesON = `${me} Meses`
    } else {
        var mesesON = ''
        dias = ''
    }
    if (dias >= 30 && mesesC > 1) {
        dias = ' ' + days + ' dias'
    } else {
        dias = ''
    }


    // Mostra a diferença em dias
    return ('Aproximadamente ' + anos + mesesON + dias);


}

function homenagemDiaFalecidos() {

    const data = JSON.parse(localStorage.getItem('falecidos'))
    const anexar = document.querySelector('.falecimentoPassado')
    const dH = new Date()
    if (dH.getMonth().toString().length == 1) {
        var mesAddZero = '0' + (dH.getMonth() + 1)
    } else {
        var mesAddZero = (dH.getMonth() + 1)
    }
    const hoje = `${dH.getDate()}/${mesAddZero}/${dH.getFullYear()}`



    if (dH.getDate().toString().length == 1) {
        var diaAddZero = '0' + dH.getDate()
    } else {
        var diaAddZero = dH.getDate()
    }



    const dataCompara = `${diaAddZero}/${mesAddZero}`




    const anoCo = dH.getFullYear()
    data.forEach((e) => {
        const diaMes = e.falecimento.split('/')
        const diaFa = diaMes[0]
        const mesFa = diaMes[1]
        const anoFa = diaMes[2]
        const comF = `${diaFa}/${mesFa}`

        const anosPassados = anoCo - anoFa

        if (dataCompara == comF) {


            const imgFalecido = e.imagem == '' ? 'https://i.giphy.com/media/11S1Zy5SPIqv84/giphy.webp' : e.imagem
            const qtdAnos = anosPassados == 1 ? 'ano</strong> se passou' : 'anos</strong> se passaram'

            anexar.innerHTML += `<div class="hojeSePassa">
                        <div style="background-image: url(${imgFalecido});">                            
                        </div>
                        <span>
                        
                            <h2>${e.nome}</h2>
                            <h3>Hoje ${dataCompara + '/' + anoFa}, <strong>${anosPassados} ${qtdAnos} desde sua partida, sinceros sentimentos aos familiares confortando seus corações e que <strong>${e.nome}</strong> esteja em um bom lugar.</h3>
                            <i class="bi bi-heartbreak-fill"></i> ${e.falecimento}
                        </span>
                        <img src="/falecimento/valas-acesas.gif" alt="">
                        
                    </div>`
        }
        //setTimeout('document.querySelector('.atendimentoWhats').remove()', 5000)


    })

}

function mensagens(numero) {
    return [{
        "mensagem": "A morte é uma certeza, mas continua nos surpreendendo quando chega sem aviso e leva uma pessoa tão querida. Não quero que você me veja chorando nem questionando a vontade de Deus. Tudo o que posso fazer hoje é rezar para que você encontre a luz e nos proteja para sempre."
    },
    {
        "mensagem": "O brilho dos seus olhos, o calor do seu sorriso e a bondade de sua alma ficarão marcados em nossos corações. A sua morte é, sem dúvida, uma grande perda para todos nós. Você sempre deixará saudades, não importa quanto tempo passar."
    },
    {
        "mensagem": "Você sempre foi uma pessoa tão alegre e eu sei que não gostaria de me ver sofrendo. Sua lembrança continua viva em cada canto da casa, cada rua e cada silêncio, mas eu não vou me entregar para a dor. Você que amava a vida, merece me ver sorrindo. Prometo que vou tentar… E um dia vou seguir em frente porque você me dá forças."
    },
    {
        "mensagem": "Só quem já passou por isso consegue imaginar o sofrimento que eu estou sentindo agora. Minha mãe amada, grande amiga e melhor conselheira, deixou este mundo hoje. Mamãe, oro para que seu espírito encontre a paz e o descanso eterno.Suas palavras, seus abraços, sua voz doce, seu sorriso aberto… Tudo isso faz parte de mim e será lembrado todos os dias. Eu te amo eternamente, mãe. Que saudades…"
    },
    {
        "mensagem": "Hoje é mais um dia em que a saudade nos domina e toca conta dos nossos espíritos. O luto permanece entre nós a cada amanhecer…Acredito que, aos poucos, o tempo vai me trazer algum conforto e eu vou aprender a aceitar a sua partida. Até lá, vou tentando estreitar ainda mais os laços entre todos que ficaram e servir de amparo para os outros, algo que eu aprendi com você."
    },
    {
        "mensagem": "Sua voz, sua companhia, seu riso e suas palavras sábias… Tudo isso nos falta agora que você se foi. Ficamos aqui, nos sentindo desamparados sem você, mas sua presença e as memórias de tudo que vivemos são mais fortes que o tempo. Até um dia…"
    },
    {
        "mensagem": "Como é difícil se livrar da dor que se instalou no meu peito desde que você partiu! Meu único consolo é saber que você está bem, em paz, sem sofrimento. Um dia sei que minhas lágrimas de dor vão se transformar em lágrimas de saudades, mas o vazio deixado pela sua perda jamais será preenchido. Descanse em paz!"
    },
    {
        "mensagem": "Para conseguir suportar a sua partida, eu preciso recordar todas as coisas boas que vivemos, pequenos gestos que ficaram gravados na minha memória e que eu vou guardar com todo o carinho. As saudades são eternas, mas o amor é ainda maior."
    },
    {
        "mensagem": "Hoje eu perdi uma pessoa essencial na minha vida! E eu, que vivia dizendo que nunca conseguiria viver sem você, vou ter que aprender a fazer justamente isso. Não será fácil, mas, pelo amor que sempre tive por você, eu prometo que vou tentar. Por favor, me ajude daí de cima quando o fardo parecer pesado demais. Te amarei para sempre!"
    },
    {
        "mensagem": "Nunca estamos preparados para nos despedir para sempre, mesmo sabendo que isso faz parte da vida. Nossos corações estão pesados por perder alguém tão importante e especial... Hoje estamos de luto, lamentando a sua partida, mas celebraremos para sempre sua passagem inesquecível pelo mundo. Descanse em paz."
    }, {
        "mensagem": "Não existe despedida mais triste e dolorosa do que aquela que fazemos, de repente, quando parte alguém que era essencial para a nossa felicidade. É como se arrancassem o tapete debaixo dos nossos pés e continuássemos caindo durante muito tempo…Minha alma está de luto pela sua morte irreparável... Sei que nada será como antes, mas peço que você olhe por mim e me proteja, lá do céu."
    }, {
        "mensagem": "Tio querido, é com o coração apertado que eu escrevo estas palavras e me despeço de você, sabendo que a sua memória ficará comigo para sempre. Agradeço o seu carinho e todas as suas lições, prometo que vou fazer de tudo para você se orgulhar de mim. Vai com Deus, tio, e olha por nós!"
    }, {
        "mensagem": "Hoje o mundo acordou de luto pela perda de um anjo. O vazio que você deixou no meu peito ninguém vai conseguir preencher. Você é um ser de luz, muito diferente de todos que eu já conheci, e talvez por isso tenha partido tão cedo.Apesar de estar com o coração apertado, eu faço questão de sorrir em sua homenagem e agradecer por ter tido a sorte de encontrar alguém com você no meu caminho."
    }, {
        "mensagem": "A partida de uma avó é sempre um momento devastador para qualquer família. Sabemos que é a lei da vida, mas quando precisamos nos despedir, o coração não quer aceitar.Estamos de luto e sabemos que seu lugar nunca será preenchido. Descanse do lado de Deus, nosso amor por você é eterno."
    }, {
        "mensagem": "Uma grande alma nunca morre. Ela nos une cada vez mais."
    }, {
        "mensagem": "Você sempre foi uma grande fonte de inspiração e coragem para todos nós. Suas memórias ficarão para sempre guardadas em nossos corações. Rezo para que sua alma alcance a paz eterna…"
    }, {
        "mensagem": "Já se passaram 7 dias, mas aparece que foi há um segundo que meu coração se quebrou com a notícia do seu falecimento. Sei que você fechou os olhos para sempre, mas para mim continua presente em todos os pequenos gestos do cotidiano. Não existem palavras para traduzir essa saudade…"
    }, {
        "mensagem": "Hoje você partiu e só nos restou a saudade e uma dor enorme. Dói saber que não ouviremos mais suas risadas, não escutaremos mais a sua voz. Dói saber que você não estará mais presente nas comemorações em família.Mas eu sei que a lembrança de quem você foi e todos os bons momentos estarão guardados dentro do coração de cada um de nós. Descanse em paz!"
    }, {
        "mensagem": "O falecimento de um parente tão próximo é sempre um dia de sofrimento e saudade. A família está sentindo a sua falta a cada segundo e orando pelo seu descanso eterno. Por favor, cuida de nós…"
    }, {
        "mensagem": "Mãezinha, já são 30 dias de saudade… Sua partida quebrou meu coração, mas eu prometo que vou fazer de tudo para me reerguer e continuar te enchendo de orgulho. Nesse aniversário de 1 mês do seu falecimento, quero deixar uma homenagem para a mulher mais batalhadora que eu tive a honra de conhecer."
    }, {
        "mensagem": "Eu sei que nenhuma lágrima vai trazer você de volta… Meu coração tenta encontrar sossego, imaginando você em paz, sorrindo, entre as nuvens. Então, eu olho para o céu e agradeço por todas as coisas maravilhosas que você fez (e continuará fazendo) na minha vida."
    }, {
        "mensagem": "É com o coração cheio de mágoa que venho comunicar o falecimento do meu primo querido, um homem maravilhoso que sempre alegrou nossa família com seu espírito generoso e inspirador.Primo, você sempre será um orgulho para nós, descansa em paz e, por favor, cuida da nossa dor nessa hora."
    }, {
        "mensagem": "Dói muito dizer adeus a alguém como você, que sempre foi um sol nas nossas vidas e iluminou tudo o que estava em volta. A sua simpatia e o seu carinho serão repetidos por nós, todos os dias. Que você tenha o descanso eterno que merece, grande guerreiro."
    }, {
        "mensagem": "A vida nos dá a sensação de que temos todo o tempo do mundo pela frente e, do nada, nos prova o quanto é frágil e efêmera. Minha irmã querida, você ainda tinha tanto pela frente, tantos sonhos para concretizar…É muito duro aceitar a sua partida e me despedir da melhor amiga que eu já tive. Prometo que vou fazer de tudo para cuidar da nossa família e, sempre que eu olhar para o céu, estarei pensando em você. Fica com Deus, mana… Eu te amo eternamente!"
    }, {
        "mensagem": "Acordei, mais um dia, de luto pela morte do meu irmão. Uma pessoa que sempre se destacou das outras, repleta de luz e ideias geniais. Foram tantos os planos e os sonhos que ficaram por realizar…Mano, eu espero que você tenha encontrado o seu lugarzinho entre as nuvens. Um dia destes a gente se vê de novo."
    }, {
        "mensagem": "Meu pai querido, eu sei que as saudades vão virar rotina agora que você se foi, mas prometo que você sempre estará guardado em meu coração.Enquanto eu estiver nesse mundo, todos vão saber sobre o homem maravilhoso que eu sempre terei o orgulho de chamar de pai. O amor e a gratidão que eu sinto por você são infinitos. Fica com Deus, eu te amo!"
    }, {
        "mensagem": "Hoje o dia amanheceu triste com a notícia do falecimento de alguém tão querido e importante para nós. As saudades serão infinitas e sua memória estará sempre guardada em nossos corações. Descanse em paz, meu sogro..."
    }, {
        "mensagem": "Meu querido, que o seu sono seja profundo e repleto de paz e harmonia. Acredito, cada vez mais, que um dia nos veremos de novo e tudo vai fazer sentido. Por aqui, eu vou tocando o barco e prometo tentar cuidar de todo mundo, como você sempre me ensinou."
    }, {
        "mensagem": "Sei que um dia nos encontraremos de novo, mas até lá você estará em todos os meus pensamentos. Descanse em paz e até sempre…"
    }, {
        "mensagem": "A saudade eterniza a presença de quem se foi. Com o tempo esta dor se aquieta, se transforma em silêncio que espera, pelos braços da vida, um dia reencontrar."
    }, {
        "mensagem": "Perder um amigo de todas as horas é como perder um irmão. Hoje trago, com muita dor, a notícia do falecimento de um dos maiores companheiros que eu tive a honra de conhecer. Eu sei que você é tão bom que Deus te chamou para o lado dele muito cedo, mas saiba que tem um lugar na nossa mesa que sempre será seu. Saudades hoje e sempre!"
    }, {
        "mensagem": "Vó, você era o pilar que nos segurava, tudo o que nós temos e somos é graças à sua luta. Os valores que você me transmitiu permanecem comigo e serão sempre a bússola que me guia.Obrigada por tudo, meu anjo! Descanse em paz com a certeza de que foi a melhor avó do mundo e também a mais amada."
    }, {
        "mensagem": "Tio(a), meu amor por você não conhece barreiras e vai além da própria morte. Sua presença nesse mundo tocou muitos corações e despertou sorrisos em todos os lugares onde passou. Minha alma está de luto, mas também repleta de gratidão por ter conhecido uma pessoa tão maravilhosa como você."
    }, {
        "mensagem": "Algumas vontades de Deus são difíceis de aceitar… Já passou 1 ano desde o seu falecimento, mas cada dia continua sendo cinzento e preenchido pelas saudades.Rezo para que Deus traga algum consolo para meu coração machucado e prometo que suas memórias caminharão eternamente comigo."
    }, {
        "mensagem": "Uma grande amiga pode ser como um anjo enviado por Deus para cuidar de nós. A minha maior companheira se foi cedo demais e esse vazio no peito não some nunca. Sempre existirão coisas que eu só vou querer contar para você. Espero que você continue me escutando e me guiando lá no céu. Descansa em paz, irmã!"
    }, {
        "mensagem": "Mais que um tio, você foi como um pai para mim. A sua perda quebrou o meu coração, mas sei que vou carregar seus ensinamentos para o resto da vida. Adeus, meu tio querido…"
    }, {
        "mensagem": "Você partiu. Foi embora para bem longe de mim, bem longe da nossa família. Está agora repousando no Senhor. Como será dolorosa daqui pra frente a vida sem você! Mas serei eternamente grata ao Senhor pelo grande privilégio de todos os bons momentos que passamos juntos! Descanse em paz!"
    }, {
        "mensagem": "Meu coração vestiu o luto eterno porque você partiu deste mundo. Não sei como lhe dizer adeus para sempre quando ainda tinha tantas outras coisas para dizer. Queria ter tido mais tempo para dizer, e para fazer tudo que ainda sonhava viver ao seu lado. Agora virão os dias, os meses e os anos. O mundo continuará sua caminhada como antes, mas para mim nada voltará a ser igual. Sentirei sua falta todos os dias. Vá com Deus!"
    }, {
        "mensagem": "Com o coração pesado, oramos para que o nosso Senhor dê o merecido descanso para esta alma que partiu. Meus mais sinceros pêsames."
    },
    {
        "mensagem": "Meus pêsames. Que Deus possa confortar o seu coração neste difícil momento."
    },
    {
        "mensagem": "Meus mais profundos sentimentos para você e para a sua família. Espero que Deus lhe dê o conforto necessário para superar a dor que habita no seu peito neste momento."
    },
    {
        "mensagem": "Que as lembranças alegres de quem partiu floresçam na sua mente e tragam conforto para o seu coração. Meus pêsames."
    },
    {
        "mensagem": "Meus pêsames pela sua perda. Desejo que com o tempo, a sua dor possa diminuir e as boas lembranças de quem se foi prevaleçam na sua mente e no seu coração."
    },
    {
        "mensagem": "Que Deus conforte o seu coração e dê forças para a sua família neste momento."
    },
    {
        "mensagem": "Nós nunca iremos esquecê-lo. Ele foi uma força para muitas pessoas e iluminou a vida de muita gente. Meus pêsames."
    },
    {
        "mensagem": "Espero que Deus possa oferecer o descanso eterno para o seu avô. Tive a honra e o privilégio de conhecê-lo e nunca vou me esquecer das palavras de sabedoria que ele me ofertou. Meus pêsames."
    },
    {
        "mensagem": "Meu amigo, são nessas horas que vale lembrar que você pode contar comigo para o que der e vier. Lamento muito pela sua perda e espero que Deus possa confortar o seu coração neste momento triste que você está passando."
    },
    {
        "mensagem": "Eu sei que o que você está passando neste momento é inexplicavelmente doloroso. Sei também, que nada, nem ninguém neste mundo, pode te preparar para esta inestimável perda. Venho por meio desta mensagem, desejar apenas conforto e paz para o seu coração e o da sua família neste momento. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Meu amigo, saiba que você e a sua família estão rodeados de amor neste momento de tristeza. Pode contar comigo para o que precisar. Meus pêsames."
    },
    {
        "mensagem": "Palavras não secarão as suas lágrimas e os abraços não removerão a sua dor. Mas saiba que neste momento, você está rodeado de pessoas que te amam e que estarão ao seu lado para o que você precisar. Deus te abençoe muito e te dê muita força para conseguir superar este triste momento."
    },
    {
        "mensagem": "Ela era uma pessoa maravilhosa e tenho certeza que ficará para sempre no coração de todos que tiveram o privilégio de conhecê-la. Meus sentimentos pela sua perda, meu grande amigo(a)."
    },
    {
        "mensagem": "Eu só espero que Deus ofereça conforto, paz e esperança para este momento de dor que você está sentindo e que Ele possa acalentar o seu coração e o da sua família."
    },
    {
        "mensagem": "Embora as minhas palavras não possam diminuir o seu sofrimento, saiba que estou orando para que Deus conforte a sua família levando paz para dentro da sua casa. Meus pêsames pela sua perda."
    },
    {
        "mensagem": "Procure nas lembranças um fio de felicidade, busque os seus amigos para te recordar da sua força e saiba que te amamos muito e estamos com você neste momento difícil. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Nos momentos em que nada parece fazer sentido, ore para que Deus possa enviar um pouco de paz para dentro do seu coração. Meus pêsames."
    },
    {
        "mensagem": "Qualquer palavra que dizemos neste momento parece fútil para tentar consolar a dor que emana do seu peito neste momento. Espero apenas que Deus possa levar um pouco de conforto para você e para a sua família nestes dias de luto. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Existem almas que brilham tão forte aqui na Terra, que Papai do Céu reserva um lugar especial no céu para que elas iluminem as nossas noites mais escuras."
    },
    {
        "mensagem": "Ainda estou em choque pela notícia. Gostaria de estar ao seu lado neste momento para tentar levar um pouco de conforto para você e para a sua família."
    },
    {
        "mensagem": "Que Deus possa cuidar da alma que partiu e confortar aqueles que ficaram. Meus mais sinceros sentimentos neste difícil momento de luto."
    },
    {
        "mensagem": "Ele pode ter partido das nossas vidas, mas jamais sairá dos nossos corações. Meus pêsames, amigo."
    },
    {
        "mensagem": "Depois que as lágrimas secarem, o que vai restar serão as memórias felizes de quem partiu. Sei que neste momento a dor fala mais alto e eu oro para que Deus conforte o seu coração. Estou à disposição para o que precisar. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Ele pode ter partido das nossas vidas, mas jamais sairá dos nossos corações. Meus pêsames, amigo."
    },
    {
        "mensagem": "Depois que as lágrimas secarem, o que vai restar serão as memórias felizes de quem partiu. Sei que neste momento a dor fala mais alto e eu oro para que Deus conforte o seu coração. Estou à disposição para o que precisar. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Saiba que estou à disposição da sua família hoje e sempre, meu amigo. Sinto muito pela sua perda. Meus mais sinceros pêsames."
    },
    {
        "mensagem": "Meus pensamentos e as minhas orações estão direcionadas a você e à sua família no dia de hoje. Sinto muito pela sua perda."
    },
    {
        "mensagem": "Meus pêsames, amiga. Sei que é um momento difícil e gostaria de te lembrar que você pode contar comigo para o que precisar. Espero que o nosso Senhor possa confortar o seu coração e o da sua família neste momento."
    },
    {
        "mensagem": "Lembre-se que ela estará no seu coração para toda a eternidade. Meus pêsames pela sua perda."
    },
    {
        "mensagem": "Não existem palavras suficientes que possam expressar o quanto eu lamento a sua perda neste dia. Que Deus traga conforto e paz para sua casa."
    }
    ]
}

function montraInfoImportante() {
    const aDiv = document.querySelector('.infoIm')
    const maisInfo = document.querySelector('.maisInfo')
    if (maisInfo.textContent == '+ Informações importantes') {
        maisInfo.textContent = '^ Fechar'
    } else {
        maisInfo.textContent = '+ Informações importantes'
    }


    aDiv.classList.toggle('dnone')
}
