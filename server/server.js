const port = 1234
const http = require('http')
const app = require('./app')
const server = http.createServer(app)
let d = new Date()

server.listen(port, () => {
    console.log(`Running at: localhost:${port}\nConnected since: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`)
})