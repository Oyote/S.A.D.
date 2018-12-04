//Improvisadasso
(() => {
    const menu = document.querySelector('body main div#menu')
    if (!localStorage.getItem('usuario')) {
        window.location.href = 'index.html'
    }
    
    menu.lastElementChild.addEventListener('click', ev => {
        localStorage.clear()
        window.location.href = 'index.html'
    })

    if (!localStorage.getItem('disciplina')) {
        menu.querySelectorAll('a')[1].remove()
    } else {
        let clone = menu.querySelector('a').cloneNode(true)

        clone.href = 'listaExercicio.html'
        clone.querySelector('label').innerText = 'Criar lista'
        clone.querySelector('i').setAttribute('class', 'fas fa-plus-circle fa-2x')
        menu.insertBefore(clone, menu.querySelectorAll('a')[1])

        menu.querySelector('a').remove()
        document.querySelector('#header').innerHTML = ''
    }
})()