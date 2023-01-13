const url = '/falecimentos-teste';
localStorage.setItem('imgHomem', '/falecimento/homem-mulher.jpg')
const imgH = localStorage.getItem('imgHomem');

async function falecidos() {
    
    var tabelaM = 1;
    const response = await fetch(url);
    const data = await response.json();
    const imgM = '/falecimento/desconhecido-mulher.png'
    const vidroR = document.querySelector('.vidroF');
    const tagApelido = document.getElementById('apelidoT');
    var falecIDi = document.getElementById('lutoTitle');
    var spanF = document.getElementById('Informa').value;
    
   

    
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

   
        data.map((falec) => {

        const falecID = falec.falecimento;


        const falecimento = falec.falecimento;
        if (falec.imagem == '') falec.imagem = imgH;
        if (falec.nascimento == "") { falec.nascimento = "Desconhecido" };

        if (falec.sexo == 'm') {
            filho = "Filho"
        } else {
            filho = "Filha"
        }

        if (falec.apelido.length > 0) {
            var apel = `Conhecido como ${falec.apelido}`
        }

        if (falec.mae.length > 1) {
            var mamae = `${filho} de ${falec.mae}`;
        }



        con = con + 1;
        const nomeID = falec.nome.replace(/ /g, '');


        const anoF = falec.falecimento.split('/');
        const anoN = falec.nascimento.split('/');
        if (falec.nascimento == 'Desconhecido') {
            var idadeF = '';

        } else {
            const anoFalecimento = (`${anoF[2]}-${anoF[1]}-${anoF[0]}`)
            const anoNascimento = (`${anoN[2]}-${anoN[1]}-${anoN[0]}`)

            const idadeFOne = getAge(`${anoNascimento}`, `${anoFalecimento}`);
            var idadeF = parseInt(idadeFOne) + " anos";

        }
        if (spanF == '1'){

        if (5 > con) {
            var divGera = document.createElement('div')
            divGera.setAttribute('class','infoLutos');
            const divBottom = document.createElement('div')
            divBottom.innerHTML = `<div class="btnEditarV"><i class="bi bi-pencil-fill" id="abrirEditar${con}" onclick="abrirEnviar(${con})">Editar</i></div>
            <div id="enviarInformacao${con}"></div>`
            
            const exibir = montarTeste(falec, apel, con, idadeF, mamae);    
            console.log(exibir)
            divGera.appendChild(exibir)    
            divGera.appendChild(divBottom)
            lutoTitle.appendChild(divGera)
        } else {
            const exibirBtn = btnFalecido(falec, con, idadeF, mamae)
            lutoTitle.appendChild(exibirBtn);
        }
    }
    
    }); 
    

    const umArray = JSON.stringify(data.sort(ordemCrescente))
    spanF.setAttribute('value','2')
   
    return umArray

}

//falecidos();

async function tabelaEs(anoC) {
    const url = '/falecimentos-publicar'
    const resposta = await fetch(url);
    const data = await resposta.json();
    var cont = 0;
    var masc = 0;
    var femi = 0;
   // console.log(data)
    data.map((obi) => {
        const datas = obi.falecimento.split("/");
        //console.log(datas)       
        const ano = datas[2];
        //console.log(ano)
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


async function contadorObitos() {
    const tabBelaBtn = document.querySelector('#btnTabela');
    tabBelaBtn.setAttribute('onclick', 'fecharTabela()')
    abrirTabela();
    //console.log(await tabelaEs(2016) + " numero acima")
    var total = 0;
    var totHomens = 0;
    var totMulheres = 0;
    for (let index = 2025; index >= 1800; index--) {

       


        if (await tabelaEs(index) != '0,0,0') {
            var  falecimentoAno = await tabelaEs(index);
           

            document.getElementById('tabEstatistica').innerHTML += `           
        
            <tr>
                <td>${index}</td>
                <td>${falecimentoAno[1]}</td>
                <td>${falecimentoAno[2]}</td>
                <td>${falecimentoAno[0]}</td>                             
            </tr>                                   
        `
        var total = total + falecimentoAno[0];
        var totHomens =  totHomens + falecimentoAno[1];
        var totMulheres =  totMulheres + falecimentoAno[2];
        }
        
        
    }

    document.querySelector('#totalCont').innerHTML += `
            <tr>
               <td>Total</td>
               <td>${totHomens}</td>
              <td>${totMulheres}</td>
              <td>${total}</td>                             
          </tr>`
    document.querySelector('#calculando').innerHTML = ""

}

function abrirTabela() {
    const telaTab = document.querySelector('#tabFalec');
    const bttab = document.querySelector('#btnTabela')
    telaTab.style.display = 'block'
    bttab.style.display = 'none'
}
function fecharTabela() {
    // const telaTab = document.querySelector('#tabEstatistica');
    // telaTab.style.display = 'none'
    // telaTab.remove()
    // const tabBelaBtn = document.querySelector('#btnTabela');
    // tabBelaBtn.setAttribute('onclick', 'contadorObitos()')
}

async function montarOculto(numero) {
    const resp = await falecidos();
    const myOb = await JSON.parse(resp)

    const imprimiu = document.getElementById(`cliqueOculto${numero}`).value;
    const printDiv = document.querySelector(`#impri${numero}`);

  
        const anoF = myOb[numero].falecimento.split('/');
        const anoN = myOb[numero - 1].nascimento.split('/');

        if (myOb[numero-1].nascimento == 'Desconhecido') {
            var idadeF = '';

        } else {
            const anoFalecimento = (`${anoF[2]}-${anoF[1]}-${anoF[0]}`)
            const anoNascimento = (`${anoN[2]}-${anoN[1]}-${anoN[0]}`)

            var idadeFOne = getAge(`${anoNascimento}`, `${anoFalecimento}`);
            var idadeF = parseInt(idadeFOne) + " anos";
           

        }
      if (imprimiu.length == 0) {
        const mostra = document.getElementById(`cliqueOculto${numero}`);

        mostra.setAttribute('value', 'mostrou');
        mostra.setAttribute('onclick', `desmontar(${numero})`);
        printDiv.classList.toggle('class', 'dnone')
        printDiv.setAttribute('class', 'dblock');
        const falec = myOb[numero - 1];
        const apel = myOb[numero - 1].apelido;
        const con = numero;

        //console.log(idadeF)


        const exibir = montarTeste(falec, apel, con, idadeF)
        printDiv.appendChild(exibir)
      }
    


}

function montarTeste(falec, apel, con, idadeF, mamae) {
   
    
    if (apel == undefined) apel = ""
    if (mamae == undefined) mamae = ""

   

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
    const divBtnEditar = document.createElement('div');
    divBtnEditar.classList.add('bntEditar');
    const iconeEditar = document.createElement('i');
    iconeEditar.classList.add('bi', "bi-pencil-fill");
    iconeEditar.textContent = "Editar";
    iconeEditar.setAttribute('id', `abrirEditar${con}`)
    iconeEditar.setAttribute('onclick', `abrirEnviar(${con})`)
    //divGeral.appendChild(divLuto)
   
    //divBtnEditar.appendChild(iconeEditar);
    divLuto.appendChild(divBtnEditar);

    return divLuto;
}

async function abrirEnviar(numero) {

    const response = await falecidos();
    const data = await JSON.parse(response)
    var falecIDi = document.querySelector('#lutoTitle')

    //console.log(data)
    const divModal = document.createElement('div')
    divModal.setAttribute('class','modal')
    divModal.setAttribute('id', `exampleModal${numero}`)

    const divModalDialog = document.createElement('div')
    divModalDialog.setAttribute('class', 'modal-dialog')
    divModal.appendChild(divModalDialog)

    const divModalContent = document.createElement('div')
    divModalContent.setAttribute('class', 'modal-content')
    divModalContent.textContent = `Fechando pop - ${data[numero-1].nome} Numero ${numero}`
    divModalDialog.appendChild(divModalContent)

    const divMFooter = document.createElement('div');
    divMFooter.setAttribute('class', 'modal-footer dflex');
    divModalContent.appendChild(divMFooter)

    const btnFechar = document.createElement('button');
    btnFechar.setAttribute('type', 'button');
    btnFechar.setAttribute('class','btn btn-secondary');
    btnFechar.setAttribute('id', `bBaixo${numero}`);
    btnFechar.setAttribute('onclick', `cardVisto(${numero})`)
    btnFechar.textContent = "Fechar"

    divModalContent.appendChild(btnFechar)

    
    //console.log(div);
    const div = document.querySelector(`#enviarInformacao${numero}`)
    
    
    
    div.appendChild(divModal)
    console.log(div);
   return div


     `<div class="modal-footer dflex">
                            
                            <button type="button" class="btn btn-secondary " data-bs-dismiss="modal" id="bBaixo${numero}"  onclick="fecharAbrirEnviar(${numero})">Fechar</button>
                           
                            <input type="submit" class="btn btn-primary"
                                ><i class="bi bi-heart-fill"> Ajudar</i></>
                        
                    </div>`
    
}
function cardVisto(numero) {
    const card = document.querySelector(`#enviarInformacao${numero}`);
    card.setAttribute('class', 'vistoCard')
    card.innerHTML = `<i class="bi bi-hearts">Obrigado por tentar Editar</i>`
}
//console.log(abrirEnviar())

function montarEnviarInfo() {
   ` <div class="modal" id="exampleModal${con}" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header dflex">
                    <h5 class="modal-title" id="exampleModalLabel${con}"> <i class="bi bi-heart-fill"> Ajude a
                            editar o cadastro de ${falec.nome} - ${con}</i></h5>
                    <button type="button" class="btn-close btnfechaModal${con}" data-bs-dismiss="modal" aria-label="Close"   onclick="fecharAbrirEnviar(${con})"><i
                            class="bi bi-x-lg"></i></button>
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
                            <input type="text" class="form-control"
                                id="2_apelido_${nomeID}${con}"
                                name="2_apelido_${nomeID}${con}" placeholder=" ${falec.apelido}">

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
}



function desmontar(numero) {
    const divMontada = document.getElementById(`impri${numero}`);
    const divMButton = document.getElementById(`cliqueOculto${numero}`)

    divMontada.removeAttribute('class', 'dblock')
    divMontada.innerHTML = "";
    divMButton.setAttribute('onclick', `montarOculto(${numero})`)
    divMButton.setAttribute('value', "");

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
    btnF.innerHTML = `<strong>${falec.nome} </strong></br>`;
    icone.setAttribute('class', 'bi bi-heartbreak-fill');
    btnF.setAttribute('class', 'btnMostra')

    const divLutosc = document.createElement('div');
    divLutosc.setAttribute('class', 'btnEditarV')
    const iconeEditar = document.createElement('i');
    iconeEditar.classList.add('bi', "bi-pencil-fill");
    iconeEditar.textContent = "Editar";
    iconeEditar.setAttribute('id', `abrirEditar${con}`)
    iconeEditar.setAttribute('onclick', `abrirEnviar(${con})`)
    const divEnviarInfo = document.createElement('div');
    divEnviarInfo.setAttribute('id', `enviarInformacao${con}`)

    divLutosc.appendChild(iconeEditar)
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
