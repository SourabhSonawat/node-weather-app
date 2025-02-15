const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');
const app = express();

// define path for express config 
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath);

//setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
// Setup static directory  to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Sourabh Sonawat"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Sourabh Sonawat"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "sourabh Sonawat"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address! '
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })




});

app.get('/help/*', (req, res) => {
    res.send('help page articles not found')
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'My 404 page',
        errorMessage: 'can not find',
        name: 'Sourabh Sonawat'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})