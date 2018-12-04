const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../dbconnect/mysql')

router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(bodyParser.json())

router.post('/signup', (req, res) => {
    let query = `INSERT INTO pessoa (nome, usuario, senha) VALUES ('${req.body.nome}', '${req.body.usuario}', '${req.body.senha}')`

    if (req.body.alunoprof == 'Aluno') {
        db.query(query, err => {
            if (err) {
                res.send(500).send()
                console.log(err)
            } else {
                let query2 = `INSERT INTO aluno (idpessoa, idturma) VALUES (
                    (SELECT idpessoa FROM pessoa WHERE nome = '${req.body.nome}'),
                    (SELECT idturma FROM turma WHERE nome = '${req.body.turoudisc}'))`
                db.query(query2, err => {
                    if (err) {
                        res.send(500).send()
                        console.log(err)
                    }
                })
            }
        })
    } else if (req.body.alunoprof == 'Professor') {
        db.query(query, err => {
            if (err) {
                res.send(500).send()
                console.log(err)
            } else {
                let query2 = `INSERT INTO professor (idpessoa, iddisciplina) VALUES (
                    (SELECT p.idpessoa FROM pessoa p WHERE p.nome = '${req.body.nome}'),
                    (SELECT d.iddisciplina FROM disciplina d WHERE d.nome = '${req.body.turoudisc}'))`
                db.query(query2, err => {
                    if (err) {
                        console.log(err)
                        res.send(500).send()
                    }
                })
            }
        })
    }
    res.status(200).send()
})

router.post('/login', (req, res) => {

    let query = `SELECT idpessoa FROM pessoa WHERE usuario = '${req.body.login}' AND senha = '${req.body.senha}'`
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else if (result.length === 0) {
            res.status(404).send()
        } else {
            //Checa se é aluno ou professor
            let idpessoa = JSON.parse(JSON.stringify(result))[0].idpessoa
            let query2 = `SELECT t.nome AS turma FROM turma t
                INNER JOIN aluno a ON a.idturma = t.idturma 
                LEFT JOIN pessoa p ON p.idpessoa = a.idpessoa 
                WHERE p.idpessoa = ${idpessoa}`
            db.query(query2, (err, result) => {
                if (err) {
                    throw err
                } else if (result.length == 0) {
                    let query3 = `SELECT d.nome AS disciplina FROM disciplina d
                        INNER JOIN professor pr ON pr.iddisciplina = d.iddisciplina 
                        LEFT JOIN pessoa p ON p.idpessoa = pr.idpessoa 
                        WHERE p.idpessoa = ${idpessoa}`
                    db.query(query3, (err, result) => {
                        if (err) {
                            res.status(404).send()
                            throw err
                        }
                        res.status(200).send(result)
                    })
                } else {
                    res.status(200).send(result)
                }
            })
        }
    })
})

module.exports = router