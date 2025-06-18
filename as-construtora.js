function asConstrutora() {
// Don't forget, that there are CORS-Restrictions. So if you want to run it without a Server in your Browser you need to transform the image to a dataURL
// Use http://dataurl.net/#dataurlmaker
const Prestador = document.getElementById('selPres').value;
const referencia = document.getElementById('referencia').value;
const TipoPag = document.getElementById('tipoPagPres').value;
const DataPag = addNomesMeses(concertaData(document.getElementById('dataPres').value));
const ValoPago = parseFloat(document.getElementById('valorPres').value);
const valopag = ValoPago.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
const Cidade = document.getElementById('cidPres').value;
document.getElementById('carr').innerHTML = `<p>Preencha os Dados</p>
<img  style="top: -60px; width: 150px; margin-left: 200px;" src="https://www.blogson.com.br/wp-content/uploads/2017/10/lg.progress-bar-preloader.gif" />
<p>AGUARDANDO...</p>`;
const dis = 30;




if (Prestador == "ADENILSON PEREIRA DOS SANTOS 05102483650") {
    CNPJPrestador = `44.242.995/0001-72`
} else if (Prestador == "CELESTINO XAVIER CAETANO 09691372657") {
    CNPJPrestador = "43.973.542/0001-53"
} else if (Prestador == "ITALO RYAN BARBOSA 70572386656") {
    CNPJPrestador = "44.241.428/0001-00"
    
}else {
    alert('Selecione um prestador');
    
}



var doc = new jsPDF();

doc.addImage(`${fundoAS()}`, "JPEG", 20, 60, 180, 180);

doc.setFontSize(30);
doc.setFont("helvetica", "bold");
doc.text("AS CONSTRUTORA", 85, `${15+dis}`);

doc.setFontSize(12);
doc.setFont("helvetica", "normal");
doc.text("ANDEILTON SOARES DE SOUZA 11168491606", 85, `${25+dis}`);

doc.setFont("helvetica", "normal");
doc.text("CNPJ 26.873.013/0001-69", 115, `${30+dis}`);

doc.addImage(`${logoAS()}`, "JPEG", 20, 34, 35, 35);
 

doc.setFontSize(15);
doc.setFont("helvetica", "bold");
doc.text("RECIBO DE PAGAMENTO", 105, `${50+dis}`, null, null, "center");

doc.setFont("helvetica", "normal");
doc.text("Pelo presente, eu ", 20, `${60+dis}`);

doc.setFont("helvetica", "bold");
doc.text(`${Prestador}`, 65, `${60+dis}`);

doc.setFont("helvetica", "normal");
doc.text(`inscrito no CNPJ: `, 20, `${70+dis}`);

doc.setFont("helvetica", "bold");
doc.text(`${CNPJPrestador}`, 65, `${70+dis}`);

doc.setFont("helvetica", "normal");
doc.text("declaro que recebi nesta data", 115, `${70+dis}`);

doc.setFont("helvetica", "bold");
doc.text(`${DataPag}`, 20, `${80+dis}`);

doc.setFont("helvetica", "normal");
doc.text("o valor de ", 85, `${80+dis}`);

doc.setFont("helvetica", "bold");
doc.text(`${valopag}`, 110, `${80+dis}`);

doc.setFont("helvetica", "normal");
doc.text("por meio de", 150, `${80+dis}`);

doc.setFont("helvetica", "bold");
doc.text(`${TipoPag}`, 20, `${90+dis}`);


doc.setFont("helvetica", "normal");
doc.text("realizada por AS CONSTRUTORA", 100, `${90+dis}`);

doc.setFont("helvetica", "bold");
doc.text("CNPJ: 26.873.013/0001-69", 20, `${100+dis}`);

doc.setFont("helvetica", "normal");
doc.text("referente a serviços de Alvenaria.", 90, `${100+dis}`);

doc.setFont("helvetica", "normal");
doc.text(`${referencia}`, 20, `${110+dis}`);

doc.setFont("helvetica", "normal");
doc.text("Sendo expressão de verdade e sem qualquer coação, firmo o presente.", 20, `${140+dis}`);

doc.setFont("helvetica", "normal");
doc.text(`${Cidade},`, 20, `${150+dis}`);

doc.setFont("helvetica", "normal");
doc.text(`${DataPag}`, 100, `${150+dis}`);


doc.setFont("helvetica", "normal");
doc.text("_______________________________________", 50, `${180+dis}`);

doc.setFont("helvetica", "normal");
doc.text("Representante", 90, `${190+dis}`);

doc.setFont("helvetica", "normal");
doc.text(`${Prestador}`, 50, `${200+dis}`);

doc.save(`Comprovante de Pagamento ${Prestador} - ${DataPag}.pdf`);

document.getElementById('carr').style.display = "none"


document.getElementById('Suc').innerHTML = `<h2>DOCUMENTO GERADO COM SUCESSO, FOI SALVO EM SEU DISPOSITIVO</h2>`;


}


function logoAS(){
    return "data:image/jpeg;base64,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"; 
}
function fundoAS(){
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//AABEIAfQB9AMBIgACEQEDEQH/xABoAAEBAQEBAQEAAAAAAAAAAAAAAQMCBAUHEAEBAAICAwEBAQEBAAAAAAAAAQIRAxITMTIhUUEiQgEBAQEBAQAAAAAAAAAAAAAAAAECAwQRAQEBAQEBAQEAAAAAAAAAAAABEQISMUEh/9oADAMBAAIRAxEAPwD9mAAAAAAAAAAAAAAAAAAAAA2CCgIKAmxdICiAKGzYAgAAAqAKIAogACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAATQEE0UQTVAEAAAAABQANFEDUUiC6OhysUUQUUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABF2gAAGxBnRUBNUAQBRcEFF8oALgGgMANhgGgMBFDBBRMEF0iYoAgKguiiLtqVAFUQUBBQAAAAAAAAAAAAAAAAAAAAAAAAEFcpotqAzqgACqVZETQJa1go4uTnsuJrTsnZntFxNd9k7ORcNXsdqgqLum6gC9l7ORMHfZZkzDF1rMnW2C9k8mthn2WZJi67QVnFQUSwQBlVEFlFAaRRBRQAAAAAAAAAAAAAAAAAEVAAAARLQEVhQFWQAS1vEVLk4uTjbUiWurk53QaZAAAAAAAAAAAAAAAAAAXbuVmJitlZbdTJmxddouxmxUFRjFBA0dANxFEFFEAUAAAAAAAAAAAAABFAQES0EBhVBVkQEtZXN0kS13cmdrnY3ImqIKiiAiiAqjqTa9E2GOB30p0Ni44FsciOhBRRAFEAUQBRBBRAFEAdzJpKwdSpYuthxMnbFjSI6RzsVFQJR0IrcqCoqgAAAAAAAAAAigJAAARLQQHNRRWpAc26Mrphlk6yazauWThB0xl0OQR0IAogCiArfBpWWDVyv1qACKxycOs3DpGBUFF2IAogCiKAIAquQHSIAquVBdtMayJUsHpgyxyaudjcqI6csWKKgko6EVuIAAKlFFAAAABAUQAAoIhRztUVFWQVzldRbdPNnm6SM2plm42g6xh0OVUUQB0OQHQ5AdDkB6ONsx42zj19bgAisM2Ud8jjB0jDSYnRvBn01jDodHoNHox5+h0egPRjz3Fw9OXp5bWpdZqiDSKIAogCiAOhyA6lbY5POsqWLr1jPDJo5WNuRajnVHTlV5pVAbQoKAAAACCoAAAlVyx1ViKKyoKy5MtOsjNZ8mTAuW0dpGKquRWXQ5BXQgCiAKGM3WnjS0kZjToys1QenibsOL23cuvrcKFEV5eRnPbvkcT26T4x+vbPUUxn/ADBzbHOWWnTLkWDK87bDPu8Vejg9LZEb5eq8d9vZl6rxW/q8JVETdb1l0rk2DrYgoogCiAOhyA7lenG/jxtcM2OoselzVl/Bysbcio5tOormOm5WRUGhQAAAQAABBygOdrSuokVvmJUyunj5Mt1ty5PJbt15jFAHVgEEFABRBRRAG/D+5PXp5OD7etx6+txzY8Wf091eDP6q8lejh9vQ8/D7eip19WFAZV5OVnj7d8rPH3HWfGP19DH1BMfUVybHNm3QDK8LrHHq7Ac5eq8kx3Xry+a8uF/WolbeI8UbCbTGPiY546r2PLze2ubdSxiJB0ZUAFEAFQEUl1UKK9WGTZ4cLqvZLuOXUbi1y6cuPUag6crDmldAOiKAAACAAJVcVnqrAiOo5xVMrqVWPLlqO3MZrz55bZg7xzBFEF62k9vXhhNJbjUjydKda93SHSM+lx4etOle7pDrD2Y8PWxy9+WM08eftZdTGvB9R7K8fB9PZWOvrUc14M/qvfXgz+6cpW/D7bZ59WPDXXN6L9WJ5m8u4+djvb6GPyUeXlZY+2vKyx9tfjP6+hj6ipj6iubYluornL1QYXnsd4cnZ48t7b8TeI9OfzXkw+nry+a8mH0kHt/yARlR5Ob29byc3trn6lYRUg6uaoACoAogCiAK9XFXka8eWqz1Fle1zVxu4Vw6jpHIDm07ElV1jKgKAAIACOHVcuXVag7kcRovJS+nj5cv16sr+PBnd125c6gDqwAKLPb28fy8U9vbh8uXTUTLk6mOfZ5+X2vD7TJjWvYAyqZT8eDP6e7L08Of03wzWvB9PXXk4PqPZU6+rHNeHP6r3V4c/qnKVtwt8sezDh9vSl+rGPhjWTUUFePlZY+2vKyx9t/jH6+hj6ipj6iubYlm1AY3hldY8cxaC6OcvmvJh9PXn815MPoiPaAijyc3t63k5vbXP1msIEHZgAQAAEUBFAAl1RCj3cd3GrzcVelx6dI4qOq5cb9bix24dytcpVEG0UAEAKOKhRxrax3HMdN8xmseW6eN6OavM9HLnVEVpkAUJ7e7j+Xhnt7uP5c+m4yzw3V4+PVejWxjVwARUz9PBn9Pocnp8/P6b4ZrXh+nreTh+nrTr6sLGV4pWoyrjHCYpnl1jRjyzcWIz81temXceCY2V7sfko8vIyx9teVnj7b/ABl78fUVJ6iubYKAgoDjP1Xkw+nrz9V5MPpYj2gIo8fN9PY8fN9Nc/UrKY7rq8ddcft7ZGr1jMjwePL+Hjy/j36E91ceDx5fw8de9D3THguFkcPbyyda8db5us2ACoFAGnHdV7Z6fOn5Xvwv/Mc+2+XVcO3FcOm4O44dROVroB1ZUAEKJUvwcCK4tu4X1SF9V25Yrx8t/WTrP25d450AUAF0J7e7j+Xhx9vdx/Ll01GkAYaAWg4y9PDn9Pdl6eHP23yzWnD9PY8nB9PWz19WGgEUSzagOOkdKA8vJhazxwsr3a2dWtTEnqKDKqAACA5z9V5MPp68/VeTD6WI9oCKPHz/AE9jx83trn6lTi9x7Xi4vb2nRA3IMeRINO2Kyyvn3KvTxW1bMNdc3zXje3l+a8TXLNAG0ADQeziv48b08LHSx6XFduK4dOkRY5dRifWq7AdmFEAHNdOaz18WOAI5NNIX9WDtGHnvFKeGPQNbUx5/DDwx6A9Ux5/DE8MekX1THnnDI3xmlE0wARQWFBzf1hlxbr0Boxww61sAAUBQAAAAAAAAAEUBxn815MPp68/VeTD6WI9oCKPJzS7etzcZVlxK8nFK9rmYSOi3SDHkn42SzZCvn3G7enijXpFkkW0kMsdxj4Y9BtNMefww8Meg2eqY8/hh4Y9AaY8/hjvDDq1DTBzk6c1jr41HCxCOUaaKDtGFEFQc5OnOTPXxqOCIsco21Ado5gCgAAAAAAAAsQBUKAAAAoAbQFA2AGzYAbQFEAUTYCZMphqtgCAAAABoAAADQAAAABoFBBUAc105rPXxY4IEcZ9bagO8c1DYqI5ydOcmevjUZrEWOX620WJFdp8cwgRRQAAAAAAAAAAAAAEqpQAAGGed/wAa5XUYYTeVS0XHOt3nymm2F3CUdg5yqjm5M7lkn7al2mhvkXtnPZ1zJv8A9FoTkrfG7jHLGNOP0o0IAKAAAAAAAAAAAAACCmgRzk6cZM9fFjhYixxn1trAg7xzAFBzXSVL8WMiFHD9baxXOLp25+MUIDSKIoAAAAAAAAAAAACVSggIDLkrmXSZXdZ1mwb5fsOOphdxx81J9xXqZ8n47xqZzbaMcEt1TC6td5Y7c/lVpLLGPJNWaTWcS5f1tF214480mWVevCWRR0qLAAAAAAAAAAAAAAAEqpQGeTRlWO1jl1EdYuc+t1pAHeOYACpQqUY1HWTlwv10jvFoyjV14rHQA2iiKAAAAAAAAAAAAAioAzzykaPPnf0HCSzdd9sZHPbFILhlNus3EyxjXcyjH9nSusLt28+N1XXJbNadEqZY6SZWJLf9bSSxLNNczKUuMqXC/wCOJbjdVi7FJ/y3wu44yhxNyjYFioAAAAAAAAAAAAAAFEoJWVaZM3Lut8jvFw0icldAOzCgAIAOMmbXKMnHuNxY1jFpjTinTtUHZhRFABAUQBRDYKIbBRAFENgqU245LqAtunn92n7k0k1AcYyWtphj/Hn62W3bXjyttBeTDGenGBnamGNidT+LDKaqZ3emlm2OWN2nPwaWTUdceSSzX651/FR6GHL9RP8Aqf6mr7pRplfxOJzvbXDHUJFaAKiiGwUTYCiAKJsBQAAABAFKhQZ5OHVrlw6rpFaxnI1b4jPQA6MgAgAKlZVszyjHbXNcOsa5JXKfyt1uRIsd45KAoIqAGwBzbpnu304zv/TTCfgJrKGOf7prpj1vdBvKObdRO4Oxx3i3LUUdOMse0czlh5IDO8eS+PP+tZlMi5aQZePJ3hhcduu8SZygx5MbtZhnZ7c8memuGf4Djx5/08Wf9a3kkTywHHiyOmUd+WHklBlcMl8eTe2OPJAWY9XeOTLPL8ZceYPWOZk5ucijQZ+SOpdg6IzuclPJAaDOZw7g0WM+827gKAAioAAA5rpnlWerkWOBFjg6NMXaYx078xzoA0gACCgI5ro0lmwYUdZTThwv8rrGmNaMJWsrpx0x1HSps26MqIAFCg8mf29XH+R5s5rLbbC7gNEVzctAxyy3lppjj+ML97enH0gwz/Gk/cGfLd/jTD8wgMcJvNrnj+OMPutsvQMuO/q8lc8f3Wmc7AkssXGM/HZ/q8V/bEHPLj6bYYzUZcv+NsPUUccunOE7OuU4lDoy9ZPVXlv0g9N+Xnx9vR/5efH6BtnJplxY7bZfLLiBpndRnh/275J+OeG/gOssdRxx5Ns/mvPx+wdck/Vxx3icjvi+Qc9LIkjTO6lZY7yBzl+ZPVw+nlzmq347/wAg0E2KKVNgKgAlrGu8qzce63zFdYxzGuMTmL06Ad3NQAAAAAAAcZRi9FZZRy7jfNcO8a4VzlytWNxxK7eiXXIAUAAZ547ZTeNelNQGfk3/AIs/XeoukGOWCS2N01AY620vy70A8uMvZtlfx3qGgefHcrrdbahqAy2uE1a01F0DDlhjbGxqKMc/0422oagDDPH9ehAZS3TOY2V6dQ1Ac39jDGWV6k1EHHuONdW6aBlvcXDHTTSgw5JuuuP8jTQDnObjHHcelNQHnylta4fkd6gopAAAAc2umWVY6uLJrm1Acfro7xjRzjHbtzHO0BW0AAAAAAAARLFEs2DCxGmWLP04WY6y6srWVi7xq81Oo1EV3cwAAJYgKJs2CibNgomzYKIAom4tsAE2u4AAAIAogCibNgomzYKJtfwAQ2CibNgobibBRNmwUAAHNqW4JlWS2o4W7XWTB3jHMm20jXMTqqA7OYqAKAAAAAAACECAWMrGqWMdRZWAtiOPx1aY5O2DTHJ056Y65d1588rHpZ54bdo515fLV8qZ4aZOkkZ1t5aeSsVXzE1r5aeWsVMhrXy08tZB5hrXy08tZGjzDWvlp5ay0HmGtfLTy1kh5hrby08tY6NHmGtvLTy1jpTzDWvlp5ay0aPMNa+WnlrLQZF1r5aeWsg8w1r5aeWstGjzE1r5aeWstGjzDWvlp5KyDzDWvlp5axEyGtvLU8ltZybejj40uLGuFrVJNFrna3C1jatrhw66105mCyDTGJJq24sjsHeTHKqAoAAAAAAAAIqAAABo0DmxlY3c2bc+uWpcYLKtmnLl8dGuOTR53eOTpz2xeXWWO3mz49PWWbjtOnOx86wenLieeyx1lYsQRVTAAAVAAAAAAAAFAAAAAAAAAAAD9QHWOO3WOG3pw45Gbcakc4cbaTSubXLrpuQtZWlu0cOutdJMQGkxSTVtwkaEiu3Mxzt0AaRQAAAAAAAAAAAAAAQFQAc2MrG7mxz65alYDq4uXLMdHcyayvO6mTc6ZvLZxlxykydyus6c7Hky42OrH0bNssuOV0nTNjx7GuXFplZY3KzgGxUAAAAAAAAAAAFAAAQRVHUxtbY8aWmMZja3w420xkdud6akczGRS1lcnPrpucu7kytNo422ukmCkjSYkmluJMWkgrrOXO3QBtBUAUAAAAAAAAAAAAABFAQAANAJYyuLZGbzqy4wRrcWdjjebHSVNu5k4CXFzW0ydMJXUyrc7YvLXUrjLiizJ1t0nTFjzZcLK8de9LNtzpmx8/rUe68cri8Ma9pjyDe8Ti8dX0mMx30y/idMv4voxyOumX8OmX8PRjkddMv4swy/h6McDacddzhlPRjzLMLXrnDI7mEjN7XHlnHWuPFHoGL01jiYSO0tZ3Ji9NSNLXFyZ2o53tucurXIMf2tDqRZi1mLc5ZvTmYuw06yYxaAKgBoCgoAAAAAAAAAAAAAAAAAACKgAAFSzaiWDK4uLHosc3Fi8NzpgNLi4052WNbEdTKuUTbFazN1MmCtzqpeY9G128+6syanbPhuMu6919xnzXZqOe0O0X1DHWoaTtDtF9RMdaNRz2TunqLldjPu5uae181rtNxlcnO2b2vhrc3FyrkZ9WtTmRd1ARQdSO5iTlLXExdzF3IrrOWL0ig2yoAAAAAAAAAAAAAAAAAAAAAAAAACKgAKCC6QANACWKJkozuLi4tzTN4jU6rzWDe4yubhGLw16ZDvqnWplXY5F1TTOVUAP6AB/QA0f0EXS9aZTXKupjXcwa81PUZL1a9I6kanCXtlMHcxjsbnMZvVJAFxkAUUTQCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIoCCgIKgBoATSdY6EyGuekOkdLtPMXa46Q6R3tDzDa56Reih5ianWGlFyAAoECAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAACgAgAAAKAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q==";
}