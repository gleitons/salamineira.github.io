


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
    const mg = inputs[2].value
    const endereco = inputs[3].value
    const bairro = inputs[3].value
    const dataI = inputs[0].value
    const dataF = ''
    const horariI = ''
    const horariF = ''
    const dataDeHoje = dataHoje()

    const dados = {
        "responsavel": responsavel,
        "cpf": cpf,
        "mg": mg
    }



    solicitacao.innerHTML = `<div class="interna">
                <h2>SOLICITAÇÃO PARA EVENTOS OU INTERDIÇÃO DE VIAS PÚBLICAS</h2>
                <h3>DADOS DO RESPONSÁVEL PELO EVENTO:</h3>
                <p><strong>Responsável:</strong> ${responsavel}</p>
                <p><strong>CPF:</strong> 070.190.156-03 </p>
                <p><strong>RG:</strong> MG-14.194.825 </p>
                <p><strong>Endereço:</strong> Rua Aristides, esquina com Fernão Dias.</p>
                <h3>DADOS DO EVENTO: </h3>

                <p><strong>Motivo:</strong> Realização de Festividade de quadrilha “FESTA JUNINA DA VIZINHANÇA”.</p>
                <p><strong>Local da Interdição:</strong> Rua Aristides, esquina com Fernão Dias</p>
                <p><strong>Número de participantes:</strong> Indeterminado. </p>
                <p><strong>Data:</strong> 15/06/2019; <strong>Horário do início:</strong> 08:00;
                    <strong>Término:</strong> 02:00 (16/06/2019)
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
                <p><strong>Responsável:</strong> IVANILSON DE DEUS CARDOSO</p>
                <p><strong>CPF:</strong> 070.190.156-03 </p>
                <p><strong>RG:</strong> MG-14.194.825 </p>
                <p><strong>Endereço:</strong> Rua Aristides, esquina com Fernão Dias.</p>
                <h3>DADOS DO EVENTO: </h3>

                <p><strong>Motivo:</strong> Realização de Festividade de quadrilha “FESTA JUNINA DA VIZINHANÇA”.</p>
                <p><strong>Local da Interdição:</strong> Rua Aristides, esquina com Fernão Dias</p>
                <p><strong>Número de participantes:</strong> Indeterminado. </p>
                <p><strong>Data:</strong> 15/06/2019; <strong>Horário do início:</strong> 08:00;
                    <strong>Término:</strong> 02:00 (16/06/2019)
                </p> <br><br>

                <p>1: ) - É de responsabilidade da Secretaria Municipal de Transporte, Trânsito e Segurança, somente, a
                    autorização para interdição das vias, cuja análise restringe-se à avaliação do seu impacto no
                    trânsito.</p> <br>
                <p>2: ) - O local deverá ser sinalizado pelo responsável pelo evento, com dispositivos de sinalização de
                    uso temporário estabelecidos no Anexo II do Código de Trânsito Brasileiro.
                </p> <br>
                <p>3: ) - Deverão ser anexados a
                    este requerimento o croqui d localização do evento.</p>
                <p>Lagoa dos Patos - MG, 31 de maio de 2019. </p>
                <div class="assinatura">
                    <p>____________________________________ <br><strong>${dados.responsavel.toString().toUpperCase()}</strong></p>
                </div>
            </div>`
}
function geraOficio(dados) {
    oficio.innerHTML = `<div class="interna">
                <h2>OFICIO PMMG - LAGOA DOS PATOS MG</h2>
                <h3>OFICIO 001/2024:</h3>
                <p><strong>Responsável:</strong> ${dados.responsavel}</p>
                <p><strong>CPF:</strong> 070.190.156-03 </p>
                <p><strong>RG:</strong> MG-14.194.825 </p>
                <p><strong>Endereço:</strong> Rua Aristides, esquina com Fernão Dias.</p>
                <h3>DADOS DO EVENTO: </h3>

                <p><strong>Motivo:</strong> Realização de Festividade de quadrilha “FESTA JUNINA DA VIZINHANÇA”.</p>
                <p><strong>Local da Interdição:</strong> Rua Aristides, esquina com Fernão Dias</p>
                <p><strong>Número de participantes:</strong> Indeterminado. </p>
                <p><strong>Data:</strong> 15/06/2019; <strong>Horário do início:</strong> 08:00;
                    <strong>Término:</strong> 02:00 (16/06/2019)
                </p> <br><br>

                <p>1: ) - É de responsabilidade da Secretaria Municipal de Transporte, Trânsito e Segurança, somente, a
                    autorização para interdição das vias, cuja análise restringe-se à avaliação do seu impacto no
                    trânsito.</p> <br>
                <p>2: ) - O local deverá ser sinalizado pelo responsável pelo evento, com dispositivos de sinalização de
                    uso temporário estabelecidos no Anexo II do Código de Trânsito Brasileiro.
                </p> <br>
                <p>3: ) - Deverão ser anexados a
                    este requerimento o croqui d localização do evento.</p>
                <p>Lagoa dos Patos - MG, 31 de maio de 2019. </p>
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