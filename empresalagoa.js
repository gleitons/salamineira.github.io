function ocultar(valor) {
    const acW = document.querySelector('#accEmpresaWhats')
    const amM = document.querySelector('#accMostraMEI')
    const amE = document.querySelector('#accMostraME')
    if (valor == "acw") {
        acW.classList.toggle('dnone')
    } else if (valor == "amm") {
        amM.classList.toggle('dnone')
    } else {
        amE.classList.toggle('dnone')
    }
}
const url = ('/empresas')

async function empresas() {
    const response = await fetch(url);
    const data = await response.json();
    const empresaO = document.querySelector('#empresasL')


    data.sort((a, b) => {
        if (a.razaoSocial < b.razaoSocial) return -1;
        if (a.razaoSocial > b.razaoSocial) return 1;
        return 0;
    })

    const color = ["cred", "cgreen", "cverde", "claranja", "cblue", "crosa"]
    var empresasComWhats = 0;
    var empresasMEI = 0;
    var empresasME = 0;
    var SemDuplicado = data
    var novaData = SemDuplicado.filter((este, i) => SemDuplicado.indexOf(este) === i);



    var emailEnviar = []

    data.map((mostra) => {

        const removeL = mostra.atividadePrincipal.slice(0, 10);
        const atividadeReal = mostra.atividadePrincipal.replace(removeL, '')

        if (mostra.email.length > 0) {
            const razaoMenor = mostra.razaoSocial;
            const razaoMin = razaoMenor.slice(0, 14);
            const mEmaile = mostra.email;
            const mEmail = mEmaile.replace(/tudo minusculo/g, '').replace(/\(\)/g, '')
            emailEnviar.push(mEmail);

            mostraEmailMEI.innerHTML += `<span>${razaoMin}</span>` + "... " + " - " + mEmail + `</br>`
        }



        if (atividadeReal == "Serviço de táxi") {
        }
        if (atividadeReal == "Preparação de documentos e serviços especializados de apoio administrativo não especificados anteriormente") {
        }



        const fundoColor = Math.floor(Math.random() * 5);

        if (mostra.telefone.length > 26) {
            var contatoEm = ''
        } else {
            var contatoEm = mostra.telefone
        }

        if (contatoEm.length > 12) {
            var contatoEm = contatoEm.slice(13, 26)
        }

       
        if (mostra.empresaMei == "Sim") {
            empresasMEI = empresasMEI + 1
            const envioW = contatoEm.replace(/ /g, '').replace(/-/g, '')
            mostraMEI.innerHTML += `<a href="https://api.whatsapp.com/send?phone=55${envioW}&text=Olá ${mostra.razaoSocial}, você empreendedor da nossa cidade de Lagoa dos Patos MG, atuante na área ${atividadeReal}, somos a sala mineira do empreendedor, viemos " target="_blank">${contatoEm} - ${mostra.razaoSocial}</a> <br>`
        } else {
            empresasME = empresasME + 1
            const envioW = contatoEm.replace(/ /g, '').replace(/-/g, '')
            mostraME.innerHTML += `<a href="https://api.whatsapp.com/send?phone=55${envioW}&text=Olá ${mostra.razaoSocial}, você empreendedor da nossa cidade de Lagoa dos Patos MG, atuante na área ${atividadeReal}, somos a sala mineira do empreendedor, viemos " target="_blank">${contatoEm} - ${mostra.razaoSocial}</a> <br>`
        }
        empresaE.innerHTML = empresasME
        empresaM.innerHTML = empresasMEI


        const numeroConfere = contatoEm[3] + contatoEm[4]



        if (numeroConfere == 99 || numeroConfere == 98 || numeroConfere == 97 || numeroConfere == 96 || numeroConfere == 88 || numeroConfere == 87) {


            empresasComWhats = empresasComWhats + 1;

            const envioW = contatoEm.replace(/ /g, '').replace(/-/g, '')


            mWhats.innerHTML += `<a href="https://api.whatsapp.com/send?phone=55${envioW}&text=Olá ${mostra.razaoSocial}, você empreendedor da nossa cidade de Lagoa dos Patos MG, atuante na área ${atividadeReal}, somos a sala mineira do empreendedor, viemos " target="_blank">${contatoEm} - ${mostra.razaoSocial}</a> <br>`
        }

        empresaW.innerHTML = empresasComWhats;


        totalEmpresas.innerHTML = empresasME + empresasMEI
        if(mostra.empresaMei =="Sim") {
            var tipoEmpresa = "MEI"
        } else {
            var tipoEmpresa = "ME"
        }
        const siteLink = mostra.razaoSocial.replace(/ /g, '-').toLowerCase()
        const linkSite = siteLink.replace(/\./g, '-') + `-${mostra.cnpj}`
        if(contatoEm.length > 0){
            var contatoCard = `+55 ${contatoEm} `
        } else {
            var contatoCard = ``
        }

        cardEmpresa.innerHTML += ` 
        BEGIN:VCARD <br>
        VERSION:3.0 <br>
        FN:${mostra.razaoSocial} ${mostra.cnpj} <br>
        N:;${mostra.nomeFantasia};${mostra.cnpj};; <br>
        item1.EMAIL;TYPE=INTERNET:${mostra.email} <br>
        item1.X-ABLabel:${tipoEmpresa} <br>
        TEL;TYPE=CELL:${contatoCard} <br>
        item2.ADR:;;${mostra.endereco}\, ${mostra.bairro}\, ${mostra.numero};${mostra.cidade};MG;${mostra.cep};BR;${mostra.endereco}\, ${mostra.bairro}\, ${mostra.numero}\n${mostra.cidade}\n${mostra.estado}\n${mostra.cep}\nBR <br>
        item2.X-ABLabel:MEI <br>
        item3.ORG:${atividadeReal};${mostra.nomeFantasia}<br>
        item3.X-ABLabel: <br>
        BDAY:${mostra.abertura[6]}${mostra.abertura[7]}${mostra.abertura[8]}${mostra.abertura[9]}${mostra.abertura[3]}${mostra.abertura[4]}${mostra.abertura[0]}${mostra.abertura[1]} <br>
        URL;TYPE=WORK:https\://salamineira.com/empresas/${linkSite} <br>
        NOTE:${mostra.todosDados} <br>
        CATEGORIES:${tipoEmpresa} <br>
        END:VCARD <br>`


    })
  

    var enviaTodos = [...new Set(emailEnviar)]

   
    for (let i = 0; i < enviaTodos.length; i++) {
        enviarParaTodos.innerHTML += `${enviaTodos[i]}; `
    }

}
empresas();