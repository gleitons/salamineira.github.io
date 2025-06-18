


function geraArquivos() {
    const inputs = document.querySelectorAll('input')

    console.log(inputs)

    // INSIRA AS INFORMAÇÕES: <br>
    // <div>SOLICITANTE: <input type="text" name="" id="" value="Solicitante"></div>
    // <div>CPF/CNPJ: <input type="text" name="" id=""> </div>
    // <div>ENDEREÇO DO EVENTO: <input type="text" name="" id=""> </div>
    // <div>BAIRRO: <input type="text" name="" id=""> </div>
    // <div>CEP: <input type="text" name="" id=""> </div>
    // <div>CIDADE: <input type="text" name="" id=""> </div>
    // <div>TEL. DO SOLICITANTE: <input type="text" name="" id=""> </div>

    // DADOS DO EVENTO

    // <div>NOME DO EVENTO: <input type="text" name="" id=""> </div>
    // <div>CRONOGRAMA: <input type="text" name="" id=""> </div>
    // <div>NÚMERO DE PARTICIPANTES: <input type="text" name="" id=""> </div>
    // <div>DATA: <input type="text" name="" id=""> </div>
    // <div>HORÁRIO DE INÍCIO: <input type="text" name="" id=""> </div>
    // <div>HORARIO DE FINALIZAÇÃO: <input type="text" name="" id=""> </div>

    const responsavel = inputs[0].value
    const cpf = inputs[1].value
    const rg = inputs[2].value
    const endereco = inputs[3].value
    const bairro = inputs[3].value
    const cidade = inputs[6].value
    const dataI = inputs[12].value
    const dataF = inputs[13].value
    const horariI = inputs[13].value
    const horariF = inputs[15].value
    const telefoneS = inputs[7].value
    const dataDeHoje = dataHoje()
    const nomeEvento = inputs[8].value
    const enderecoEvento = inputs[10].value
    const cronograma =  inputs[9].value
    const numeroParticipantes = inputs[11].value


    const dados = {
         "responsavel" : inputs[0].value,
         "cpf" : inputs[1].value,
         "rg" : inputs[2].value,
         "endereco" : inputs[3].value,
         "bairro" : inputs[3].value,
         "cidade" : inputs[6].value,
         "dataI" : inputs[12].value,
         "dataF" : inputs[13].value,
         "horariI" : inputs[13].value,
         "horariF" : inputs[15].value,
         "telefoneS" : inputs[7].value,
         "dataDeHoje" : dataHoje(),
         "nomeEvento" : inputs[8].value,
         "enderecoEvento" : inputs[10].value,
         "cronograma" :  inputs[9].value,
         "numeroParticipantes" : inputs[11].value

    
    }



    solicitacao.innerHTML = `<div class="interna">
                <h2>SOLICITAÇÃO PARA EVENTOS OU INTERDIÇÃO DE VIAS PÚBLICAS</h2>
                <h3>DADOS DO RESPONSÁVEL PELO EVENTO:</h3>
                <p><strong>Responsável:</strong> ${responsavel}</p>
                <p><strong>CPF:</strong> ${cpf} </p>
                <p><strong>RG:</strong> ${rg} </p>
                <p><strong>Endereço:</strong> ${endereco}</p>
                <p><strong>Cidade:</strong> ${'Lagoa dos Patos - MG'}</p>
                <p><strong>Contato:</strong> ${telefoneS}</p>
               
                <h3>DADOS DO EVENTO: </h3>

                <p><strong>Motivo:</strong> ${nomeEvento}</p>
                <p><strong>Local da Interdição:</strong>${enderecoEvento}</p>
                <p><strong>Número de participantes:</strong> ${responsavel} </p>
                <p><strong>Data:</strong> ${dataI}; <strong>Horário do início:</strong> ${horariI};
                    <strong>Término:</strong>${horariF} - ${dataF}
                </p> <br><br>

                <p>1: ) - É de responsabilidade da Secretaria Municipal de Transporte, Trânsito e Segurança, somente, a
                    autorização para interdição das vias, cuja análise restringe-se à avaliação do seu impacto no
                    trânsito.</p> <br>
                <p>2: ) - O local deverá ser sinalizado pelo responsável pelo evento, com dispositivos de sinalização de
                    uso temporário estabelecidos no Anexo II do Código de Trânsito Brasileiro.
                </p> <br>
                <p>3: ) - Deverão ser anexados a
                    este requerimento o croqui d localização do evento.</p>
                <p>Lagoa dos Patos - MG, ${dataDeHoje}. </p>
                <div class="assinatura">
                    <p>____________________________________ <br><strong>${responsavel.toString().toUpperCase()}</strong></p>
                </div>
            </div>`
    geraOficio(dados)
}
function geraAutorizacao(dados) {
    autorizacao.innerHTML = `<div class="interna">
                <h2>AUTORIZAÇÃO PARA INTERDIÇÃO DE VIAS PÚBLICAS</h2>
                <h3>DADOS DO RESPONSÁVEL PELO EVENTO:</h3>
                <p><strong>Responsável:</strong> ${dados.responsavel}</p>
                <p><strong>CPF:</strong> ${dados.cpf} </p>
                <p><strong>RG:</strong> ${dados.rg} </p>
                <p><strong>Endereço:</strong> ${dados.endereco}.</p>
                <h3>DADOS DO EVENTO: </h3>

                <p><strong>Motivo:</strong> Realização de Festividade  ${dados.nomeEvento}.</p>
                <p><strong>Local da Interdição:</strong>  ${dados.enderecoEvento}</p>
                <p><strong>Número de participantes:</strong>  ${dados.numeroParticipantes} </p>
                <p><strong>Data:</strong>  ${dados.dataI}; <strong>Horário do início:</strong>  ${dados.horariI};
                    <strong>Término:</strong> ${dados.horariF}  ${dados.dataF}
                </p> <br><br>

                <p>1: ) - É de responsabilidade da Secretaria Municipal de Transporte, Trânsito e Segurança, somente, a
                    autorização para interdição das vias, cuja análise restringe-se à avaliação do seu impacto no
                    trânsito.</p> <br>
                <p>2: ) - O local deverá ser sinalizado pelo responsável pelo evento, com dispositivos de sinalização de
                    uso temporário estabelecidos no Anexo II do Código de Trânsito Brasileiro.
                </p> <br>
                <p>3: ) - Deverão ser anexados a
                    este requerimento o croqui d localização do evento.</p>
                <p>Lagoa dos Patos - MG,  ${dados.dataDeHoje}. </p>
                <div class="assinatura">
                    <p>____________________________________ <br><strong>Secretário de Transporte e Obras</strong></p>
                </div>
            </div>`
}
function geraOficio(dados) {
    oficio.innerHTML = `<div class="interna">
                <h2>OFICIO PMMG - LAGOA DOS PATOS MG</h2>
                <h3>OFICIO 001/2024:</h3>
                <p>Eu ${dados.responsavel}, venho por meio deste informar que estaremos realizando “${dados.nomeEvento}”. Onde o local a ser realizado o evento ${dados.enderecoEvento}, neste município, em anexo croqui da localização do evento, em  Lagoa dos Patos MG.</p>
                <p><strong>Responsável:</strong> ${dados.responsavel}</p>
                <p><strong>CPF:</strong> ${dados.cpf} </p>
                <p><strong>RG:</strong> ${dados.rg} </p>
                <p><strong>Endereço:</strong> ${dados.endereco}.</p>
                <h3>DADOS DO EVENTO: </h3>

                <p><strong>Motivo:</strong> Realização de Festividade  ${dados.nomeEvento}.</p>
                <p><strong>Local da Interdição:</strong>  ${dados.enderecoEvento}</p>
                <p><strong>Número de participantes:</strong>  ${dados.numeroParticipantes} </p>
                <p><strong>Data:</strong>  ${dados.dataI}; <strong>Horário do início:</strong>  ${dados.horariI};
                    <strong>Término:</strong> ${dados.horariF}  ${dados.dataF}
                </p> <br><br>

               
                <p>Lagoa dos Patos - MG,  ${dados.dataDeHoje}. </p>
                <div class="assinatura">
                    <p>____________________________________ <br><strong>${dados.responsavel.toString().toUpperCase()}</strong></p>
                </div>
            </div>`
    geraAutorizacao(dados)
}
function dataHoje() {
    const data = new Date()
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const dia = data.getDate()
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()

    return `${dia} de ${mes} de ${ano}`
}

geraArquivos()
