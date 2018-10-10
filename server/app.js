const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')

const db = require('./dbconnect/mysql')
const auth = require('./routes/auth')

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename:(req, file, cb) => {
        let name = file.originalname
        for (let i = 0; i < name.length; i++) {
            if(name[i] === '.') name = name.substr(i, name.length)
        }
        cb(null, Date.now() + name)
    }
})
const upload = multer({dest: 'uploads/', storage: storageConfig})

const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

app.use('/auth', auth)

app.all('/testing', (req, res) => {
    fs.readFile('./public/index.html', null, (err, data) => {
        if (err) {
            res.status(404).write('File no found')
            console.log('b')
        } else {
            res.status(200).write(data)
        }
        res.end()
    })
})

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

app.post('/up', upload.single('arq'), (req, res) => {
    res.status(200).send('meu deus')
})

module.exports = app