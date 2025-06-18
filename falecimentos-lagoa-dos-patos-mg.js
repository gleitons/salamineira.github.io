function ocultarMostar(numb) {
    const botao = document.querySelector(`#cliqueOculto${numb}`);
    const ocultado = document.querySelector(`#falecOculto${numb}`)

    botao.addEventListener('click', () => {
        ocultado.classList.toggle('dnone');

    })


}
function previewFile(num) {

    const preview = document.querySelector(`img`);
    const file = document.querySelector('input[type=file]').files[0];
    console.log(preview)
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // convert image file to base64 string
        preview.src = reader.result;
        console.log(preview.src)

        document.querySelector(`#logoEmpresa${num}`).value = preview.src
        document.querySelector(`#previewfoto${num}`).src = preview.src;

    }, false);

    if (file) {
        reader.readAsDataURL(file);

    }
}
function fecharAbrirEnviar(nume) {

    console.log(nume)
    const bClose = document.getElementById(`bBaixo${nume}`);
    const botaoFecha = document.querySelector(`.btnfechaModal${nume}`);
    const ocultado = document.querySelector(`#exampleModal${nume}`)

    botaoFecha.addEventListener('click', () => {
        console.log(ocultado)
        ocultado.style.display = "none";

    })
    bClose.addEventListener('click', () => {
        ocultado.style.display = "none";
    })




}
function abrirModal(valor) {
    const abrireEditar = document.querySelector(`#abrirEditar${valor}`);
    const abrirbotao = document.querySelector(`#exampleModal${valor}`);

    abrireEditar.addEventListener('click', () => {
        console.log(abrirbotao)
        abrirbotao.style.display = "block";

    })
}

