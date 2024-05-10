const displayer = document.querySelector('.content')
const menuSideBar = document.querySelector('#menu-sidebar')
menuSideBar.innerHTML += `<li id="menu-item-222" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-66"><a href="https://salamineira.com">SALA MINEIRA DO EMPREENDEDOR</a></li>`

const div = document.createElement('div')
const link = document.createElement('a')
div.textContent = ('olá mundo')
link.href = 'https://salamineira.com'
link.textContent = "Visite a sala mineira"
div.appendChild(link)
displayer.appendChild(div)