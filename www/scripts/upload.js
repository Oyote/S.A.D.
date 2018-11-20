(async () => {
    const container = document.querySelector('div#fileUpload')
    const form = container.querySelector('form')
    const label = container.querySelector('label')
    const fileInput = container.querySelector('input[type=file]')
    const fileTitleInput = container.querySelector('input[type=text]')
    const select = container.querySelectorAll('select')
    const button = container.querySelector('button')
    let disciplina = ''
    let conteudo = ''

    let res = await fetch('http://192.168.49.164:1234/disciplina')
    let data = await res.json()

    data.forEach((element, index) => {
        let option = document.createElement('option')
        option.value = index + 1
        option.innerText = element.nome
        document.querySelectorAll('select')[0].appendChild(option)
    })


    select[0].addEventListener('click', async ev => {
        let selected = ev.target.options[ev.target.selectedIndex]
        console.log(selected)
        
        if (selected.value != 0) {
            select[1].setAttribute = 'disabled'
            select[1].innerHTML = ''
            disciplina = selected.innerText
            let res = await fetch('http://192.168.49.164:1234/disciplina/' + disciplina)
            let data = await res.json()

            data.forEach((element, index) => {
                let option = document.createElement('option')
                option.value = index + 1
                option.innerText = element.nome
                select[1].appendChild(option)
            })
            select[1].remove(select[1].firstChild)
            select[1].removeAttribute('disabled')
        }
    })

    select[1].addEventListener('click', async ev => {
        let selected = ev.target.options[ev.target.selectedIndex]
            console.log(selected)
        if(selected.value != 0) {
            conteudo = selected.innerText
        }
    })

    fileInput.onchange = () => label.innerText = fileInput.files[0].name

    button.addEventListener('click', async () => {
         if (fileInput.files.length != 0 && disciplina != '' && conteudo != '') {
            console.log(disciplina)
            console.log(conteudo)
            console.log(form)
            
            let formData = new FormData()
            formData.append('titulo', fileTitleInput.value)
            formData.append('arq', fileInput.files[0])
            
            let res = fetch(`http://192.168.49.164:1234/up/${disciplina}/asdf`, {
                method: 'POST',
                body: formData
            })
            if (res.status === 200){
                alert('foi')
            }
        }
    })
})()