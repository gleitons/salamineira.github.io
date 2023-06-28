const mudarVerAgora = document.getElementsByTagName('div');
for (let indeM = 0; indeM < mudarVerAgora.length; indeM++) {
    var mudar = mudarVerAgora[indeM].innerHTML.replace('ver agora', 'CLIQUE AQUI PARA VER AS FOTOS <i class="fa fa-level-down" aria-hidden="true"></i>  ');
    mudarVerAgora[indeM].innerHTML = mudar
}
// const aumentarPerfil = document.getElementsByClassName('fundo-perfil');
// //var propriedade = window.getComputedStyle(aumentarPerfil).getPropertyValue("width");
// aumentarPerfil.push('width', '100%')
// console.log(aumentarPerfil)
const mostraImg = document.querySelector('#accordion-49882-item-2')
mostraImg.classList.remove('collapse')


// var elements = document.getElementsByTagName('*');

// for (var i = 0; i < elements.length; i++) {
//     var txt = elements[i].innerHTML.replace("Original", "Alterada");
//     elements[i].innerHTML = txt;
// }
const url = "/lagopatenses"
const nomeURL = window.location.pathname.replace(/\//g, "").replace('populacao', '');
async function moradores() {
    const response = await fetch(url);
    const data = await response.json();




    function ordemCrescente(a, b) {
        return toDate(b) - toDate(a);
    }

    function toDate(nascimento) {
        const parts = nascimento.split("/");
        const dataFor = new Date(parts[2], parts[1] - 1, parts[0]);

        const dataR = (new Date() - dataFor) / (31557600000);
        return dataR;
    }



    data.map((pessoa) => {

        if (pessoa.nome == nomeURL) {
            document.querySelector('#titleHeader').innerText = pessoa.nomeCompleto + " - Sala Mineira do empreendedor de Lagoa dos Patos MG"
            function imagens() {
                for (let i = 0; i < pessoa.fotos.length; i++) {
                    const imgs = pessoa.fotos[i];
                    const imgT = JSON.stringify(imgs).replace('{"imagem":"', '').replace('"}', '')

                    document.querySelector('#imagensR').innerHTML += `<div>
                 <img src=${imgT}>
             </div>`;
                }
            };

            const idade = Math.floor(toDate(pessoa.nascimento));
            const nomeCompleto = pessoa.nome.replace(/-/g, " ")

            function eleitoECargo(dado) {
                if (dado == 'v') {
                    return 'vereador(a)'
                } else if (dado == 'p') {
                    return 'prefeito(a)'
                } else if (dado == 's') {
                    return `<span style="background-color:rgb(0, 121, 18); padding:2px; color:white;	border-radius:8px; margin: 15px 0px;">Eleito(A)</span>`
                } else if (dado == 'vp') {
                    return 'vice-prefeito(a)'
                } else {
                    return `<span style="background-color:gray; padding:2px; color:white;border-radius:8px; margin: 15px 0px;">Suplente</span>
                    `
                }
            }
            var candidaturas2000 = `${pessoa.candidaturas[0].ano} - ${eleitoECargo(pessoa.candidaturas[0].cargo)} - ${eleitoECargo(pessoa.candidaturas[0].eleito)} </br>`;

            var candidaturas2004 = `${pessoa.candidaturas[1].ano} - ${eleitoECargo(pessoa.candidaturas[1].cargo)} - ${eleitoECargo(pessoa.candidaturas[1].eleito)} </br>`;
            var candidaturas2008 = `${pessoa.candidaturas[2].ano} - ${eleitoECargo(pessoa.candidaturas[2].cargo)} - ${eleitoECargo(pessoa.candidaturas[2].eleito)} </br>`;
            var candidaturas2012 = `${pessoa.candidaturas[3].ano} - ${eleitoECargo(pessoa.candidaturas[3].cargo)} - ${eleitoECargo(pessoa.candidaturas[3].eleito)}</br>`;
            var candidaturas2016 = `${pessoa.candidaturas[4].ano} - ${eleitoECargo(pessoa.candidaturas[4].cargo)} - ${eleitoECargo(pessoa.candidaturas[4].eleito)}</br>`;
            var candidaturas2020 = `${pessoa.candidaturas[5].ano} - ${eleitoECargo(pessoa.candidaturas[5].cargo)} - ${eleitoECargo(pessoa.candidaturas[5].eleito)}</br>`;


            if (pessoa.candidaturas[0].ano.length <= 0) {
                var candidaturas2000 = ""
            }
            if (pessoa.candidaturas[1].ano.length <= 0) {
                var candidaturas2004 = ""
            }
            if (pessoa.candidaturas[2].ano.length <= 0) {
                var candidaturas2008 = ""
            }
            if (pessoa.candidaturas[3].ano.length <= 0) {
                var candidaturas2012 = ""
            }
            if (pessoa.candidaturas[4].ano.length <= 0) {
                var candidaturas2016 = ""
            }
            if (pessoa.candidaturas[5].ano.length <= 0) {
                var candidaturas2020 = ""
            }


            //Iniciando Apresentacao População
            const divBarragem = document.createElement('div')
            divBarragem.setAttribute('class', 'bloc bg-Barragem-20cheia-20Lagoa-20dos-20Patos-20--20MG-20-27032012 fixo l-bloc none');
            divBarragem.setAttribute('id', 'bloc-79');






            document.getElementById('infoPessoa').innerHTML = `<div class="bloc bg-Barragem-20cheia-20Lagoa-20dos-20Patos-20--20MG-20-27032012 fixo l-bloc none" id="bloc-79">
                        <div class="container bloc-sm-lg bloc-sm"><span style="color:red;">*Estamos em constante atualização, os dados serão adicionados gradualmente. <span style="background-color:red;color:white;" >Erros poderão ocorrer</span></span>
                            <div class="row fundo-perfil no-gutters">
                                <div class="col">
                                    <div class="container-div-29274-style">
                                        <div class="row row-bloc-79-style">
                                            <div class="col-md-5 col-lg-3">
                                            <figure>
                                                <div>
                                                <img src=${pessoa.imagemCapa}
                                                        data-src=${pessoa.imagemCapa}
                                                        class="img-fluid img-328-style mx-auto d-block lazyload"
                                                        alt="placeholder image" />
                                                        <figcaption class="candPrimeira" style="text-transform:uppercase;   ">
                                                        ${pessoa.apelido}
                                                        </figcaption>
                                                       
                                                </div>
                                            </figure>
                                            </div>
                                            <div id="shi"></div>
                                            <div class="col-md-6 col-lg-8 col-12">
                                                <div class="container-div-0-style">
                                                    <h3 class="mg-md h3-bloc-79-style" style="text-transform: capitalize;">${pessoa.nomeCompleto}</h3>
                                                    
                                                   
                                                    <p class="p-265-style" style="text-transform: capitalize;">${pessoa.profissao}</p>
                                                    <p class="p-265-style" > <strong>${idade} </strong>anos de idade.</p>
                                                    
                                                    <p class="p-265-style" style="text-transform: capitalize;">Candidaturas: 
                                                    </br>                                                   
                                                    ${candidaturas2020} 
                                                    ${candidaturas2016} 
                                                    ${candidaturas2012} 
                                                    ${candidaturas2008} 
                                                    ${candidaturas2004}
                                                    ${candidaturas2000} 
                                                    </p>                                                   
                                                    <p class="p-265-style" > ${pessoa.nota} </p>
                                                    </p>
                                                    <a href="#bloc-82"
                                                        class="btn btn-d btn-lg btn-146-style btn-glossy" style="width:fit-content;" 
                                                        >Ver Imagens
                                                        </a>
                                                        <a href="/habitantes-de-lagoa-dos-patos-mg.html"
                                                        class="btn btn-d btn-lg btn-146-style btn-glossy" style="width:fit-content;" 
                                                        >Veja todos
                                                        </a>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        <div class="container-div-0-style">
                                        <h5>Saiba um pouco mais sobre ${pessoa.nomeCompleto}, popularmente ${pessoa.apelido}</h5>
                                    </div>
                                    </div>

                                    
                                    


                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- bloc-79 END -->`
            const contentFacebook = document.querySelector('#contentFace');
            const sitePre = "https://salamineira.com"
            const urlPolitico = "https://salamineira.com/populacao/"
            const palavraC = " Lagoa dos Patos MG, vereadores em Lagoa dos Patos MG, Sala Mineira do Empreendedor de Lagoa dos Patos MG"
            contentFacebook.setAttribute('content', `${pessoa.nomeCompleto}, faz parte da história de nossa cidade de Lagoa dos Patos MG, conhecido como ${pessoa.apelido}, conheça mais sobre nosso conterrâneo`);
            const descFacebook = document.querySelector('#descFace');

            const imgCompartilhada = pessoa.imagemCapa.replace(/-max/g, '')



            keyW.setAttribute('content', `${pessoa.nomeCompleto}, ${pessoa.apelido} ${palavraC}`);
            descSite.setAttribute('content', `${pessoa.nomeCompleto}, ${pessoa.apelido} ${palavraC}`);
            poliFace.setAttribute('content', `${"politician"}`);
            descFace.setAttribute('content', `${pessoa.nomeCompleto}, ${pessoa.apelido} ${palavraC}`);
            imageFace.setAttribute('content', `${sitePre}${imgCompartilhada}`);
            urlFace.setAttribute('content', `${urlPolitico}${pessoa.nome}`);
            siteFace.setAttribute('content', `${sitePre}`);
            endeFace.setAttribute('content', `salamineiraoficial`);

            contTwiter.setAttribute('content', `${pessoa.nomeCompleto}, ${pessoa.apelido} ${palavraC}`);
            contTitle.setAttribute('content', `${pessoa.nomeCompleto}`);
            imgTwit.setAttribute('content', `${sitePre}${imgCompartilhada}`);

            const imageFacebook = document.querySelector('#imageFace');


            imagens();

        } else {

        }




    })
}


function organizar(datas) {
    var nom = []
    var link = []
    for (let i = 0; i < datas.length; i++) {

        nom.push(datas[i].nomeCompleto)
        link.push(datas[i].nome)

    }
    return [nom.sort(), link.sort()]




}
async function ordenarPessoas() {
    const responses = await fetch(url);
    const datas = await responses.json();

    const ordemNames = organizar(datas)
    datas.map((element) => {
        document.getElementById('listaPopulacao').innerHTML += ` <a  href="/populacao/${element.nome}">
        <li style="text-transform: uppercase; background-color:#ffdd9f; margin: 1em 0; padding:5px; text-align:center; list-style:none;">${element.nomeCompleto} </br> <strong>${element.apelido}</strong></li>
    </a>`
    });

}
moradores();
ordenarPessoas();

const linkTestado = window.location.href

if(linkTestado == "https://www.salamineira.com/populacao/gleiton-aparecido-soares/") {
    window.location.href = "http://www.gleiton.com.br";
}
console.log(linkTestado)