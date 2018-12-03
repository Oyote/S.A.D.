const express = require('express')
const router = express.Router()

const db = require('../dbconnect/mysql')

router.get('/', (req, res) => {
    db.query('SELECT nome FROM turma ORDER BY nome', (err, result) => {
        if(err) throw err;
        res.status(200).send(JSON.stringify(result))
    })
})

module.exports = router