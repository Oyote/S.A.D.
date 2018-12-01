(async () => {
    const lista = document.querySelector('#central div.lista')
    const addQst = lista.querySelector('button')
    const questao = lista.querySelector('div.questao')
    
    questao.querySelector('div.tipo form input[type="radio"]').checked = true
    
    // const addEv = container => {
    //     container.querySelectorAll('div.alternativas div.alternativa').forEach(element => 
    //         element.lastElementChild.addEventListener('click', ev => {
    //         container.querySelectorAll('div.alternativas div.alternativa').forEach(element => {
    //             if (element != ev.target.parentElement) {
    //                 element.lastElementChild.src = 'images/no.svg'
    //                 element.dataset.resp = false
    //             } else {
    //                 element.lastElementChild.src = 'images/ok.svg'
    //                 element.dataset.resp = true
    //             }
    //         })
    //     }))
    // }
    
    const changeQuestionType = (input, container) => {
        let div = document.createElement('div')
        let span = document.createElement('span')
        let textarea = document.createElement('textarea')
        let icon = document.createElement('img')

        div.className = 'alternativa'
        div.dataset.resp = false
        icon.src = './images/no.svg'
        div.appendChild(span)
        div.appendChild(textarea)
        div.appendChild(icon)

        switch (input.value) {
            case '1':
                let abc = 'abcdefghijklmnopqrstuvwxyz'
                container.querySelector('div.alternativas').innerHTML = ''

                for (let i = 0; i < 5; i++) {
                    span.innerText = abc[i] + ')'

                    let clone = div.cloneNode(true)

                    container.querySelector('div.alternativas').appendChild(clone)
                    clone.lastElementChild.addEventListener('click', ev => {
                        container.querySelectorAll('div.alternativas div.alternativa').forEach(element => {
                            if (element != ev.target.parentElement) {    
                                element.lastElementChild.src = 'images/no.svg'
                                element.dataset.resp = false
                            } else {
                                element.lastElementChild.src = 'images/ok.svg'
                                element.dataset.resp = true
                            }
                        })
                    })
                }
                break;

            case '2':
                container.querySelector('div.alternativas').innerHTML = ''

                for (let i = 0; i < 5; i++) {
                    span.innerText = Math.pow(2, i) + ')'

                    let clone = div.cloneNode(true)

                    container.querySelector('div.alternativas').appendChild(clone)
                    clone.lastElementChild.addEventListener('click', ev => {
                        if (ev.target.src.includes('images/ok.svg')) {
                            console.log(ev.target.parentElement)
                            ev.target.src = 'images/no.svg'
                            ev.target.parentElement.dataset.resp = false
                        } else {
                            ev.target.src = 'images/ok.svg'
                            ev.target.parentElement.dataset.resp = true
                        }
                    })
                }
                break;

            case '3':
                let roman = ['I', 'II', 'III', 'IV', 'V']
                container.querySelector('div.alternativas').innerHTML = ''

                for (let i = 0; i < 5; i++) {
                    span.innerText = roman[i] + ')'

                    let clone = div.cloneNode(true)

                    container.querySelector('div.alternativas').appendChild(clone)
                    clone.lastElementChild.addEventListener('click', ev => {
                        if (ev.target.src.includes('images/ok.svg')) {
                            ev.target.src = 'images/no.svg'
                            ev.target.parentElement.dataset.resp = false
                        } else {
                            ev.target.src = 'images/ok.svg'
                            ev.target.parentElement.dataset.resp = true
                        }
                    })
                }

                break;
            default:
                break;
        }
    }

    questao.querySelector('div.tipo form').addEventListener('click', ev => {
        changeQuestionType(ev.target, questao)
    })

    addQst.addEventListener('click', ev => {
        let clone = questao.cloneNode(true)

        lista.insertBefore(clone, addQst)
        clone.querySelector('input').checked = true
        clone.querySelectorAll('textarea').forEach(element => element.value = '')
        clone.querySelectorAll('img').forEach(element => element.src = 'images/no.svg')
        clone.querySelectorAll('div.alternativas div.alternativa').forEach(element => element.dataset.resp = 'false')
        clone.querySelector('div.tipo form').addEventListener('click', ev => {
            changeQuestionType(ev.target, clone)
        })
        changeQuestionType(clone.querySelector('div.tipo form input'), clone)
    })
})()