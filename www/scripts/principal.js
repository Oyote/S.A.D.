const header = document.querySelector('#header')
const central = document.querySelector('#central')

const loadContent = data => {
    console.log(data)
    data.forEach(element => {
        let div = document.createElement('div')
        let label = document.createElement('label')
        let display = document.createElement('div')
        let arquivos = document.createElement('span')
        let quantidade = document.createElement('span')

        div.className = 'content'
        label.innerText = element.nome
        display.className = 'display'
        arquivos.innerText = 'Arquivos: '
        quantidade.innerText = element.quantidade

        central.appendChild(div)
        div.appendChild(label)
        div.appendChild(display)
        display.appendChild(arquivos)
        display.appendChild(quantidade)

        div.addEventListener('click', ev => {
            while(central.firstElementChild) {
                central.removeChild(central.firstElementChild) 
            }                
        })
    })
}

const loadSubject = async area => {
    let res = await fetch('http://localhost:1234/disciplina/' + area)
    let data = await res.json()
    
    central.querySelectorAll('*').forEach(element => element.remove(element))
    
    data.forEach(element => {
        let container = document.createElement('div')
        let label = document.createElement('label')
        let img = document.createElement('img')

        container.className = 'disciplina'
        img.src = 'images/a.jpg'
        label.innerText = element.nome

        central.appendChild(container)
        container.appendChild(img)
        container.appendChild(label)
    })    

    central.querySelectorAll('.disciplina').forEach(element => {
        element.addEventListener('click', async () => {
            while(central.firstElementChild) {
                central.removeChild(central.firstElementChild) 
            }
            let title = element.querySelector('label').innerText
            let res = await fetch('http://localhost:1234/disciplina/' + title)
            if(res.status === 404) {
                console.log('Não')
            } else {
                let data = await res.json()
                loadContent(data)
            }
        })
    })

}

loadSubject('medio')

//Botões "Ensino Médio" e "Curso Técnico"
header.firstElementChild.style.background = '#515151'
    header.addEventListener('click', ev => {
        let btns = header.querySelectorAll('button')
        let currentEl = ev.target

        header.firstElementChild.style.background = '#2d2d2d'

        btns.forEach(element => {
            if(element === currentEl)
                element.style.background = '#515151'
            else
                element.style.background = '#2d2d2d'
        })
    ev.target.innerText === 'Ensino Médio' ? loadSubject('medio') : loadSubject('tecnico')
})

