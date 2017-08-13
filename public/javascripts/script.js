/**
 *  Variables
 **/
let weather = document.getElementById('weather')
let latitude = 0,
    longitude = 0

/**
 *  Name: getCurrentWeather
 *  Purpose: Function make call to backend enpoint for current weather and populate the DOM 
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
        })
        .then(response => response.json())
        .then(data => {
            weather.innerHTML = `
                    Location: ${data.name}, ${data.sys.country}.<br/> 
                    <h1>${data.main.temp}&deg;C </h1>
                    <h1>${toTitleCase(data.weather[0].description)}&nbsp;<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/></h1>
                `
            initMap(data.coord.lat, data.coord.lon)
        }).catch(err => console.log(err))
    })
    .catch(err => { weather.innerHTML = `${err.message}` })
}

/**
 *  Name: getForecast
 *  Purpose: Function make call to backend enpoint for 5-day forecast and populate the DOM 
 **/
function getForecast(lat, long) {
    getLocation().then(coords => {
        fetch(`/forecast/${coords.latitude}/${coords.longitude}`)
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
    })
    .catch(err => { weather.innerHTML = `${err.message}` })
}


/**
 *  Name: getLocation
 *  Purpose: Function to get the location from the browser
 **/
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
 *  Name: initMap
 *  Purpose: Function to initialize Google Map
 **/
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


/**
 *  Name: toTitleCase
 *  @param: string
 *  Purpose: Function to turn first letter of all words to uppercase
 **/
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
}