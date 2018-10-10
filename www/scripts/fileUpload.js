const form = document.querySelector('form')

form.addEventListener('submit', async ev => {
    ev.preventDefault()
    const formData = new FormData(form)

    let res = await fetch('http://192.168.49.129:1234/up', {
        method: 'POST',
        body: formData
    })
})
