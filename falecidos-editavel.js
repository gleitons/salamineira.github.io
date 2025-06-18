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
                const numero = Math.floor(Math.random() * 67)
                console.log(numero)
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
                    <p>${mensagens()[numero].mensagem}</p>
                  
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

function mensagens(numero) {
    return [{
        "mensagem": "A morte é uma certeza, mas continua nos surpreendendo quando chega sem aviso e leva uma pessoa tão querida. Não quero que você me veja chorando nem questionando a vontade de Deus. Tudo o que posso fazer hoje é rezar para que você encontre a luz e nos proteja para sempre."
    },
    {
        "mensagem": "O brilho dos seus olhos, o calor do seu sorriso e a bondade de sua alma ficarão marcados em nossos corações. A sua morte é, sem dúvida, uma grande perda para todos nós. Você sempre deixará saudades, não importa quanto tempo passar."
    },
    {
        "mensagem": "Você sempre foi uma pessoa tão alegre e eu sei que não gostaria de me ver sofrendo. Sua lembrança continua viva em cada canto da casa, cada rua e cada silêncio, mas eu não vou me entregar para a dor. Você que amava a vida, merece me ver sorrindo. Prometo que vou tentar… E um dia vou seguir em frente porque você me dá forças."
    },
    {
        "mensagem": "Só quem já passou por isso consegue imaginar o sofrimento que eu estou sentindo agora. Minha mãe amada, grande amiga e melhor conselheira, deixou este mundo hoje. Mamãe, oro para que seu espírito encontre a paz e o descanso eterno.Suas palavras, seus abraços, sua voz doce, seu sorriso aberto… Tudo isso faz parte de mim e será lembrado todos os dias. Eu te amo eternamente, mãe. Que saudades…"
    },
    {
        "mensagem": "Hoje é mais um dia em que a saudade nos domina e toca conta dos nossos espíritos. O luto permanece entre nós a cada amanhecer…Acredito que, aos poucos, o tempo vai me trazer algum conforto e eu vou aprender a aceitar a sua partida. Até lá, vou tentando estreitar ainda mais os laços entre todos que ficaram e servir de amparo para os outros, algo que eu aprendi com você."
    },
    {
        "mensagem": "Sua voz, sua companhia, seu riso e suas palavras sábias… Tudo isso nos falta agora que você se foi. Ficamos aqui, nos sentindo desamparados sem você, mas sua presença e as memórias de tudo que vivemos são mais fortes que o tempo. Até um dia…"
    },
    {
        "mensagem": "Como é difícil se livrar da dor que se instalou no meu peito desde que você partiu! Meu único consolo é saber que você está bem, em paz, sem sofrimento. Um dia sei que minhas lágrimas de dor vão se transformar em lágrimas de saudades, mas o vazio deixado pela sua perda jamais será preenchido. Descanse em paz!"
    },
    {
        "mensagem": "Para conseguir suportar a sua partida, eu preciso recordar todas as coisas boas que vivemos, pequenos gestos que ficaram gravados na minha memória e que eu vou guardar com todo o carinho. As saudades são eternas, mas o amor é ainda maior."
    },
    {
        "mensagem": "Hoje eu perdi uma pessoa essencial na minha vida! E eu, que vivia dizendo que nunca conseguiria viver sem você, vou ter que aprender a fazer justamente isso. Não será fácil, mas, pelo amor que sempre tive por você, eu prometo que vou tentar. Por favor, me ajude daí de cima quando o fardo parecer pesado demais. Te amarei para sempre!"
    },
    {
        "mensagem": "Nunca estamos preparados para nos despedir para sempre, mesmo sabendo que isso faz parte da vida. Nossos corações estão pesados por perder alguém tão importante e especial... Hoje estamos de luto, lamentando a sua partida, mas celebraremos para sempre sua passagem inesquecível pelo mundo. Descanse em paz."
    }, {
        "mensagem": "Não existe despedida mais triste e dolorosa do que aquela que fazemos, de repente, quando parte alguém que era essencial para a nossa felicidade. É como se arrancassem o tapete debaixo dos nossos pés e continuássemos caindo durante muito tempo…Minha alma está de luto pela sua morte irreparável... Sei que nada será como antes, mas peço que você olhe por mim e me proteja, lá do céu."
    }, {
        "mensagem": "Tio querido, é com o coração apertado que eu escrevo estas palavras e me despeço de você, sabendo que a sua memória ficará comigo para sempre. Agradeço o seu carinho e todas as suas lições, prometo que vou fazer de tudo para você se orgulhar de mim. Vai com Deus, tio, e olha por nós!"
    }, {
        "mensagem": "Hoje o mundo acordou de luto pela perda de um anjo. O vazio que você deixou no meu peito ninguém vai conseguir preencher. Você é um ser de luz, muito diferente de todos que eu já conheci, e talvez por isso tenha partido tão cedo.Apesar de estar com o coração apertado, eu faço questão de sorrir em sua homenagem e agradecer por ter tido a sorte de encontrar alguém com você no meu caminho."
    }, {
        "mensagem": "A partida de uma avó é sempre um momento devastador para qualquer família. Sabemos que é a lei da vida, mas quando precisamos nos despedir, o coração não quer aceitar.Estamos de luto e sabemos que seu lugar nunca será preenchido. Descanse do lado de Deus, nosso amor por você é eterno."
    }, {
        "mensagem": "Uma grande alma nunca morre. Ela nos une cada vez mais."
    }, {
        "mensagem": "Você sempre foi uma grande fonte de inspiração e coragem para todos nós. Suas memórias ficarão para sempre guardadas em nossos corações. Rezo para que sua alma alcance a paz eterna…"
    }, {
        "mensagem": "Já se passaram 7 dias, mas aparece que foi há um segundo que meu coração se quebrou com a notícia do seu falecimento. Sei que você fechou os olhos para sempre, mas para mim continua presente em todos os pequenos gestos do cotidiano. Não existem palavras para traduzir essa saudade…"
    }, {
        "mensagem": "Hoje você partiu e só nos restou a saudade e uma dor enorme. Dói saber que não ouviremos mais suas risadas, não escutaremos mais a sua voz. Dói saber que você não estará mais presente nas comemorações em família.Mas eu sei que a lembrança de quem você foi e todos os bons momentos estarão guardados dentro do coração de cada um de nós. Descanse em paz!"
    }, {
        "mensagem": "O falecimento de um parente tão próximo é sempre um dia de sofrimento e saudade. A família está sentindo a sua falta a cada segundo e orando pelo seu descanso eterno. Por favor, cuida de nós…"
    }, {
        "mensagem": "Mãezinha, já são 30 dias de saudade… Sua partida quebrou meu coração, mas eu prometo que vou fazer de tudo para me reerguer e continuar te enchendo de orgulho. Nesse aniversário de 1 mês do seu falecimento, quero deixar uma homenagem para a mulher mais batalhadora que eu tive a honra de conhecer."
    }, {
        "mensagem": "Eu sei que nenhuma lágrima vai trazer você de volta… Meu coração tenta encontrar sossego, imaginando você em paz, sorrindo, entre as nuvens. Então, eu olho para o céu e agradeço por todas as coisas maravilhosas que você fez (e continuará fazendo) na minha vida."
    }, {
        "mensagem": "É com o coração cheio de mágoa que venho comunicar o falecimento do meu primo querido, um homem maravilhoso que sempre alegrou nossa família com seu espírito generoso e inspirador.Primo, você sempre será um orgulho para nós, descansa em paz e, por favor, cuida da nossa dor nessa hora."
    }, {
        "mensagem": "Dói muito dizer adeus a alguém como você, que sempre foi um sol nas nossas vidas e iluminou tudo o que estava em volta. A sua simpatia e o seu carinho serão repetidos por nós, todos os dias. Que você tenha o descanso eterno que merece, grande guerreiro."
    }, {
        "mensagem": "A vida nos dá a sensação de que temos todo o tempo do mundo pela frente e, do nada, nos prova o quanto é frágil e efêmera. Minha irmã querida, você ainda tinha tanto pela frente, tantos sonhos para concretizar…É muito duro aceitar a sua partida e me despedir da melhor amiga que eu já tive. Prometo que vou fazer de tudo para cuidar da nossa família e, sempre que eu olhar para o céu, estarei pensando em você. Fica com Deus, mana… Eu te amo eternamente!"
    }, {
        "mensagem": "Acordei, mais um dia, de luto pela morte do meu irmão. Uma pessoa que sempre se destacou das outras, repleta de luz e ideias geniais. Foram tantos os planos e os sonhos que ficaram por realizar…Mano, eu espero que você tenha encontrado o seu lugarzinho entre as nuvens. Um dia destes a gente se vê de novo."
    }, {
        "mensagem": "Meu pai querido, eu sei que as saudades vão virar rotina agora que você se foi, mas prometo que você sempre estará guardado em meu coração.Enquanto eu estiver nesse mundo, todos vão saber sobre o homem maravilhoso que eu sempre terei o orgulho de chamar de pai. O amor e a gratidão que eu sinto por você são infinitos. Fica com Deus, eu te amo!"
    }, {
        "mensagem": "Hoje o dia amanheceu triste com a notícia do falecimento de alguém tão querido e importante para nós. As saudades serão infinitas e sua memória estará sempre guardada em nossos corações. Descanse em paz, meu sogro..."
    }, {
        "mensagem": "Meu querido, que o seu sono seja profundo e repleto de paz e harmonia. Acredito, cada vez mais, que um dia nos veremos de novo e tudo vai fazer sentido. Por aqui, eu vou tocando o barco e prometo tentar cuidar de todo mundo, como você sempre me ensinou."
    }, {
        "mensagem": "Sei que um dia nos encontraremos de novo, mas até lá você estará em todos os meus pensamentos. Descanse em paz e até sempre…"
    }, {
        "mensagem": "A saudade eterniza a presença de quem se foi. Com o tempo esta dor se aquieta, se transforma em silêncio que espera, pelos braços da vida, um dia reencontrar."
    }, {
        "mensagem": "Perder um amigo de todas as horas é como perder um irmão. Hoje trago, com muita dor, a notícia do falecimento de um dos maiores companheiros que eu tive a honra de conhecer. Eu sei que você é tão bom que Deus te chamou para o lado dele muito cedo, mas saiba que tem um lugar na nossa mesa que sempre será seu. Saudades hoje e sempre!"
    }, {
        "mensagem": "Vó, você era o pilar que nos segurava, tudo o que nós temos e somos é graças à sua luta. Os valores que você me transmitiu permanecem comigo e serão sempre a bússola que me guia.Obrigada por tudo, meu anjo! Descanse em paz com a certeza de que foi a melhor avó do mundo e também a mais amada."
    }, {
        "mensagem": "Tio(a), meu amor por você não conhece barreiras e vai além da própria morte. Sua presença nesse mundo tocou muitos corações e despertou sorrisos em todos os lugares onde passou. Minha alma está de luto, mas também repleta de gratidão por ter conhecido uma pessoa tão maravilhosa como você."
    }, {
        "mensagem": "Algumas vontades de Deus são difíceis de aceitar… Já passou 1 ano desde o seu falecimento, mas cada dia continua sendo cinzento e preenchido pelas saudades.Rezo para que Deus traga algum consolo para meu coração machucado e prometo que suas memórias caminharão eternamente comigo."
    }, {
        "mensagem": "Uma grande amiga pode ser como um anjo enviado por Deus para cuidar de nós. A minha maior companheira se foi cedo demais e esse vazio no peito não some nunca. Sempre existirão coisas que eu só vou querer contar para você. Espero que você continue me escutando e me guiando lá no céu. Descansa em paz, irmã!"
    }, {
        "mensagem": "Mais que um tio, você foi como um pai para mim. A sua perda quebrou o meu coração, mas sei que vou carregar seus ensinamentos para o resto da vida. Adeus, meu tio querido…"
    }, {
        "mensagem": "Você partiu. Foi embora para bem longe de mim, bem longe da nossa família. Está agora repousando no Senhor. Como será dolorosa daqui pra frente a vida sem você! Mas serei eternamente grata ao Senhor pelo grande privilégio de todos os bons momentos que passamos juntos! Descanse em paz!"
    }, {
        "mensagem": "Meu coração vestiu o luto eterno porque você partiu deste mundo. Não sei como lhe dizer adeus para sempre quando ainda tinha tantas outras coisas para dizer. Queria ter tido mais tempo para dizer, e para fazer tudo que ainda sonhava viver ao seu lado. Agora virão os dias, os meses e os anos. O mundo continuará sua caminhada como antes, mas para mim nada voltará a ser igual. Sentirei sua falta todos os dias. Vá com Deus!"
    }, {
        "mensagem": "Com o coração pesado, oramos para que o nosso Senhor dê o merecido descanso para esta alma que partiu. Meus mais sinceros pêsames."
    },
    {
        "mensagem": "Meus pêsames. Que Deus possa confortar o seu coração neste difícil momento."
    },
    {
        "mensagem": "Meus mais profundos sentimentos para você e para a sua família. Espero que Deus lhe dê o conforto necessário para superar a dor que habita no seu peito neste momento."
    },
    {
        "mensagem": "Que as lembranças alegres de quem partiu floresçam na sua mente e tragam conforto para o seu coração. Meus pêsames."
    },
    {
        "mensagem": "Meus pêsames pela sua perda. Desejo que com o tempo, a sua dor possa diminuir e as boas lembranças de quem se foi prevaleçam na sua mente e no seu coração."
    },
    {
        "mensagem": "Que Deus conforte o seu coração e dê forças para a sua família neste momento."
    },
    {
        "mensagem": "Nós nunca iremos esquecê-lo. Ele foi uma força para muitas pessoas e iluminou a vida de muita gente. Meus pêsames."
    },
    {
        "mensagem": "Espero que Deus possa oferecer o descanso eterno para o seu avô. Tive a honra e o privilégio de conhecê-lo e nunca vou me esquecer das palavras de sabedoria que ele me ofertou. Meus pêsames."
    },
    {
        "mensagem": "Meu amigo, são nessas horas que vale lembrar que você pode contar comigo para o que der e vier. Lamento muito pela sua perda e espero que Deus possa confortar o seu coração neste momento triste que você está passando."
    },
    {
        "mensagem": "Eu sei que o que você está passando neste momento é inexplicavelmente doloroso. Sei também, que nada, nem ninguém neste mundo, pode te preparar para esta inestimável perda. Venho por meio desta mensagem, desejar apenas conforto e paz para o seu coração e o da sua família neste momento. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Meu amigo, saiba que você e a sua família estão rodeados de amor neste momento de tristeza. Pode contar comigo para o que precisar. Meus pêsames."
    },
    {
        "mensagem": "Palavras não secarão as suas lágrimas e os abraços não removerão a sua dor. Mas saiba que neste momento, você está rodeado de pessoas que te amam e que estarão ao seu lado para o que você precisar. Deus te abençoe muito e te dê muita força para conseguir superar este triste momento."
    },
    {
        "mensagem": "Ela era uma pessoa maravilhosa e tenho certeza que ficará para sempre no coração de todos que tiveram o privilégio de conhecê-la. Meus sentimentos pela sua perda, meu grande amigo(a)."
    },
    {
        "mensagem": "Eu só espero que Deus ofereça conforto, paz e esperança para este momento de dor que você está sentindo e que Ele possa acalentar o seu coração e o da sua família."
    },
    {
        "mensagem": "Embora as minhas palavras não possam diminuir o seu sofrimento, saiba que estou orando para que Deus conforte a sua família levando paz para dentro da sua casa. Meus pêsames pela sua perda."
    },
    {
        "mensagem": "Procure nas lembranças um fio de felicidade, busque os seus amigos para te recordar da sua força e saiba que te amamos muito e estamos com você neste momento difícil. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Nos momentos em que nada parece fazer sentido, ore para que Deus possa enviar um pouco de paz para dentro do seu coração. Meus pêsames."
    },
    {
        "mensagem": "Qualquer palavra que dizemos neste momento parece fútil para tentar consolar a dor que emana do seu peito neste momento. Espero apenas que Deus possa levar um pouco de conforto para você e para a sua família nestes dias de luto. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Existem almas que brilham tão forte aqui na Terra, que Papai do Céu reserva um lugar especial no céu para que elas iluminem as nossas noites mais escuras."
    },
    {
        "mensagem": "Ainda estou em choque pela notícia. Gostaria de estar ao seu lado neste momento para tentar levar um pouco de conforto para você e para a sua família."
    },
    {
        "mensagem": "Que Deus possa cuidar da alma que partiu e confortar aqueles que ficaram. Meus mais sinceros sentimentos neste difícil momento de luto."
    },
    {
        "mensagem": "Ele pode ter partido das nossas vidas, mas jamais sairá dos nossos corações. Meus pêsames, amigo."
    },
    {
        "mensagem": "Depois que as lágrimas secarem, o que vai restar serão as memórias felizes de quem partiu. Sei que neste momento a dor fala mais alto e eu oro para que Deus conforte o seu coração. Estou à disposição para o que precisar. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Ele pode ter partido das nossas vidas, mas jamais sairá dos nossos corações. Meus pêsames, amigo."
    },
    {
        "mensagem": "Depois que as lágrimas secarem, o que vai restar serão as memórias felizes de quem partiu. Sei que neste momento a dor fala mais alto e eu oro para que Deus conforte o seu coração. Estou à disposição para o que precisar. Meus mais sinceros sentimentos."
    },
    {
        "mensagem": "Saiba que estou à disposição da sua família hoje e sempre, meu amigo. Sinto muito pela sua perda. Meus mais sinceros pêsames."
    },
    {
        "mensagem": "Meus pensamentos e as minhas orações estão direcionadas a você e à sua família no dia de hoje. Sinto muito pela sua perda."
    },
    {
        "mensagem": "Meus pêsames, amiga. Sei que é um momento difícil e gostaria de te lembrar que você pode contar comigo para o que precisar. Espero que o nosso Senhor possa confortar o seu coração e o da sua família neste momento."
    },
    {
        "mensagem": "Lembre-se que ela estará no seu coração para toda a eternidade. Meus pêsames pela sua perda."
    },
    {
        "mensagem": "Não existem palavras suficientes que possam expressar o quanto eu lamento a sua perda neste dia. Que Deus traga conforto e paz para sua casa."
    }
    ]
}