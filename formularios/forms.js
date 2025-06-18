const btnAddExtensao = document.querySelectorAll('button')



function ExtensaoSec() {
    const divADD = document.querySelector('.adicionarExtensao')
    const tSec = document.querySelector('#extSecretaria').selectedIndex
    if(tSec == 0){
        divADD.innerHTML = ''
        divADD.style.display = 'none'
    } else {
        divADD.style.display = 'block'
    }
}
btnAddExtensao[0].addEventListener('click', (e) => {
    e.preventDefault();
    const educacaoInformatico = document.querySelector('#educacaoInformatico')
    educacaoInformatico.innerHTML = `<textarea name="entry.684427781" id="educacaoIntro" cols="50" rows="10"></textarea>`
    const divADD = document.querySelector('.adicionarExtensao')
    const tSec = document.querySelector('#extSecretaria').selectedIndex
    if(tSec == 1){
        var info = 'Escola Municipal Maria Dil...'
    } else if(tSec == 2) {
        var info = 'PSF Maria Erm...'
    } else {
        var info = 'Titulo da Extensão...'
    }
    divADD.innerHTML += ` <div class="extensaoCadastro">
    <div><p>Titulo:</p> <input type="text" name="" id="" required placeholder="Ex: Escola Municipal Maria Dil..."></div>
    <div><p>Resposável pela Extensão:</p> <input type="text" required name="" id="" placeholder="Ex: Fulano de Tal..."></div>
    <div><p>Endereço:</p> <input type="text" name="" id="" required placeholder="Ex: Avenida Presidente med..."></div>
    <div><p>Número:</p> <input type="text" name="" id=""  required placeholder="Ex: 123..."></div>
    <div><p>Bairro:</p> <input type="text" name="" id="" required placeholder="Ex: Centro..."></div>
</div>`
   
})

function carregaTodasExtensoes() {
    const extensaoCadastro = document.querySelectorAll('.extensaoCadastro')
    const inputsValores = document.querySelectorAll('.extensaoCadastro input')

    for(let i = 0; i < extensaoCadastro.length; i++){

        const extensao = `  /// Titulo: ${inputsValores[0].value} - Responsável: ${inputsValores[1].value} - Endereço: ${inputsValores[2].value} -  Numero: ${inputsValores[3].value} -  Bairro: ${inputsValores[4].value}`

        educacaoIntro.textContent += extensao;
        
    }
}
btnAddExtensao[1].addEventListener('click', (e) => {
    // e.preventDefault();
    //console.log('aqui')
    const extensaoCadastro = document.querySelectorAll('.extensaoCadastro')
    const inputsValores = document.querySelectorAll('.extensaoCadastro input')

    for(let i = 0; i < extensaoCadastro.length; i++){

        const extensao = `  /// Titulo: ${inputsValores[0].value} - Responsável: ${inputsValores[1].value} - Endereço: ${inputsValores[2].value} -  Numero: ${inputsValores[3].value} -  Bairro: ${inputsValores[4].value}`

        educacaoIntro.textContent += extensao;
        
    }
   // document.getElementById("myForm").submit();

    
})

const urlSecretarias = ["Secretaria Municipal De Administração", "Secretaria Municipal de Fazenda", "Secretaria Municipal de Saúde", "Secretaria Municipal De Assistência Social", "Secretaria Municipal de Educação", "Secretaria Municipal De Esporte e Lazer", "Secretaria Municipal de Finanças","Secretaria Municipal de Obras e Serviços Públicos", "Secretaria Municipal de Agropecuária, Psicultura e Aquicultura", "Secretaria Municipal de Indústria, Comércio e Meio Ambiente.", "Secretaria Municipal de Cultura e Turismo", "Secretaria Municipal de Cultura", "Secretaria Municipal de Turismo", "Secretaria Municipal de Educação, Cultura e Turismo", "Secretaria Municipal de Educação e Cultura", "Secretaria Municipal de Meio Ambiente"]
const secretariaShow = document.querySelector('#secretariaShow')
for(let i = 0; i < urlSecretarias.length; i++){
    secretariaShow.innerHTML += ` <option>${urlSecretarias[i]}</option>`
}
const geraModelos = async () => {
    const response = await fetch("./modelos")    
    const data = await response.json()

    console.log(data)
    const modelosCompetencia = document.querySelector('#modelosCompetencia')
    data.map((e) => {
        modelosCompetencia.innerHTML += `<option>${e.secretaria}</option>`
    })
}
geraModelos()

async function tiposDeModelos() {
    const response = await fetch("./modelos")    
    const data = await response.json()
    const insereModelos = document.querySelector('#insereModelos')
    const numb = document.querySelector('#modelosCompetencia').selectedIndex - 1
    insereModelos.textContent = data[numb].competencia
}