const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const db = require('./dbconnect/mysql')
const auth = require('./routes/auth')
const upload = require('./routes/upload')
const download = require('./routes/download')
const disciplina = require('./routes/disciplina')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

app.use('/auth', auth)
app.use('/up', upload)
app.use('/download', download)
app.use('/disciplina', disciplina)

module.exports = app