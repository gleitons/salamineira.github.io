const url = '/falecimentos-publicar';
localStorage.setItem('imgHomem', '/falecimento/homem-mulher.jpg')
const imgH = localStorage.getItem('imgHomem');

async function falecidos() {
    var tabelaM = 1;
    const response = await fetch(url);
    const data = await response.json();
    const imgM = '/falecimento/desconhecido-mulher.png'
    const vidroR = document.querySelector('.vidroF');
    const tagApelido = document.getElementById('apelidoT');
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





        if (5 > con) {
            const exibir = montarTeste(falec, apel, con, idadeF, mamae);
            lutoTitle.appendChild(exibir)
        } else {
            const exibirBtn = btnFalecido(falec, con, idadeF, mamae)
            lutoTitle.appendChild(exibirBtn);
        }
    });
    const umArray = JSON.stringify(data.sort(ordemCrescente))
    return umArray

}

falecidos();

function tabelaEs(anoNote) {
    cont = 0;
    masc = 0;
    femi = 0;
    data.map((obi) => {
        const datas = obi.falecimento.split("/");
        const ano = datas[2];
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



function contadorObitos() {
    var total = 0;
    var totHomens = 0;
    var totMulheres = 0;
    for (let index = 2025; index >= 1800; index--) {
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
        </tbody>`
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
            </tr>`

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

         
     //     if (myOb[numero].mae.length > 1) {
     //       var mamae = `${filho} de ${myOb[numero].mae}`;
      //  }
      
      

   


      if (imprimiu.length == 0) {
        const mostra = document.getElementById(`cliqueOculto${numero}`);

        mostra.setAttribute('value', 'mostrou');
        mostra.setAttribute('onclick', `desmontar(${numero})`);
        printDiv.classList.toggle('class', 'dnone')
        printDiv.setAttribute('class', 'dblock');
        const falec = myOb[numero - 1];
        const apel = myOb[numero - 1].apelido;
        const con = numero;

        console.log(idadeF)


        const exibir = montarTeste(falec, apel, con, idadeF)
        printDiv.appendChild(exibir)
      }
    


}

function montarTeste(falec, apel, con, idadeF, mamae) {

    getAge
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
    iconeEditar.setAttribute('onclick', `abrirModal(${con})`)
    divBtnEditar.appendChild(iconeEditar);
    divLuto.appendChild(divBtnEditar);

    return divLuto;
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
    icone.setAttribute('class', 'bi bi-star-fill');
    btnF.setAttribute('class', 'btnMostra')
    btnF.appendChild(icone);
    btnF.appendChild(divMostraF)
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
