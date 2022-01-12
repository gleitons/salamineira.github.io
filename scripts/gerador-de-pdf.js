
function emManutencao() {
    alert('ESTAMOS EM MANUTENÇÃO, EM BREVE ESTARÁ DISPONÍVEL')
}

function generatordePDF(){

const cnpj = document.getElementById('cnpj').value;
const mei = document.getElementById('mei').value.toUpperCase();
const dataIni = concertaData(document.getElementById('dataIni').value);
const dataF = concertaData(document.getElementById('dataF').value);
const revendaSemNota = document.getElementById('revendaSemNota').value;
const revendaComNota = document.getElementById('revendaComNota').value;
const somarevenda = parseFloat(revendaComNota) + parseFloat(revendaSemNota);

const IndustrialSemNota = document.getElementById('IndustrialSemNota').value;
const IndustrialComNota = document.getElementById('IndustrialComNota').value;
const somaindustria = `${parseFloat(IndustrialSemNota)+parseFloat(IndustrialComNota)}`;

const servicoSemNota = document.getElementById('servicoSemNota').value;
const servicoComNota = document.getElementById('servicoComNota').value;
const somaServicos = parseFloat(servicoSemNota) + parseFloat(servicoComNota);

const somaTotal = parseFloat(somarevenda) + parseFloat(somaindustria) + parseFloat(somaServicos);
const local = document.getElementById('local').value.toUpperCase();
const datadoLocal = addNomesMeses(concertaData(document.getElementById('datadoLocal').value));

// emManutencao();
if (cnpj.length > 0 && mei.length > 0 && dataIni.length > 0 && dataF.length > 0 && revendaSemNota.length > 0 && revendaComNota.length > 0 && IndustrialSemNota.length > 0 && IndustrialComNota.length > 0 && servicoSemNota.length > 0 && servicoComNota.length > 0 && local.length > 0 && datadoLocal.length > 0 ) {


var doc = new jsPDF();



// Empty square
// Don't forget, that there are CORS-Restrictions. So if you want to run it without a Server in your Browser you need to transform the image to a dataURL
// Use http://dataurl.net/#dataurlmaker
var doc = new jsPDF();

doc.setFontSize(40);
doc.setFont("helvetica", "bold");
doc.text("SALA", 55, 20);
doc.setTextColor(205, 129, 64);
doc.setFontSize(40);
doc.setFont("helvetica", "bold");
doc.text("MINEIRA", 95, 20);

doc.setTextColor(0);
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("do Empreendedor de", 60, 25);
doc.setTextColor(205, 129, 64);
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("Lagoa dos Patos MG", 105, 25);


doc.setTextColor(205, 129, 64);
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("", 105, 25);

doc.setTextColor(100);
doc.setFontSize(8);
doc.text("Crie esse relatório grátis em www.salamineira.com/relatorio", 7, 290, null, 90);

doc.setTextColor(0);
doc.setDrawColor(0);
doc.setFillColor(220, 220, 220);
doc.rect(10, 30, 190, 10, "FD");
doc.setFontSize(13);
doc.setFont("helvetica", "bold");
doc.text('RELATÓRIO MENSAL DAS RECEITAS BRUTAS', 105, 38, null, null, "center")
doc.rect(10, 40, 190, 10);
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text(`CNPJ: ${cnpj}`, 12, 48)

doc.rect(10, 50, 190, 10);
doc.setFontSize(12);
doc.text(`Empreendedor individual: ${mei}`, 12, 58)

doc.rect(10, 60, 190, 10);
doc.setFontSize(12);
doc.text(`Período de apuração: de ${dataIni} a ${dataF}`, 12, 68)

doc.setDrawColor(0);
doc.setFillColor(220, 220, 220);
doc.rect(10, 70, 190, 10, "FD");
doc.setFont("helvetica", "bold");
doc.setFontSize(13);
doc.text('RECEITA BRUTA MENSAL – REVENDA DE MERCADORIAS (COMÉRCIO)', 105, 78, null, null, "center")

doc.rect(10, 80, 150, 10);
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text('I – Revenda de mercadorias com dispensa de emissão de documento fiscal', 12, 88)
doc.rect(160, 80, 40, 10);
doc.setFontSize(12);
doc.text(`${ converteNumero(revendaSemNota)}`, 162, 88)

doc.rect(10, 90, 150, 10);
doc.setFontSize(12);
doc.text('II – Revenda de mercadorias com documento fiscal emitido', 12, 98)
doc.rect(160, 90, 40, 10);
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text(`${ converteNumero(revendaComNota)}`, 162, 98)

doc.rect(10, 100, 150, 10);
doc.setFontSize(12);
doc.text('III – Total das receitas com revenda de mercadorias (I + II)', 12, 108)
doc.rect(160, 100, 40, 10);

doc.setFontSize(12);
doc.text(`${ converteNumero(somarevenda)}`, 162, 108)

doc.setDrawColor(0);
doc.setFillColor(220, 220, 220);
doc.rect(10, 110, 190, 10, "FD");

doc.setFontSize(12);
doc.text('RECEITA BRUTA MENSAL – VENDA DE PRODUTOS INDUSTRIALIZADOS (INDÚSTRIA)', 105, 118, null, null, "center")

doc.rect(10, 120, 150, 15);
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text('IV – Venda de produtos industrializados com dispensa de emissão de', 12, 128)
doc.setFontSize(12);
doc.text('documento fiscal', 12, 133)
doc.rect(160, 120, 40, 15);
doc.setFontSize(12);
doc.text(`${ converteNumero(IndustrialSemNota)}`, 162, 133)

doc.rect(10, 135, 150, 10);
doc.setFontSize(12);
doc.text('V – Venda de produtos industrializados com documento fiscal emitido', 12, 143)
doc.rect(160, 135, 40, 10);
doc.setFontSize(12);
doc.text(`${ converteNumero(IndustrialComNota)}`, 162, 143)

doc.rect(10, 145, 150, 10);
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text('VI – Total das receitas com venda de produtos industrializados (IV + V)', 12, 153)
doc.rect(160, 145, 40, 10);
doc.setFontSize(12);
doc.text(`${ converteNumero(somaindustria)}`, 162, 153)

doc.setDrawColor(0);
doc.setFillColor(220, 220, 220);
doc.rect(10, 155, 190, 10, "FD");
doc.setFontSize(12);
doc.text('RECEITA BRUTA MENSAL – PRESTAÇÃO DE SERVIÇOS ', 105, 163, null, null, "center")

doc.rect(10, 165, 150, 15);
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text('VII – Receita com prestação de serviços com dispensa de emissão de', 12, 170)
doc.setFontSize(12);
doc.text('documento fiscal', 12, 175)
doc.rect(160, 165, 40, 15);
doc.setFontSize(12);
doc.text(`${ converteNumero(servicoSemNota)}`, 162, 173)

doc.rect(10, 180, 150, 10);
doc.setFontSize(12);
doc.text('VIII – Receita com prestação de serviços com documento fiscal emitido', 12, 188)
doc.rect(160, 180, 40, 10);
doc.setFontSize(12);
doc.text(`${ converteNumero(servicoComNota)}`, 162, 188)

doc.rect(10, 190, 150, 10);

doc.setFontSize(12);
doc.text('IX – Total das receitas com prestação de serviços (VII + VIII)', 12, 198)
doc.rect(160, 190, 40, 10);
doc.setFontSize(12);
doc.text(`${ converteNumero(somaServicos)}`, 162, 198)

doc.rect(10, 200, 150, 10);
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text('X - Total geral das receitas brutas no mês (III + VI + IX)', 12, 208)
doc.rect(160, 200, 40, 10);
doc.setFontSize(12);
doc.text(`${ converteNumero(somaTotal)}`, 162, 208)

doc.rect(10, 210, 150, 25);
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text('LOCAL E DATA:', 12, 218)
doc.rect(160, 210, 40, 25);
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text(`${local}, ${datadoLocal}`, 12, 228)

doc.rect(10, 235, 190, 25);
doc.setFontSize(12);
doc.text('ENCONTRAM-SE ANEXADOS E ESTE RELATÓRIO:', 12, 240)
doc.setFontSize(10);
doc.text('- Os documentos fiscais comprobatórios das entradas de mercadorias e serviços tomados referentes ao período;', 12, 245)
doc.setFontSize(10);
doc.text('- As notas fiscais relativas às operações ou prestações realizadas eventualmente emitidas.', 12, 250)
doc.setFontSize(10);
doc.text('Assinatura', 170, 218)
doc.setFontSize(10);
doc.text('__________________', 162, 230)



mostradev.innerHTML = `</br> ${somarevenda}`
doc.save(`relatorio ${mei} de ${dataIni} a ${dataF} .pdf`)
mostradev.innerHTML = ``

}
else {
  mostradev.innerHTML = `POR FAVOR, PREENCHA TODOS OS DADOS`
  alert('POR FAVOR, PREENCHA TODOS OS DADOS');
}



}

function concertaData(dateAnterior) {
    const invertido = dateAnterior.split('-').reverse().join("");
    const separado = invertido.split('');
    const dia = invertido.slice(0, 2);
    const mes = invertido.slice(2, 4);
    const ano = invertido.slice(4);


    // const diaCV = invertido.split("", 2).toLocaleString();
    // const dia = diaCV.replace(/,/g, '');
    // const mesCV = invertido.split(1, 3).toLocaleString();
    // const mes = mesCV.replace(/,/g, '');
    // const anoCV = invertido.split("", 2).toLocaleString();
    // const ano = diaCV.replace(/,/g, '');

    return `${dia}/${mes}/${ano}`;

}
function addNomesMeses(recebeMes) {
    const dia = recebeMes.slice(0,2)
    const mes = calculames(recebeMes.slice(3,5))
    const ano = recebeMes.slice(6)
    return `${dia} de ${mes} de ${ano}`;

}
function calculames(nMes){
    const Mes = parseInt(nMes)
    if (Mes == 1) {
      var mesReturn = `janeiro`
    } else if(Mes == 2){
      var mesReturn = `fevereiro`
    }
   else if (Mes == 3){
    var mesReturn = `março`
  }
   else if (Mes == 4) {
      var mesReturn = `abril`
    }
  
    else if (Mes == 5) {
    var mesReturn = `maio`
  }
   else if (Mes == 6) {
      var mesReturn = `junho`
    }
    else if(Mes == 7){
    var mesReturn = `julho`
  }
    else if (Mes == 8){
  var mesReturn = `agosto`
  } else if (Mes == 9){
    var mesReturn = `setembro`
  }
  else if (Mes == 10){
    var mesReturn = `outubro`
  }
  else if (Mes == 11){
    var mesReturn = `novembro`
    }
  else {
    var mesReturn = `dezembro`
  }

    return mesReturn;
}
/*Função para converter numero em real*/


function converteNumero(number){
  return  new Intl.NumberFormat('pt-br', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
};

function imagePDFO() {
  return `data:image/jpeg;base64,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data:image/jpeg;base64,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`
}

/*var name = prompt("What is your name?");
var multiplier = parseInt(prompt("Enter a number:"), 10);

var doc = new jsPDF();
doc.setFontSize(22);
doc.text(20, 20, "Questions");
doc.setFontSize(16);
doc.text(20, 30, "This belongs to: " + name);

for (var i = 1; i <= 12; i++) {
  doc.text(20, 30 + i * 10, i + " x " + multiplier + " = ___");
}

doc.addPage();
doc.setFontSize(22);
doc.text(20, 20, "Answers");
doc.setFontSize(16);

for (var i = 1; i <= 12; i++) {
  doc.text(20, 30 + i * 10, i + " x " + multiplier + " = " + i * multiplier);
}

// You wouldn't normally call this - this is just to make the
// demo not look broken as we've disabled auto update.
if (jsPDFEditor !== undefined) {
  jsPDFEditor.update(true);
}*/




