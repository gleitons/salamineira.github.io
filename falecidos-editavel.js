function montaTRTD(data) {
    const imagem = data.imagem != '' ? data.imagem : 'https://l3gado.s3.amazonaws.com/l3gado/arquivos/vela_site/gif1.gif'
    // console.log(data.nascimento)
    //https://l3gado.s3.amazonaws.com/l3gado/arquivos/vela_site/gif1.gif
    return `  <div class="cardfalec">
    <div>
    
            <div class="fotoNome">
                <img  src="${imagem}" alt="">
                <strong>
                    <p>${data.nome}</p>
                </strong>
            </div>
            <div>
                <p>${data.falecimento}</p>
            </div>
            <div>
                <i>
                    <p>${data.apelido}</p>
                </i>
            </div>
            <li class="itemCompletos">${data.nome.toLowerCase()} ${data.falecimento} ${data.apelido} </li>
            <button class="ver">Ver</button> 
           
    </div>
    <br>
</div>`
}
//${data.falecimento} ${data.apelido}
const pesquisa = async () => {

    const searchInput = document.getElementById('searchInput');
    const items = document.querySelectorAll('.itemCompletos');
    const cardfalec = document.querySelectorAll('.cardfalec')
    var cont = 0
    for(let i = 0; i < cardfalec.length; i++){
        const computedStyle = window.getComputedStyle(cardfalec[i]);
        if (computedStyle.display === 'block') {
            // console.log(cardfalec[i]);
            cont = cont + 1            
        } 
        // else {
            // console.log(cardfalec[i]);
        // } 
    }
    if(cont == 1){
        itensEncontrados.innerHTML = `${cont} Resultado encontrado`
    } else if(cont == 0){
        itensEncontrados.innerHTML = `${cont} Nenhum resultado encontrado`
    } else {
        itensEncontrados.innerHTML = `${cont} resultados parecidos encontrados`
    }
    

    searchInput.addEventListener('keyup', function () {
        const query = searchInput.value.toLowerCase();
        items.forEach(function (item, index) {
            cardfalec[index].classList.add('dblock');
            const text = item.textContent.toLowerCase();
           
            if (text.includes(query)) {
                cardfalec[index].style.display = 'block';
                
               
            } else {
                cardfalec[index].style.display = 'none';
            }
        });


    });
    

}
const falecidos = async () => {
    try {
        const resp = await fetch('/falecimentos-publicar');
        const data = await resp.json();

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

        const corpo = document.querySelector('#todosFalecidos');
        const fragment = document.createDocumentFragment();
        corpo.innerHTML = ''
        data.forEach((e) => {
            const trElement = document.createElement('div');
            trElement.classList.add('inClick')
            trElement.innerHTML = montaTRTD(e);
            fragment.appendChild(trElement);
        });
        corpo.appendChild(fragment);


        const cardfalec = document.querySelectorAll('.inClick');
        // const fotoNome = 

        for (let i = 0; i < cardfalec.length; i++) {

            cardfalec[i].addEventListener('click', () => {
                var fotoNome = cardfalec[i].querySelector('div .fotoNome img')
                fotoNome.classList.add('zoom')
                const imagem = data[i].imagem != '' ? data[i].imagem : 'https://l3gado.s3.amazonaws.com/l3gado/arquivos/vela_site/gif1.gif'
                const nascFalecido = data[i].nascimento != '' ? `<i class="bi bi-star-fill">${data[i].nascimento}</i>` : ``
                // console.log(nascFalecido)
                var icfechar = document.querySelector('.cardPorCima')
                icfechar.classList.add('abre')
                const insereInfo = document.querySelector('.insereInfo')
                insereInfo.innerHTML = `   <div class="lutosC" style="background-image: url(/falecimento/4.png);">
                <img src="/imagens/fita-falecimento.png" class="fita">
                <div class="imagemL">
                    <img src="${imagem}">
                </div>
                <div class="vidroF">
                    <p class="nomeF">${data[i].nome}</p>
                    <p class="aplido" id="apelidoTDona Belvina Quininha64">${data[i].apelido}</p>
                    <div class="nascFalec">
                        ${nascFalecido}                        
                        <i class="bi bi-heartbreak-fill">${data[i].falecimento}</i>
                    </div><strong>
                        <p class="aplido" style="margin-bottom:.3em;">${''}</p>
                    </strong>
                    <p class="falecMae"></p>
                </div>
                <div class="nota">
                    <p>Algumas vontades de Deus são difíceis de aceitar… Já passou 1 ano desde o seu falecimento, mas
                        cada dia continua sendo cinzento e preenchido pelas saudades.Rezo para que Deus traga algum
                        consolo para meu coração machucado e prometo que suas memórias caminharão eternamente comigo.
                    </p>
                </div>
                <div>
                    <span class="itensHtml">
                        <img src="https://static.wixstatic.com/media/154c4e_0f89712cd4e24c029520bff3c871e76d~mv2.png/v1/fill/w_640,h_258,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/154c4e_0f89712cd4e24c029520bff3c871e76d~mv2.png"
                            alt="Falecimentos obitos mortes em lagoa dos patos mg">
                    </span>
                </div>
                <div></div>
                <div class="bntEditar"></div>
            </div>`
                icfechar.style.display = 'block'
                const fec = () => {
                    fotoNome.classList.remove('zoom')
                icfechar.classList.remove('abre')
                }
                setTimeout(fec, 1000)
                
            })
        }




    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}
falecidos()
function fechaFalecido() {
    const icfechar = document.querySelector('.cardPorCima')
    icfechar.style.display = 'none'
}

function limp() {
    location.reload()
}

