const express = require('express')
const router = express.Router()

const db = require('../dbconnect/mysql')

router.get('/:q*?', (req, res) => {
    let query
    if (!req.params.q) {
        query = `SELECT nome, tipo FROM disciplina`
    } else if (req.params.q === 'medio' || req.params.q === 'tecnico') {
        query = `SELECT nome, tipo FROM disciplina WHERE tipo = '${req.params.q}'`
    } else {
        query = `
            SELECT c.nome FROM conteudo c
            INNER JOIN disciplina d
            ON c.iddisciplina = d.iddisciplina
            WHERE d.nome = '${req.params.q}'
            GROUP BY c.nome
        `
    }

    db.query(query, (err, result) => {
        if (err || result == '') {
            res.status(404).send()
        } else {
            res.status(200).send(result)
        }
    })
})

module.exports = router