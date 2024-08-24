const express = require('express')
const Restaurant = require('../models/Restaurant')
require('dotenv').config()

const app = express()
app.use(express.json())

app.get('/restaurants', (req, res) => {
    Restaurant.find()
        .then((restaurant) => {
            res.status(200).send(restaurant)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

app.post('/addRestaurant', (req, res) => {
    const { name, ownerName, mobileNumber, menu } = req.body;

    Restaurant.create({
        name, ownerName, mobileNumber,
        menu: {
            breakfast: menu.breakfast,
            lunch: menu.lunch,
            dinner: menu.dinner
        }
    })
        .then((restaurant) => {
            res.status(201).json({ message: 'Restaurant created!!', restaurant: restaurant });
        })
        .catch((err) => {
            res.status(500).json(err)
        });
});

app.get('/restaurants/:id', (req, res) => {
    const { id } = req.params;

    Restaurant.findById(id)
        .then((restaurant) => {
            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found." });
            }
            res.status(200).send(restaurant);
        })
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving restaurant details.", error: err.message });
        });
});

module.exports = app;