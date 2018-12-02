const mysql = require('mysql')
const beep = require('beeper')

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'triste'
})

db.connect(err => {
    if (err) {
        beep()
        throw err
    }
    console.log('MYSQL connected!')
})
 
module.exports = db