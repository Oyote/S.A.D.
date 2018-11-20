const header = document.querySelector('#header')
const central = document.querySelector('#central')

const loadContent = data => {
    data.forEach(element => {
        let div = document.createElement('div')

        div.innerText = element.nome
        div.className = 'content'
        div.classList.add('h-3')
        central.appendChild(div)

        div.addEventListener('click', ev => {
            while(central.firstElementChild) {
                central.removeChild(central.firstElementChild) 
            }
                        
        })
    })
}

const loadSubject = async area => {
    
    let res = await fetch('http://localhost:1234/disciplina/' + area, {
        method: 'GET'
    })
    
    let data = await res.json()
    
    central.querySelectorAll('*').forEach(element => element.remove(element))
    
    data.forEach(element => {
        let container = document.createElement('div')
        let label = document.createElement('label')
        let display = document.createElement('div')
        let doc = document.createElement('span')
        let exe = document.createElement('span')
        let out = document.createElement('span')
        
        container.className = 'content'
        central.appendChild(container)
        
        label.innerText = element.nome
        container.appendChild(label)
        
        display.className = 'display'
        container.appendChild(display)
        
        doc.innerText = element.documento + ' Documentos'
        exe.innerText = element.exercicio + ' Exercícios'
        out.innerText = element.outro + ' Outros'
        
        display.appendChild(doc)
        display.appendChild(exe)
        display.appendChild(out)
    })    

    central.querySelectorAll('.content').forEach(element => {
        element.addEventListener('click', async () => {
            while(central.firstElementChild) {
                central.removeChild(central.firstElementChild) 
            }
            let title = element.querySelector('label').innerText
            let res = await fetch('http://localhost:1234/disciplina/' + title)
            let data = await res.json()
            loadContent(data)
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

