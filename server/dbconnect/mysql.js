const mysql = require('mysql')
const beep = require('beeper')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'triste'
})

db.connect((err) => {
    if (err) {
        beep()
        throw err
    }
    console.log('MYSQL connected!')
})
 
module.exports = db