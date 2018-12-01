(async () => {
    const lista = document.querySelector('#central div.lista')
    const addQst = lista.querySelector('button')
    const questao = lista.querySelector('div.questao')
    const tipo = questao.querySelector('div.tipo')
    const abc = 'abcdefghijklmnopqrstuvwxyz'

    tipo.querySelector('input[type="radio"]').checked = true
    
    addQst.addEventListener('click', ev => {
        let clone = questao.cloneNode(true)
        let alternativas = clone.querySelector('div.alternativas')

        lista.insertBefore(clone, addQst)
        clone.querySelectorAll('textarea').forEach(element => element.value = '')

        while (alternativas.childElementCount !== 1) {
            alternativas.lastElementChild.remove()    
        }
    })
})()