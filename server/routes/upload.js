const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')

const db = require('../dbconnect/mysql')

const storageConfig = multer.diskStorage({
    destination: '../uploads/',
    filename: function (req, file, cb) {
        let name = file.originalname
        for (let i = 0; i < name.length; i++) {
            if (name[i] === '.') name = name.substr(i, name.length)
        }
        cb(null, 'file' + Date.now() + name)
    }
})
let upload = multer({ storage: storageConfig })

router.post('/:disciplina/:conteudo', upload.single('arq'), (req, res, next) => {
    console.log(' a')
    console.log(req.body)
})

module.exports = router