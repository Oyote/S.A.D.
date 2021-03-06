const form = document.querySelector('form')
const submit = form.querySelector('button')
const radioInputContainer = form.querySelector('div')
let turoudisc = ''

const appendSelect = data => {
    let select = document.createElement('select')
    
    data.forEach(element => {
        let option = document.createElement('option')

        option.innerText = element.nome
        select.appendChild(option)
    })
    form.querySelectorAll('div')[1].appendChild(select)
    form.style.height = '50%'

    turoudisc = select.options[select.selectedIndex].innerText

    select.addEventListener('click', () => turoudisc = select.options[select.selectedIndex].innerText)
}

radioInputContainer.addEventListener('click', async ev => {
    if (ev.target.innerText.trim() == 'Professor') {
        let res = await fetch('http://localhost:1234/disciplina')
        let data = await res.json()
        
        form.querySelectorAll('div')[1].innerHTML = ''
        appendSelect(data)
    } else if (ev.target.innerText.trim() == 'Aluno') {
        form.querySelectorAll('div')[1].innerHTML = ''
        let res = await fetch('http://localhost:1234/turma')
        let data = await res.json()

        appendSelect(data)
    }
})

submit.addEventListener('click', async () => {
    let input = form.querySelectorAll('input')
    let radio = form.querySelector('input[name="alunoprof"]:checked')

    if (radio == null) return swal('Ops', 'Selecione o tipo de usuário!', 'error')
    
    let data = {
        nome: input[0].value.trim(),
        usuario: input[1].value.toLowerCase(),
        senha: input[2].value,
        confSenha: input[3].value,
        alunoprof: radio.parentElement.innerText.trim(),
        turoudisc: turoudisc
    }

    if (!data.nome || !data.usuario || !data.senha || !data.confSenha)
        return swal('Ops!', 'Os campos não podem ser vazios!', 'error')
    if (data.usuario.includes(' ') || data.senha.includes(' '))
        return swal('Ops!', 'Os campos "Usuário" e "Senha" não podem conter espaços!', 'error')
    if (data.senha.length < 5)
        return swal('Ops!', 'Senha muito curta!')
    if (data.senha !== data.confSenha)
        return swal('Ops!', 'As senhas não coincidem!', 'error')
        
    let res = await fetch('http://localhost:1234/user/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (res.status == 200) {
        swal('', '', 'success')
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1000)
    } else {
        swal('', '', 'error')
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1000)
    }
})