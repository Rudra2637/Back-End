import dotenv from 'dotenv'


import connection from './db/db_connect.js'
// function connectDB(){}

dotenv.config({
    path:"./env"
})


connection()
// const app = express()


// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",() => {
//             console.log("error")
//         })
//         app.listen(process.env.PORT,() => {
//             console.log(`app is listening on http://localhost:${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })()
