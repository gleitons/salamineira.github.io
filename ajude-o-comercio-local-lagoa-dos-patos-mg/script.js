const btnBuscar = document.querySelectorAll('button')[0]


btnBuscar.addEventListener('click', async () => {
    const cnpjInteiro =  document.querySelector('input').value
    console.log(cnpjInteiro.length)
    if(cnpjInteiro.toString().length > 14) {
        alert('ATENÇÃO - SOMENTE NÚMEROS')
    } else {
        var cnpj = cnpjInteiro
    }
    if(cnpj == '54738535000193') {
        alert('ASSOCIAÇÃO AMIGOS VOLUNTÁRIOS DE LAGOA DOS PATOS MG - CNPJ: 54.738.535/0001-93 - Insira outro CNPJ')
    }
    
    
    const rep = await fetch(`https://minhareceita.org/${cnpj}`)
    const data = await rep.json()
  
    if(rep.status != 200 ) {
        alert('CONTAMOS COM SUA ASSINATURA - TENTE O CNPJ NOVAMENTE')
    } 
    const tds = document.querySelectorAll('table tr td')
    const pp = document.querySelectorAll('p')
    console.log(pp)
    
    const inputs = document.querySelectorAll('input')
    const c = data.cnpj.split('')
    inputs[1].value = `${c[0]}${c[1]}.${c[2]}${c[3]}${c[4]}.${c[5]}${c[6]}${c[7]}/${c[8]}${c[9]}${c[10]}${c[11]}-${c[12]}${c[13]}`
    inputs[2].value = data.razao_social
    inputs[3].value  = `${data.logradouro}, Nº ${data.numero}, Bairro ${data.bairro}`
    inputs[4].value  = data.municipio
    inputs[5].value  = data.uf
    inputs[6].value  = data.cep
    inputs[7].value  = data.razao_social.replace(/[0-9.]/g, '')
    const abrir = document.querySelector('form')

    tds[2].textContent = data.razao_social
    tds[4].textContent = `${data.logradouro}, Nº ${data.numero}, Bairro ${data.bairro}`
    tds[6].textContent = `${c[0]}${c[1]}.${c[2]}${c[3]}${c[4]}.${c[5]}${c[6]}${c[7]}/${c[8]}${c[9]}${c[10]}${c[11]}-${c[12]}${c[13]}`
    tds[8].textContent = data.municipio
    tds[10].textContent = data.uf
    tds[12].textContent = data.cep
    tds[14].textContent = data.razao_social.replace(/[0-9.]/g, '')

    pp[14].textContent = data.razao_social.replace(/[0-9.]/g, '')

    abrir.style.display = 'block'

    console.log(inputs)
})


async function compressImage(blobImg, percent) {
    let bitmap = await createImageBitmap(blobImg);
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.drawImage(bitmap, 0, 0);
    let dataUrl = canvas.toDataURL("image/jpeg", percent/100);
    console.log(dataUrl)
    return dataUrl;
  }
  
  inputImg.addEventListener('change', async(e) => {
    let img = e.target.files[0];
    console.log('File Name: ', img.name)
    console.log('Original Size: ', img.size.toLocaleString())
    
    let imgCompressed = await compressImage(img, 65) // set to 75%

    document.getElementById('imagePreview').value = imgCompressed;
    document.getElementById('imagePreviewDiv').innerHTML = '<img src="' + imgCompressed + '"/>';
    console.log('Imagem convertida para Base64:', imgCompressed);

    let compSize = atob(imgCompressed.split(",")[1]).length;
    console.log('Compressed Size: ', compSize.toLocaleString())
    //console.log(imgCompressed)
  })

document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        const base64String = e.target.result;
        document.getElementById('imagePreview').value = base64String;
        document.getElementById('imagePreviewDiv').innerHTML = '<img src="' + base64String + '"/>';
        console.log('Imagem convertida para Base64:', base64String);
      };

      reader.readAsDataURL(file);
    }
  });
  document.getElementById('fileInput2').addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        const base64String = e.target.result;
        document.getElementById('imagePreview2').value = base64String;
        document.getElementById('imagePreviewDiv2').innerHTML = '<img src="' + base64String + '"/>';
        console.log('Imagem convertida para Base64:', base64String);
      };

      reader.readAsDataURL(file);
    }
  });