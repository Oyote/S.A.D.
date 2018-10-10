const form = document.querySelector('form')
const field = form.querySelectorAll('input')
const submit = form.querySelector('button')

submit.addEventListener('click', async ev => {
    ev.preventDefault()
    field.forEach(element => element.value = element.value.trim())
    
    // if (field[2].value !== field[3].value) console.log('Senhas diferentes bro')
    if (field[1].value.indexOf(' ') >= 0 || field[2].value.indexOf(' ') >= 0) console.log('Usuario e senha não podem ter espaço')

    //Eu não usei formData por que tava dando ruim, mas pretendo mudar
    let data = await {
        "nome": field[0].value,
        "usuario": field[1].value,
        "senha": field[2].value
    }
    document.querySelector()

    let res = await fetch('http://localhost:1234/siginup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })

    window.location.href = 'index.html'
})