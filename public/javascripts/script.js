/**
 *  Variables
 **/
let weather = document.getElementById('weather')
let latitude = 0,
    longitude = 0

/**
 *  Name: getLocation
 *  Purpose: Function to get the location from the browser, and populate the #weather.
 *               - Consumes the promise and poulates #weather based on result 
 **/
function getCurrentWeather() {
    getLocation().then(coords => {
        weather.innerHTML = ''
        let {latitude, longitude} = coords
        fetch(`/weather`, {
            method: `POST`,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({latitude, longitude}),
        }).then(data => {
            weather.innerHTML = `
                    Location: ${data.name}, ${data.sys.country}.<br/> 
                    <h1>${data.main.temp}&deg;C </h1>
                    <h1>${toTitleCase(data.weather[0].description)}&nbsp;<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/></h1>
                `
            initMap(data.coord.lat, data.coord.lon)
        }).catch(err => console.log(err))


        /* fetch(`/forecast/${coords.latitude}/${coords.longitude}`)
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))

        getWeather('/weather', coords.latitude, coords.longitude)
            .then(data => {
                weather.innerHTML = `
                    Location: ${data.name}, ${data.sys.country}.<br/> 
                    <h1>${data.main.temp}&deg;C </h1>
                    <h1>${toTitleCase(data.weather[0].description)}&nbsp;<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/></h1>
                `
                initMap(data.coord.lat, data.coord.lon)
            })
            .catch(err => { weather.innerHTML = `Unexpected Error` })*/
    })
    .catch(err => { weather.innerHTML = `${err.message}` })
}


function getForecast(lat, long) {
    getLocation().then(coords => {
        fetch(`/forecast/${coords.latitude}/${coords.longitude}`)
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
    })
    .catch(err => { weather.innerHTML = `${err.message}` })
}

function getLocation()
{
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
            let {longitude, latitude} = position.coords
            resolve({longitude, latitude})
            })
        } else {
            reject({message: 'Turn on geo-location'})
        }
    })
}

/**
 *  Name: getWeather
 *  Purpose: Function to get the weather from the express back-end, via a XMLHttpRequest
 *  @param: url => endpoint to get weather from
 *          lat => latitude from the browser
 *          long => longitude from the browser
 *  @return: Promise with error or result
 **/
function getWeather(url, lat, long) {
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300)
                resolve(JSON.parse(xhr.response))
            else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                })
            }
        }

        xhr.onerror = () => {
            reject({
                status: this.status,
                statusText: this.statusText
            })
        }

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({
            latitude: lat,
            longitude: long
        }))
    })
}

function initMap(lat, lng) {
    if (!lat || !lng) {
        let mapProp = {
            center:new google.maps.LatLng(51.508742,-0.120850),
            zoom:9,
        }
        let map= new google.maps.Map(document.getElementById("map"), mapProp)
    } else {
        let LatLng = {lat, lng}
        let mapProp = {
            center:new google.maps.LatLng(lat, lng),
            zoom:15,
        }
        let map = new google.maps.Map(document.getElementById("map"), mapProp)
        let marker = new google.maps.Marker({
            position: {lat, lng},
            map: map,
            title: 'Your Location'
        })
    }

}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
}