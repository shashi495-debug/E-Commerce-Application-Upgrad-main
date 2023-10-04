const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes/index.routes")
const server = require("./config/server.config")
const db = require("./config/db.confiig")

const app = express()

app.use(express.json())

app.listen(server.PORT,()=>{
    console.log(`server started at ${server.PORT}`)
})

app.use('/eshop', routes)

app.all('*', (req, res)=>{
    return res.status(404).send("invalid url")
})

mongoose.connect(db.DB_URL)
.then(()=>{
    console.log("DataBase connected")
})
.catch(()=>console.log("Error Occured"))