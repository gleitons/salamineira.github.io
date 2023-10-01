const MenuLateral = () => {
    document.querySelector('.menusApresentação').innerHTML = ` 
    <nav class="menuLateral">
    <div>
    <p>MENU - FUTURO CONSULTORIA</p>
    </div>
    <a href="#" onclick="dMode()">
    <li><i class="bi bi-brightness-high-fill"></i> <i class="bi bi-moon-fill"></i></li>
    </a> 
    <a href="./">
        <li><i class="bi bi-house-fill"></i> Inicio</li>
    </a>
    <p class="avisoDiv">Buscador S</p>
    <a href="./buscar-cnpj.html">
    <li><i class="bi bi-house-fill"></i> Buscador Completo</li>
    </a>
    <p class="avisoDiv">Adicionar Atalho</p>

    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Atalho
     <ul class="subMenu">
        <a href="./criar-atalho.html">
        <li><i class="bi bi-house-up-fill"></i>Novo</li>
        </a>   
        <a href="./editar-atalho.html">
        <li><i class="bi bi-house-up-fill"></i>Editar</li>
        </a>   
        <a href="#" onclick="addAtalhos()">
        <li><i class="bi bi-house-up-fill"></i>Adicionar na Tela</li>
        </a>   
        
     </ul>
    </li>  

    <p class="avisoDiv">Consulta CNPJ</p>
    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Consulta CNPJ
    <ul class="subMenu">
    <a href="./buscar-cnpj.html.html">
    <li><i class="bi bi-house-up-fill"></i>Rápida</li>
    </a>   
    <a href="https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp" target="_blank">
    <li><i class="bi bi-house-up-fill"></i>Receita Federal</li>
    </a>    
    <a href="https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp" target="_blank">
    <li><i class="bi bi-house-up-fill"></i>E-CAC</li>
    </a>   
    <a href="./inscricao-estadual.html" >
    <li><i class="bi bi-house-up-fill"></i>Estadual</li>
    </a>     
    </ul>
    </li>  
    <p class="avisoDiv">Certidões</p>
    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Certidão CNPJ
    <ul class="subMenu">
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND Federal</li>
    </a>  
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND Estadual</li>
    </a>  
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND FGTS</li>
    </a>  
    <a href="./itbi-rural.html">
    <li><i class="bi bi-house-up-fill"></i>Informações RFB</li>
    </a>      
    </ul>
    </li>  

    <p class="avisoDiv">MEI (Microempreendedor Individual)</p>
    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Especial MEI
    <ul class="subMenu">
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND Federal</li>
    </a>  
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND Estadual</li>
    </a>  
    <a href="./itbi-urbano.html">
    <li><i class="bi bi-house-up-fill"></i>CND FGTS</li>
    </a>  
    <a href="./itbi-rural.html">
    <li><i class="bi bi-house-up-fill"></i>Informações RFB</li>
    </a>      
    </ul>
    </li>  


    <p class="avisoDiv">Atendimento SAS SEBRAE</p>

    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Atendimentos
     <ul class="subMenu">
        <a href="./cadastro-pessoal.html">
        <li><i class="bi bi-house-up-fill"></i>Modelos</li>
        </a>   
        <a href="./cadastro-empresa.html">
        <li><i class="bi bi-house-up-fill"></i>Cadastrar</li>
        </a>   
         <a href="./cadastro-imovel.html">
             <li><i class="bi bi-house-add-fill"></i>Editar</li>
         </a>
        
         <a href="./cadastro-endereco.html">
             <li><i class="bi bi-signpost-fill"></i> Excluir</li>
         </a>
     </ul>
    </li>  
    <p class="avisoDiv">Favoritos</p>

    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Favoritos
     <ul class="subMenu">
        <a href="./cadastro-pessoal.html">
        <li><i class="bi bi-house-up-fill"></i>Novo</li>
        </a>   
        <a href="./cadastro-empresa.html">
        <li><i class="bi bi-house-up-fill"></i>Editar</li>
        </a>   
         <a href="./cadastro-imovel.html">
             <li><i class="bi bi-house-add-fill"></i>Excluir</li>
         </a>
     </ul>
    </li>  

    <li class="menuDrop"><i class="bi bi-arrow-right-square-fill"></i> Editar
    <ul class="subMenu">
    <a href="./editar-pessoal.html">
    <li><i class="bi bi-house-down-fill"></i>Pessoal</li>
    </a>    
    <a href="./editar-empresa.html">
    <li><i class="bi bi-house-down-fill"></i>Empresa</li>
    </a> 
    <a href="./editar-imovel.html">
    <li><i class="bi bi-house-down-fill"></i>Imóvel</li>
    </a> 
    <a href="">
        <li><i class="bi bi-signpost-fill"></i> Endereço</li>
    </a>
    </ul>
   </li> 

   
    
<a href="./backup.html">
<li><i class="bi bi-layer-backward"></i> Backup</li>
</a> 
<a href="./resetar.html">
<li><i class="bi bi-trash3-fill"></i> Resetar</li>
</a> 



    
 </nav>`

}
MenuLateral()

const menuTop = () => {
    document.querySelector('header').innerHTML = ` 
    <div>
    <a href="./">
    <div class="logoCima">        
    </div>
    </a>
    <div>
        <h2>FUTURO CONSULTORIA</h2>
        <h3>26.300.217/0001-00</h3>
    </div>
   </div>`
}
menuTop()

document.querySelector('head').innerHTML += `<link rel="shortcut icon" href="./src/img/futuro-consultoria-horizonte.svg" type="image/x-icon">`