const express = require('express')
const router = express.Router()
const fs = require('fs')
const db = require('../dbconnect/mysql')

// router.use(express.static(__dirname + '/../uploads'))



router.get('/file/:a', (req, res) => {
    let path = './uploads/' + req.params.a
    res.download(path, req.params.a)
})

router.get('/:cont', (req, res) => {
    let conteudo = req.params.cont
    let query = `SELECT c.descricao, a.titulo, a.nome FROM arquivo a
    INNER JOIN conteudo c
    ON a.idconteudo = c.idconteudo
    WHERE c.nome = '${conteudo}'`
    
    db.query(query, (err, result) => {
        console.log(result)
        if (err) {
            throw err
        } else {
            res.status(200).send(result)
        }
    })
})

module.exports = router