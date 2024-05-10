const displayer = document.querySelector('.content')

const div = document.createElement('div')
const link = document.createElement('a')
div.textContent = ('olá mundo')
link.href = 'https://salamineira.com'
link.textContent = "Visite a sala mineira"
div.appendChild(link)
console.log(displayer)
displayer.appendChild(div)