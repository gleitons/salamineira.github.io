console.warn('Criado por:')
console.log ('Gleiton Aparecido Soares de Souza')
console.warn("www.gleiton.com.br")
console.log("")

function search_animal() {
    const mostraSer = document.querySelector('#listServidor');
    
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('servidorSelecionado');

    console.log(input.length)
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input) || input.length <= 0) {
            x[i].style.display="none";
            //mostraSer.style.display = "none"
           
        }
        else {
            x[i].style.display="list-item";   
            mostraSer.style.display = "block"              
        }
    }
}

function PlaySound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}