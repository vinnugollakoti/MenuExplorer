const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const cron = require('node-cron');
const axios = require('axios');

const authRoute = require('./routes/auth')
const restaurantRoute = require('./routes/Restaurant')

app.use(cors())
app.use(express.json())

app.use("/", authRoute)
app.use("/", restaurantRoute)

require('dotenv').config()

const port = process.env.PORT || 4050;
const URI = process.env.URI

function setupCronJob() {
    const renderAPIUrl = process.env.RENDERLINK;

    cron.schedule('*/5 * * * *', async () => {
        const currentTime = new Date().toLocaleString();
        try {
            const response = await axios.get(renderAPIUrl);
            console.log(`Pinged Render API at ${currentTime}: Status ${response.status}`);
        } catch (error) {
            console.error(`Failed to ping Render API at ${currentTime}: ${error.message}`);
        }
    });

    console.log('Cron jobs is ready!');
}

mongoose.connect(URI)
    .then(() => {
        console.log("Server is connected to database!")
        app.get('/', (req, res) => {
            res.send("Working!!!!")
        });

        setupCronJob();
    })
    .catch((err) => {
        console.log("Database Error", err)
    })

app.listen(port, () => {
    console.log(`This is from port ${port}`)
})