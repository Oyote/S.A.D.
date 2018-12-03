//Improvisadasso
(() => {
    if (!localStorage.getItem('usuario')) {
        window.location.href = 'index.html'
    }
    
    document.querySelector('body main div#menu').lastElementChild.addEventListener('click', ev => {
        localStorage.clear()
        window.location.href = 'index.html'
    })
})()