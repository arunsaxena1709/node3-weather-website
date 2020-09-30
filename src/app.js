const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')


const port = process.env.PORT || 3000
const forecast = require('./Utils/forecast')
const geocode = require('./Utils/geocode')

// Define paths for Express config
const publicDirectoryPath = path.join( __dirname, '../public')
const viewsPath = path.join( __dirname, '../templates/views')
const partialsPath = path.join( __dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index' , {
        title: 'Weather App',
        name: 'Arun'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        helpText: 'We are there to help',
        title: 'Help',
        name: 'Arun'
    })
})

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About Me',
        name: 'Arun'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address!'
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
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)      
    res.send({
        products:[]
    })
})

app.get('/help*' ,(req, res) => {
    res.render('404page' , {
        title: '404',
        name: 'Arun',
        error: 'Help article not found'
    })
})

app.get('*' ,(req, res) => {
    res.render('404page' , {
        title: '404',
        name: 'Arun',
        error: 'Page not found'        
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})