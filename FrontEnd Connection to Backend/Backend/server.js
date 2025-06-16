import express from 'express'

const app = express()

const port = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.send('Server Ready')
})

app.get('/api/jokes',(req,res) => {
    const data = [
        {
            id:1,
            title:"Joke first",
            joke:"This is joke"
        },
        {
            id:2,
            title:"Joke second",
            joke:"This is joke"
        },
        {
            id:3,
            title:"Joke third",
            joke:"This is joke"
        },
        {
            id:4,
            title:"Joke fourth",
            joke:"This is joke"
        },
    ]
    res.send(data)
})

app.listen(port,() => {
    console.log(`Click here to start the port http://localhost:3000`)
})