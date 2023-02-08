const mudarVerAgora = document.getElementsByTagName('div');
console.log(mudarVerAgora.length)
for(let indeM = 0; indeM < mudarVerAgora.length; indeM ++){
    var mudar = mudarVerAgora[indeM].innerHTML.replace('ver agora', 'CLIQUE AQUI PARA VER AS FOTOS <i class="fa fa-level-down" aria-hidden="true"></i>  ');
    mudarVerAgora[indeM].innerHTML = mudar 
}
// const aumentarPerfil = document.getElementsByClassName('fundo-perfil');
// //var propriedade = window.getComputedStyle(aumentarPerfil).getPropertyValue("width");
// aumentarPerfil.push('width', '100%')
// console.log(aumentarPerfil)



// var elements = document.getElementsByTagName('*');

// for (var i = 0; i < elements.length; i++) {
//     var txt = elements[i].innerHTML.replace("Original", "Alterada");
//     elements[i].innerHTML = txt;
// }
const url = "/lagopatenses"
const nomeURL = window.location.pathname.replace(/\//g, "").replace('populacao', '');
console.log(nomeURL)
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
    
    

    data.map((pessoa, ind) => {
        
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
            //var candidaturaOn = 0;
            //for (let ints = 0; ints <= 10; ints++) {
                
            //    var cand = data[ind].candidaturas[ints].ano;
           //     if (cand.length > 0){
          //          candidaturaOn = candidaturaOn + 1;
           //         console.log("timtim")
           //     }
                
                
                
          //  }
          //  console.log(candidaturaOn)


            const idade = Math.floor(toDate(pessoa.nascimento));
            const nomeCompleto = pessoa.nome.replace(/-/g, " ")
            
            document.getElementById('infoPessoa').innerHTML = `<div class="bloc bg-Barragem-20cheia-20Lagoa-20dos-20Patos-20--20MG-20-27032012 fixo l-bloc none" id="bloc-79">
                        <div class="container bloc-sm-lg bloc-sm">
                            <div class="row fundo-perfil no-gutters">
                                <div class="col">
                                    <div class="container-div-29274-style">
                                        <div class="row row-bloc-79-style">
                                            <div class="col-md-5 col-lg-3">
                                                <div><img src=${pessoa.imagemCapa}
                                                        data-src=${pessoa.imagemCapa}
                                                        class="img-fluid img-328-style mx-auto d-block lazyload"
                                                        alt="placeholder image" /></div>
                                            </div>
                                            <div id="shi"></div>
                                            <div class="col-md-6 col-lg-8 col-12">
                                                <div class="container-div-0-style">
                                                    <h3 class="mg-md h3-bloc-79-style" style="text-transform: capitalize;">${pessoa.nomeCompleto}</h3>
                                                    <h5>${pessoa.apelido}</h5>
                                                   
                                                    <p class="p-265-style" style="text-transform: capitalize;">${pessoa.profissao}</p>
                                                    
                                                    <p class="p-265-style" style="text-transform: capitalize;">Candidaturas: ${data[ind].candidaturas[0].ano}</p>
                                                    <p class="p-265-style" > ${idade} anos de idade.</p>
                                                    <p class="p-265-style" > ${pessoa.nota} </p>
                                                    </p><a href="#bloc-82"
                                                        class="btn btn-d btn-lg btn-146-style btn-glossy" style="width:fit-content;" 
                                                        >Ver Imagens</a>
                                                </div>
                                            </div>
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

                    keyW.setAttribute('content', `${pessoa.nomeCompleto}, ${pessoa.apelido} ${palavraC}`);
                    descSite.setAttribute('content', `${pessoa.nomeCompleto}, ${pessoa.apelido} ${palavraC}`);
                    poliFace.setAttribute('content', `${"politician"}`);
                    descFace.setAttribute('content', `${pessoa.nomeCompleto}, ${pessoa.apelido} ${palavraC}`);
                    imageFace.setAttribute('content', `${sitePre}${pessoa.imagemCapa}`);
                    urlFace.setAttribute('content', `${urlPolitico}${pessoa.nome}`);
                    siteFace.setAttribute('content', `${sitePre}`);
                    endeFace.setAttribute('content', `salamineiraoficial`);

                    contTwiter.setAttribute('content', `${pessoa.nomeCompleto}, ${pessoa.apelido} ${palavraC}`);
                    contTitle.setAttribute('content', `${pessoa.nomeCompleto}`);
                    imgTwit.setAttribute('content', `${sitePre}${pessoa.imagemCapa}`);

                    const imageFacebook = document.querySelector('#imageFace');
                    

            imagens();
            ind++
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
    datas.map( (element) => {
        console.log(element)
        document.getElementById('listaPopulacao').innerHTML += ` <a  href="/populacao/${element.nome}">
        <li style="text-transform: uppercase; background-color:#ffdd9f; margin: 1em 0; padding:5px; text-align:center; list-style:none;">${element.nomeCompleto} </br> <strong>${element.apelido}</strong></li>
    </a>`
    });
    
}
moradores();
ordenarPessoas();