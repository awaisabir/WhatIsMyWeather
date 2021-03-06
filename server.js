import express from 'express'
import rp from 'request-promise-native'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import CONFIG from './config/config'

const app = express()
const PORT = process.env.PORT || 3001

const API_KEY = CONFIG.API_KEY

app.use(express.static(__dirname + '/public/build'))
app.use(cors())


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/build/index.html'))
})

app.get('/current/:_lat/:_lon', (req, res, next) => {

    const { _lat, _lon } = req.params

    rp(`https://api.darksky.net/forecast/${API_KEY}/${_lat},${_lon}?exclude=minutely,hourly,daily&units=auto`)
        .then(response => JSON.parse(response))
        .then(data => res.json(data))
        .catch(err => console.error(err))

})

app.get('/weekly/:_lat/:_lon', (req, res, next) => {
    
    const { _lat, _lon } = req.params

    rp(`https://api.darksky.net/forecast/${API_KEY}/${_lat},${_lon}?exclude=currently,minutely,hourly&units=auto`)
        .then(response => JSON.parse(response))
        .then(data => res.json(data.daily.data))
        .catch(err => console.log(err))
})

app.listen(PORT, err => {
    if (err) return console.error(err)

    console.log(`App listening on PORT ${PORT}`)
})