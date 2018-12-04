(async () => {
    const lista = document.querySelector('#central div.lista')
    const addQst = lista.querySelector('button')
    const questao = lista.querySelector('div.questao')
    const upload = document.querySelector('#upload')
    const select = upload.querySelector('select')
    let conteudo = ''

    //Set first radio input to true | Ln11
    questao.querySelector('div.tipo form input[type="radio"]').checked = true
    
    //Set send options area | Ln14 - Ln50
    let res = await fetch('http://localhost:1234/disciplina/conteudo/' + localStorage.getItem('disciplina'))
    let data = await res.json()

    data.forEach(element => {
        let option = document.createElement('option')
        option.innerText = element.nome
        select.appendChild(option)
    })

    select.addEventListener('click', async ev => {
        let selected = ev.target.options[ev.target.selectedIndex]
        console.log(selected)
        if(selected.value != 0) {
            conteudo = selected.innerText
            console.log(conteudo)
        }
    })

    //set list object when click to send it as POST body | Ln53 - Ln109
    upload.querySelector('button').addEventListener('click', async ev => {
        let questao = document.querySelectorAll('div.lista div.questao')
        let dt = new Date()
        let lista = {
            titulo: upload.querySelector('input').value,
            descricao: upload.querySelectorAll('input')[1].value,
            data: {
                dia: `${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}`,
                horas: `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
            },
            disciplina: localStorage.getItem('disciplina'),
            conteudo: conteudo,
            questoes: []
        }

            questao.forEach(element => {
            let alternativas = []
            let tipo = ''
            let respostas = []
            
            element.querySelectorAll('input').forEach(element => {
                if(element.checked) {
                    tipo = element.parentElement.innerText.trim()
                }
            })

            element.querySelectorAll('div.alternativa').forEach(element => {
                let span = element.querySelector('span')

                alternativas.push({
                    num: span.innerText.replace(/\(|\)/g,''),
                    texto: element.querySelector('textarea').value.trim(),
                    certa: element.dataset.resp
                })
                if(element.dataset.resp == 'true'){
                    respostas.push(span.innerText.replace(/\(|\)/g, ''))
                }
            })

            lista.questoes.push({
                tipo: tipo,
                pergunta: element.querySelector('div.pergunta textarea').value.trim(),
                alternativas: alternativas,
                respostas: respostas
            })
        })
        //Send list to the server
        await fetch('http://localhost:1234/up/lista/artes/', {
            method: 'POST',
            body: JSON.stringify(lista),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    })

    //Change question type (1: Objetiva, 2: Somatória, 3: Verdadeiro ou Falso) | Ln110 - Ln195
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

    //Calls changeQuestionType() when click on the form area | Ln198 - Ln200
    questao.querySelector('div.tipo form').addEventListener('click', ev => {
        changeQuestionType(ev.target, questao)
    })

    //Add new question to the list | Ln203 - Ln215
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