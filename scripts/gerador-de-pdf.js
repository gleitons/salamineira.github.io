
function emManutencao() {
    alert('ESTAMOS EM MANUTENÇÃO, EM BREVE ESTARÁ DISPONÍVEL')
}

function generatordePDF(){

const cnpj = document.getElementById('cnpj').value;
const mei = document.getElementById('mei').value;
const dataIni = document.getElementById('dataIni').value;
const dataF = document.getElementById('dataF').value;
const revendaSemNota = document.getElementById('revendaSemNota').value;
const revendaComNota = document.getElementById('revendaComNota').value;
const IndustrialSemNota = document.getElementById('IndustrialSemNota').value;
const IndustrialComNota = document.getElementById('IndustrialComNota').value;
const servicoSemNota = document.getElementById('servicoSemNota').value;
const servicoComNota = document.getElementById('servicoComNota').value;
const local = document.getElementById('local').value.toUpperCase();
const datadoLocal = document.getElementById('datadoLocal').value;

emManutencao();



var doc = new jsPDF();
// doc.addImage("imagens-sala/relatorio-sala.jpg", "JPEG", 55, 5, 90, 23);




// Empty square
doc.setDrawColor(0);
doc.setFillColor(220, 220, 220);
doc.rect(10, 30, 190, 10, "FD");
doc.setFontSize(13);
doc.text('RELATÓRIO MENSAL DAS RECEITAS BRUTAS', 105, 38, null, null, "center")
doc.rect(10, 40, 190, 10);
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
doc.setFontSize(13);
doc.text('RECEITA BRUTA MENSAL – REVENDA DE MERCADORIAS (COMÉRCIO)', 105, 78, null, null, "center")

doc.rect(10, 80, 150, 10);
doc.setFontSize(12);
doc.text('I – Revenda de mercadorias com dispensa de emissão de documento fiscal', 12, 88)
doc.rect(160, 80, 40, 10);
doc.setFontSize(12);
doc.text(`R$ ${revendaSemNota.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`, 162, 88)

doc.rect(10, 90, 150, 10);
doc.setFontSize(12);
doc.text('II – Revenda de mercadorias com documento fiscal emitido', 12, 98)
doc.rect(160, 90, 40, 10);
doc.setFontSize(12);
doc.text(`R$ ${revendaComNota}`, 162, 98)

doc.rect(10, 100, 150, 10);
doc.setFontSize(12);
doc.text('I – Revenda de mercadorias com dispensa de emissão de documento fiscal', 12, 108)
doc.rect(160, 100, 40, 10);
doc.setFontSize(12);
doc.text('R$', 162, 108)

doc.setDrawColor(0);
doc.setFillColor(220, 220, 220);
doc.rect(10, 110, 190, 10, "FD");
doc.setFontSize(12);
doc.text('RECEITA BRUTA MENSAL – VENDA DE PRODUTOS INDUSTRIALIZADOS (INDÚSTRIA)', 105, 118, null, null, "center")

doc.rect(10, 120, 150, 15);
doc.setFontSize(12);
doc.text('IV – Venda de produtos industrializados com dispensa de emissão de', 12, 128)
doc.setFontSize(12);
doc.text('documento fiscal', 12, 133)
doc.rect(160, 120, 40, 15);
doc.setFontSize(12);
doc.text(`R$ ${IndustrialSemNota}`, 162, 133)

doc.rect(10, 135, 150, 10);
doc.setFontSize(12);
doc.text('V – Venda de produtos industrializados com documento fiscal emitido', 12, 143)
doc.rect(160, 135, 40, 10);
doc.setFontSize(12);
doc.text(`R$ ${IndustrialComNota}`, 162, 143)

doc.rect(10, 145, 150, 10);
doc.setFontSize(12);
doc.text('VI – Total das receitas com venda de produtos industrializados (IV + V)', 12, 153)
doc.rect(160, 145, 40, 10);
doc.setFontSize(12);
doc.text(`R$ ${IndustrialComNota}`, 162, 153)

doc.setDrawColor(0);
doc.setFillColor(220, 220, 220);
doc.rect(10, 155, 190, 10, "FD");
doc.setFontSize(12);
doc.text('RECEITA BRUTA MENSAL – PRESTAÇÃO DE SERVIÇOS ', 105, 163, null, null, "center")

doc.rect(10, 165, 150, 15);
doc.setFontSize(12);
doc.text('VII – Receita com prestação de serviços com dispensa de emissão de', 12, 170)
doc.setFontSize(12);
doc.text('documento fiscal', 12, 175)
doc.rect(160, 165, 40, 15);
doc.setFontSize(12);
doc.text(`R$ ${servicoSemNota}`, 162, 173)

doc.rect(10, 180, 150, 10);
doc.setFontSize(12);
doc.text('VIII – Receita com prestação de serviços com documento fiscal emitido', 12, 188)
doc.rect(160, 180, 40, 10);
doc.setFontSize(12);
doc.text(`R$ ${servicoComNota}`, 162, 188)

doc.rect(10, 190, 150, 10);
doc.setFontSize(12);
doc.text('IX – Total das receitas com prestação de serviços (VII + VIII)', 12, 198)
doc.rect(160, 190, 40, 10);
doc.setFontSize(12);
doc.text(`R$ ${IndustrialComNota}`, 162, 198)

doc.rect(10, 200, 150, 10);
doc.setFontSize(12);
doc.text('IX – Total das receitas com prestação de serviços (VII + VIII)', 12, 208)
doc.rect(160, 200, 40, 10);
doc.setFontSize(12);
doc.text(`R$ ${IndustrialComNota}`, 162, 208)

doc.rect(10, 210, 150, 25);
doc.setFontSize(12);
doc.text('LOCAL E DATA:', 12, 218)
doc.rect(160, 210, 40, 25);
doc.setFontSize(12);
doc.text(`${local}, ${datadoLocal}`, 12, 228)

doc.rect(10, 235, 190, 25);
doc.setFontSize(12);
doc.text('ENCONTRAM-SE ANEXADOS E ESTE RELATÓRIO:', 12, 240)
doc.setFontSize(10);
doc.text('- Os documentos fiscais comprobatórios das entradas de mercadorias e serviços tomados referentes ao período;', 12, 245)
doc.setFontSize(10);
doc.text('- As notas fiscais relativas às operações ou prestações realizadas eventualmente emitidas.', 12, 250)



// doc.save('a4.pdf')



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




