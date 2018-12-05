const header = document.querySelector('#header')
const central = document.querySelector('#central')

const loadContent = data => {
    console.log(data[0])
    data.forEach(element => {
        let div = document.createElement('div')
        let label = document.createElement('label')

        div.className = 'content'
        label.innerText = element.nome

        central.appendChild(div)
        div.appendChild(label)

        div.addEventListener('click', async ev => {
            while(central.firstElementChild) {
                central.removeChild(central.firstElementChild) 
            }
            header.innerHTML = ''
            let div = document.createElement('div')
            let a = document.createElement('a')
            let i = document.createElement('i')
            let hspan = document.createElement('span')

            a.href = 'principal.html'
            i.setAttribute('class', 'fas fa-chevron-left fa-lg')
            hspan.innerText = 'Voltar'
            div.className = 'return'
            header.appendChild(div)
            div.appendChild(a)
            div.appendChild(hspan)
            a.appendChild(i)
            console.log(ev.target)

            let res = await fetch('http://localhost:1234/download/' + ev.target.innerText)

            if (res.status === 200) {
                let data = await res.json()
                console.log(data)
                let loadedContent = document.createElement('div')
                let loadedContentHeader = document.createElement('div')
                let loadedContentTitle = document.createElement('span')
                let loadedContentDesc = document.createElement('span')
                
                loadedContent.className = 'loadedContent'
                central.appendChild(loadedContent)
                loadedContentHeader.className = 'loadedContentHeader'
                loadedContent.appendChild(loadedContentHeader)
                loadedContentTitle.innerText = ev.target.innerText
                loadedContentTitle.className = 'loadedContentTitle'
                loadedContentHeader.appendChild(loadedContentTitle)
                loadedContentDesc.innerText = data[0].descricao
                loadedContentDesc.className = 'loadedContentDesc'
                loadedContentHeader.appendChild(loadedContentDesc)
                
                data.forEach(element => {
                    let div = document.createElement('div')
                    let label = document.createElement('label')

                    label.innerText = element.titulo
                    div.className = 'content'
                    div.dataset.arqname = element.nome
                    loadedContent.appendChild(div)
                    div.appendChild(label)

                    div.addEventListener('click', async ev => {
                        window.open('http://localhost:1234/download/file/' + div.dataset.arqname)
                    })
                })
            }
        })
    })
}

const loadSubject = async area => {
    let res = await fetch('http://localhost:1234/disciplina/' + area + '/'+localStorage.getItem('turma'))
    
    central.querySelectorAll('*').forEach(element => element.remove(element))
    if (res.status === 404) {
        let span = document.createElement('span')
        let i = document.createElement('i')

        span.className = 'nop'
        span.innerText = 'Nenhum resultado foi encontrado'
        i.setAttribute('class', 'fas fa-robot fa-2x')
        span.appendChild(i)
        central.appendChild(span)
        return;
    }

    let data = await res.json()
    
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
            let res = await fetch('http://localhost:1234/disciplina/conteudo/' + title + '/' + localStorage.getItem('turma'))

            if(res.status == 200) {
                let data = await res.json()
                loadContent(data)
            }
        })
    })
}

loadSubject('medio')

//gambiarra
if (!localStorage.getItem('disciplina')) {
    header.firstElementChild.style.background = '#515151'
} else {
    window.location.href = 'listaExercicio.html'
}
//Botões "Ensino Médio" e "Curso Técnico"
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
