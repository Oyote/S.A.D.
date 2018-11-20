const express = require('express')
const router = express.Router()
const fs = require('fs')
const db = require('../dbconnect/mysql')

router.get('/:disc', (req, res) => {
    let disciplina = req.params.disc
    let query = `SELECT nome FROM file`
})

module.exports = router