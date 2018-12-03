const express = require('express')
const app = express()

const user = require('./routes/user')
const turma = require('./routes/turma')
const upload = require('./routes/upload')
const download = require('./routes/download')
const disciplina = require('./routes/disciplina')


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

app.use('/user', user)
app.use('/turma', turma)
app.use('/up', upload)
app.use('/download', download)
app.use('/disciplina', disciplina)

module.exports = app