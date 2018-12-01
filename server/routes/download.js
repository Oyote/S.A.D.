const express = require('express')
const router = express.Router()
const fs = require('fs')
const db = require('../dbconnect/mysql')

router.get('/:cont', (req, res) => {
    let conteudo = req.params.cont
    let data = ''
    let query = 
    `SELECT a.nome FROM arquivo a
        INNER JOIN conteudo c
            ON a.idconteudo = c.idconteudo
        WHERE c.nome = '${conteudo}'`

    db.query(query, (err, result) => {
        if (err) {
            throw err
        } else {
            data = JSON.parse(JSON.stringify(result))
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                fs.access(`./uploads/${data[i].nome}`, (err) => {
                    if (!err) {
                        console.log('myfile exists');
                        return;
                    }
                    console.log('myfile does not exist');
                })
            }
        }
    })
})
module.exports = router