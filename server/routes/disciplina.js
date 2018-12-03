const express = require('express')
const router = express.Router()

const db = require('../dbconnect/mysql')

//q: medio ou tecnico | t: turma
router.get('/:q?/:t?', (req, res) => {
    let query
    if (!req.params.q && !req.params.t) {
        query = `SELECT nome, tipo FROM disciplina ORDER BY nome`
    } else if (req.params.q === 'medio' || req.params.q === 'tecnico' && !req.params.t) {
        query = `SELECT nome, tipo FROM disciplina WHERE tipo = '${req.params.q}' ORDER BY nome`
    } else if(req.params.q && req.params.t){
        query = `SELECT t.nome, d.nome FROM turma t 
            INNER JOIN disciplina_turma dt ON t.idturma = dt.idturma 
            INNER JOIN disciplina d ON dt.iddisciplina = d.iddisciplina
            WHERE t.nome = '${req.params.t}' AND d.tipo = '${req.params.q}'
            ORDER BY d.nome
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

router.get('/conteudo/:t/:d', (req, res) => {
    let query = `SELECT c.nome FROM turma t 
        INNER JOIN disciplina_turma dt ON t.idturma = dt.idturma 
        INNER JOIN disciplina d ON dt.iddisciplina = d.iddisciplina
        INNER JOIN conteudo c ON d.iddisciplina = c.iddisciplina
        WHERE t.nome = '${req.params.t}' AND d.nome = '${req.params.d}'
        ORDER BY c.nome`

    db.query(query, (err, result) => {
        if (err) {
            res.status(404).send()
            throw err
        } else {
            res.status(200).send(result)
        }
    })
})

module.exports = router