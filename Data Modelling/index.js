import express from 'express'


const app = new express()
app.get("/",(req,res) => {
    res.send("<h1>Server Created</h1>")
})

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log("Server at Port http://localhost:3000")
})