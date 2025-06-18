const url = window.location.hash.split('#')

nomeProduto.value = url[1]
pc.value = url[2]
df.value = url[3]
dv.value = url[4]
ml.value = url[5]
document.querySelector('#resMarkup').textContent = url[6]

document.querySelector('form').submit()


function fecha() {
    window.close()
}

setTimeout('fecha()', 1000)

console.log(url)