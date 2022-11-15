const nTelefonew = '38980652808';
const nTel = "(51) 98065-2808";
const mensagem = "Olá, gostaria de adquirir o domínio "
const url = window.location.href;

document.getElementById('direito').innerHTML = `<img src="/comprar-dominio.png" alt="${url} comprar a venda">`

document.getElementById('btnT').innerHTML = `<a href='https://api.whatsapp.com/send?phone=${nTelefonew}&text=${mensagem}${url} ' target='_blank'><button><i class="bi bi-card-checklist"></i>Entre em Contato</button></a>
<a href='https://api.whatsapp.com/send?phone=${nTelefonew}&text=${mensagem}${url} ' target='_blank'>
    <strong>
        <p>(51) 98065-2808</p> 
    </strong>
</a>        `;

document.getElementById('foter').innerHTML = `<p>Este domínio está disponível para <strong>Venda</strong> ou <strong>Locação</strong>. Interessados tratar pelo WhatsApp: <a href='https://api.whatsapp.com/send?phone=${nTelefonew}&text=${mensagem}${url}'<strong> <p>${nTel}</p></strong></a></p>`;




