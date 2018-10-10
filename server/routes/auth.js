const express = require('express')
const router = express.Router()

const db = require('../dbconnect/mysql')

router.get('/', (req, res) => {
    //get token
    console.log('a')    
})

router.get('/login', (req, res) => {
    //generate token when login
    console.log('b')
})

router.post('/signup', (req, res) => {
    //sasfa
    console.log('c')
})

module.exports = router