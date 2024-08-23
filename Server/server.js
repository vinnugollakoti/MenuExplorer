const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

require('dotenv').config()

const port = process.env.PORT || 4050;
const URI = process.env.URI

mongoose.connect(URI)
    .then(() => {
        console.log("Server is connected to database!")
        app.get('/', (req, res) => {
            res.send("Working!!!!")
        });
    })
    .catch((err) => {
        console.log("Database Error", err)
    })

app.listen(port, () => {
    console.log(`This is from port ${port}`)
})