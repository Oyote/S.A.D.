const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'saddb'
})

db.connect((err) => {
    if (err) throw err;
    console.log('MYSQL connected!')
})

module.exports = db 