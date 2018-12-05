const express = require('express')
const router = express.Router()
const db = require('../dbconnect/mysql')
const multer = require('multer')
const bodyParser = require('body-parser')
const fs = require('fs')

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        let name = file.originalname
        for (let i = 0; i < name.length; i++) {
            if (name[i] === '.') name = name.substr(i, name.length)
        }
        cb(null, 'file' + Date.now() + name)
    }
})

let upload = multer({ storage: storageConfig })

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/lista/:disc', (req, res) => {
    let query = ``
    console.log(req.body)
    fs.writeFile(`uploads/exercise-${Date.now()}.json`, JSON.stringify(req.body), err => {
        if (err) throw err;
    })
    res.status(200).send('opa')
})

router.post('/:disc/:cont', upload.single('arq'), (req, res) => {
    let query = `INSERT INTO arquivo (titulo, nome, descricao, mimetype, idconteudo) 
        VALUES('${req.body.titulo}', '${req.file.filename}', '${req.body.descricao}', '${req.file.mimetype}',
        (SELECT idconteudo FROM conteudo WHERE nome = '${req.params.cont}'))
        `
    
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
            res.status(404).send()
        } else {
            res.status(200).send()
        }
    })
})


module.exports = router