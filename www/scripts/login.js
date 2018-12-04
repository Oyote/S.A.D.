const form = document.querySelector('form')
const submit = form.querySelector('button')

submit.addEventListener('click', async () => {
    let loginData = {
        login: form.querySelectorAll('input')[0].value,
        senha: form.querySelectorAll('input')[1].value
    }

    if (loginData.login == '' || loginData.login == '') {
        return swal('Ops!','Insira o usuário e senha!', 'error')
    }

    console.log(loginData)
    let res = await fetch('http://localhost:1234/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    
    if (res.status == 200) {
        let data = await res.json()
        localStorage.setItem('usuario', loginData.login)

        if (data[0]['turma']) {
            localStorage.setItem('turma', data[0].turma)
        } else if (data[0]['disciplina']){
            localStorage.setItem('disciplina', data[0].disciplina)
        }

        swal({
            icon: "success",
            button: false
        })
        setTimeout(() => {
            window.location.href = 'principal.html'
        }, 1000)
    } else {
        swal({
            title: 'Ops!',
            text: 'Usuário ou senha incorretos!',
            icon: "error",
            button: false
        })
    }
})