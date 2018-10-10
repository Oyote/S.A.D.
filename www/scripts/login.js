const form = document.querySelector('form')
const user = form.querySelector('#user')
const pass = form.querySelector('#pass')
const submit = form.querySelector('button')

submit.addEventListener('click', async ev => {
    ev.preventDefault()
    window.location.href = 'principal.html'
    let data = await { "usuario": user, "senha": pass }

    let res = await fetch('http://localhost:1234/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
})