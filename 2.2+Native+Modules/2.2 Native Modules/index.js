const fs = require("fs")

fs.writeFile("test.txt","Hello world",(err) => {
    if(err) throw err
    else console.log("File created")
})
fs.readFile("test.txt","utf-8",(err,data) => {
    if(err) throw err

    else console.log(data)
})

fs.writeFile("test.txt","Hello from rudra",(err) => {
    if(err) throw err
    else console.log("File updated")
})

