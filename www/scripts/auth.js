//Improvisadasso

if (!localStorage.getItem('usuario')) {
    window.location.href = 'index.html'
}

document.querySelector('body main div#menu').lastElementChild.addEventListener('click', ev => {
    localStorage.removeItem('usuario')
    window.location.href = 'index.html'
})