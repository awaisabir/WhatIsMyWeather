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
function getLocation() {
    if (navigator.geolocation) {
        weather.innerHTML = '';
        // if geolocation enabled, then get the current co-ordinates
        position = navigator.geolocation.getCurrentPosition((position) => {
            longitude = position.coords.longitude
            latitude = position.coords.latitude

            // call the get weather function & evaluate the promise
            getWeather('/weather', latitude, longitude)
                .then(data => {
                    weather.innerHTML = `
                                    The current weather at Latitude: ${data.coord.lat} & Longitude: ${data.coord.lon} (${data.name}, ${data.sys.country}) is ${data.main.temp}&deg;C
                                `
                })
                .catch(err => console.log(err))
        })
    } else
        weather.innerHTML = 'Turn on geolocation!'
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

        // new XMLHttpRequest POST request
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.onload = function() {
            // resolve with the parsed response
            if (this.status >= 200 && this.status < 300)
                resolve(JSON.parse(xhr.response))
            else {
                // reject with error
                reject({
                    status: this.status,
                    statusText: this.statusText
                })
            }
        }

        // rejet with error
        xhr.onerror = () => {
            reject({
                status: this.status,
                statusText: this.statusText
            })
        }

        // set headers and send the data onto the endpoint
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({
            latitude: lat,
            longitude: long
        }))
    })
}