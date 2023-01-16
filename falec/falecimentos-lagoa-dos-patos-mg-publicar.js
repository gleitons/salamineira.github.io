



const url = '/falecimentos-publicar';
localStorage.setItem('imgHomem', '/falecimento/desconhecido-homem.png')
const imgH = localStorage.getItem('imgHomem');



async function falecidos() {


    const response = await fetch(url);



    const data = await response.json();

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
        document.querySelector('#testt').innerHTML = '<p>Estatísticas: Sempre atualizamos nossos dados, baseado na API <a href="https://falecidosnobrasil.org.br/resultado2.php?&nome=nome&id_ees=MG&id_ecd=1990&exata=false" href="_blank">falecidosnobrasil.org.br</a> para enviar uma homenagem a um falecido, envie-nos um e-mail para <a href="/envie-obito-lagoa-dos-patos-mg.html">clique Aqui</a></p> <p class="infoG"><strong>*ATENÇÃO -</strong> Todos os nossos dados são retirados do site acima, caso tenha alguma informação errada neste artigo, favor clicar em editar, os dados podem estar desatualizados, então no caso, poderá ser resolvido clicando em editar, onde poderá alterar ou excluir da nossa base de dados no botão que está abaixo da mensagem do falecido. Você pode nos ajudar com os dados dos nossos conterrâneos, basta<strong>clicar 2x no botão</strong> <i class="bi bi-pencil-fill" id="abrirEditar${con}" onclick="abrirModal(${con})"> Editar</i> para atualizar o nosso banco de dados.</p>'
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
            filho = "Filha"
        }

        if (falec.apelido == "") {


            var apel = "";
        } else {
            var apel = `Conhecido como ${falec.apelido}`
        }
        if (falec.mae == "") {
            var mamae = "";
        } else {
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

            document.querySelector('#lutoTitle').innerHTML += `
                <div class="lutosC">
                    <img class="fita" src="/imagens/fita-falecimento.png" alt="">
                    <div class="imagemL">
                        <img src="${falec.imagem}" alt="">
                    </div>
                    <div class="vidroF">
                        <p class="nomeF">${falec.nome}</p>
                        <p class="aplido" id="apelidoT${apel}${con}">${apel}</p>
                       
                        <div class="nascFalec">
                            <i class="bi bi-star-fill"> ${falec.nascimento}</i>
                            <i class="bi bi-heartbreak-fill"> ${falec.falecimento}</i>
                        </div>
                        <strong>
                            <p class="aplido" style="margin-bottom:.3em;">${idadeF}</p>
                        </strong>
                       
                        <p class="falecMae">${mamae}</p>
                    </div>
                    <div class="nota">
                        <p>${falec.nota}</p>
                    </div>
                    <div class="bntEditar">
                                        <i class="bi bi-pencil-fill" id="abrirEditar${con}" onclick="abrirModal(${con})"> Editar</i>
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
                                            <strong>
                                            <p class="aplido " style="margin-bottom:.3em;" ">${idadeF}</p>
                                        </strong>
                                            <p class="falecMae">${mamae}</p>
                                        </div>
                                        <div class="nota">
                                            <p>${falec.nota}</p>
                                        </div>
                                        <div class="bntEditar">
                                        <i class="bi bi-pencil-fill" id="abrirEditar${con}" onclick="abrirModal(${con})"> Editar</i>
                                    </div>
                                    </div>
                                </div>
                            </div>
            `;



        }

        document.querySelector('#enviarDados').innerHTML += `
        <div class="modal" id="exampleModal${con}" style="display: none;">
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
    </div>
`




    });
}

falecidos();





function verficaM(a, b) {
    return a.birthday.getTime() - b.birthday.getTime()
}

function ocultarMostar(numb) {
    const botao = document.querySelector(`#cliqueOculto${numb}`);
    const ocultado = document.querySelector(`#falecOculto${numb}`)
  
    botao.addEventListener('click', () => {
        if ( ocultado.classList.contains('dnone') == true) {
            ocultado.classList.remove('dnone');
        } else {
            ocultado.classList.add('dnone');
        }
       

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
