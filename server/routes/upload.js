const express = require('express')
const router = express.Router()
const multer = require('multer')

const db = require('../dbconnect/mysql')

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

router.post('/:disc/:cont', upload.single('arq'), (req, res, next) => {
    // let conteudo = req.params.cont

    let query = `INSERT INTO arquivo (titulo, nome, tipo, idconteudo) 
        VALUES('${req.body.titulo}', '${req.file.filename}', '${req.file.mimetype}',
        (SELECT idconteudo FROM conteudo WHERE nome = '${req.params.cont}'))
        `
    
    db.query(query, (err, result) => {
        if (err || result == '') {
            console.log(err)
            res.status(404).send('Not Found')
        } else {
            console.log('File data inserted')
            res.status(200).send(result)
        }
    })
})

module.exports = router