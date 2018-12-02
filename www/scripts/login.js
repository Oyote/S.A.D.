const form = document.querySelector('form')
const submit = form.querySelector('button')


submit.addEventListener('click', async () => {
    let data = {
        login: form.querySelectorAll('input')[0].value,
        senha: form.querySelectorAll('input')[1].value
    }

    if (data.login == '' || data.login == '') {
        return swal('Ops!','Insira o usuário e senha!', 'error')
    }

    console.log(data)
    let res = await fetch('http://localhost:1234/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    
    if (res.status == 200) {
        swal({
            icon: "success",
            button: false
        })
        setTimeout(() => {
            window.location.href = 'principal.html'
        }, 1000)
        localStorage.setItem('usuario', data.login)
    } else {
        swal({
            title: 'Ops!',
            text: 'Usuário ou senha incorretos!',
            icon: "error",
            button: false
        })
    }
})