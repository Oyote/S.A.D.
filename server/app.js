const express = require('express')
const bodyParser = require('body-parser')

const db = require('./dbconnect/mysql')
const auth = require('./routes/auth')
const upload = require('./routes/upload')
const download = require('./routes/download')

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

app.get('/disciplina/:q*?', (req, res) => {
    let query

    if (!req.params.q) {
        query = `SELECT * FROM disciplina`
    } else if (req.params.q === 'medio' || req.params.q === 'tecnico') {
        query = `SELECT * FROM disciplina WHERE tipo = '${req.params.q}'`
    } else {
        query = `
            SELECT d.nome, c.nome, c.descricao FROM conteudo AS c 
            INNER JOIN disciplina AS d
                ON c.iddisciplina = d.iddisciplina 
            WHERE d.nome = '${req.params.q}'
            ORDER BY d.nome ASC
            `
    }

    db.query(query, (err, result) => {
        if (err || result == '') {
            res.status(404).send('Not Found')
        } else {
            res.status(200).send(result)
        }
    })
})

module.exports = app