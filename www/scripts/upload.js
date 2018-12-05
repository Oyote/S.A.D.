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

    button.addEventListener('click', async ev => {
        if (fileInput.files.length != 0 && conteudo != '') {
            let formData = new FormData()
            formData.append('titulo', titledesc[0].value)
            formData.append('descricao', titledesc[1].value)
            formData.append('arq', fileInput.files[0])
            
            let res = await fetch(`http://localhost:1234/up/${localStorage.getItem('disciplina')}/${conteudo}`, {
                method: 'POST',
                body: formData
            })
            if (res.status == 200) {
                swal({
                    title: '',
                    text: '',
                    icon: "success",
                    button: false
                })
            }
        }
    })
})()