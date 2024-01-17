// const http = require("http")

// const server = http.createServer((req, res) => {
//     res.statusCode=404

//     res.end()
// })

// server.listen(3000, () => {console.log("server ready")})
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) =>{
    res.send("I am express")
})

app.get('/chickens', (req, res) =>{
    res.send("i am a lot of chickens")
})

app.get("/chickens/:name", (req, res) =>{
    //res.send(req.params)
    res.send(req.query)
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

