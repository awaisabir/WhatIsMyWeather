// imports
import express from 'express'
import rp from 'request-promise-native'
import path from 'path'
import bodyParser from 'body-parser'
import CONFIG from './config/opeanweathermap'

// app stuff
const app = express()
const PORT = process.env.PORT || 3000

// get API KEY
const API_KEY = CONFIG.API_KEY

// middleware && public folder
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))


// default route
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

// weather endpoint
app.get('/weather/:_lat/:_lon', (req, res, next) => {

    const { _lat, _lon } = req.params

    // send a request to the OpenWeatherMap API
    rp(`https://api.openweathermap.org/data/2.5/weather?lat=${_lat}&lon=${_lon}&appid=${API_KEY}&units=metric`)
        .then(response => JSON.parse(response))
        .then(data => res.json(data))
        .catch(err => console.error(err))

})

app.get('/forecast/:_lat/:_lon', (req, res, next) => {
    
    const { _lat, _lon } = req.params

    rp(`https://api.openweathermap.org/data/2.5/forecast?lat=${_lat}&lon=${_lon}&appid=${API_KEY}&units=metric`)
        .then(response => JSON.parse(response))
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

// fire up server
app.listen(PORT, err => {
    if (err) return console.error(err)

    console.log(`App listening on PORT ${PORT}`)
})