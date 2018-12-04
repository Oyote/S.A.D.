(async () => {
    const container = document.querySelector('div#upload')
    const label = container.querySelector('label')
    const fileInput = container.querySelector('#upload form label input[type=file]')
    const titledesc = container.querySelectorAll('#upload input[type=text]')
    const select = container.querySelector('select')
    const button = container.querySelector('button')
    let conteudo = ''

    let res = await fetch('http://localhost:1234/disciplina/conteudo/' + localStorage.getItem('disciplina'))
    let data = await res.json()

    data.forEach(element => {
        let option = document.createElement('option')
        option.innerText = element.nome
        select.appendChild(option)
    })

    select.addEventListener('click', async ev => {
        let selected = ev.target.options[ev.target.selectedIndex]
        if(selected.value != 0) {
            conteudo = selected.innerText
        }
    })

    fileInput.onchange = () => label.innerText = fileInput.files[0].name

    button.addEventListener('click', async () => {
        if (fileInput.files.length != 0 && conteudo != '' && !titledesc[0].value && !titledesc[1].value) {
            let formData = new FormData()
            formData.append('titulo', titledesc[0].value)
            formData.append('descricao', titledesc[1].value)
            formData.append('arq', fileInput.files[0])
            
            let res = await fetch(`http://localhost:1234/up/${localStorage.getItem('disciplina')}/asdf`, {
                method: 'POST',
                body: formData
            })
            if (res.status === 200){
                console.log(res.body)
            }
        } else {
            swal({
                title: 'Ops!',
                text: 'Os campos não podem estar vazios!',
                icon: "error",
                button: false
            })
        }
    })
})()