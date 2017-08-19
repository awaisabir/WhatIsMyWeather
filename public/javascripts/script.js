/**
 *  Variables
 **/
let weather = document.getElementById('weather')
let tab = document.querySelectorAll('.tabs ul li')
let currentWeather = tab[0]
let fiveDayForecast = tab[1]
let latitude = 0,
    longitude = 0

/**
 *  Name: getCurrentWeather
 *  Purpose: Function make call to backend enpoint for current weather and populate the DOM 
 **/
function getCurrentForecast() {
    fiveDayForecast.classList.remove('is-active')
    currentWeather.classList.add('is-active')
    addSpinner()
    getLocation()
    .then(coords => {
        let {latitude, longitude} = coords

        fetch(`/current/${latitude}/${longitude}`)
        .then(response => response.json())
        .then(data => {
            weather.innerHTML = `
            <div class="display-current">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${data.timezone}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <h1>${data.currently.temperature}&deg;C</h1>
                            <hr/>
                            <small>
                                <h1>${data.currently.summary}</h1><br/>
                                <canvas id="icon1" width="75" height="75"></canvas>
                            </small>
                            <hr/>
                            <small>
                                <strong>Precipitation: </strong> ${data.currently.precipProbability*100}% <br/>                                
                                <strong>Humidity: </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data.currently.humidity*100}% <br/>                                
                                <strong>Wind: </strong> &nbsp;&nbsp;&nbsp;${data.currently.windSpeed} km/h <br/>
                                <strong>UV Index: </strong> &nbsp;&nbsp;${data.currently.uvIndex} <br/>                                                                
                            </small>
                            <hr/>
                            <small>
                                <h2>Alerts</h2>
                                <ul id="alerts"></ul>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            `
            let alertsList = document.getElementById('alerts')
            if (data.alerts === undefined) {
                alertsList.innerHTML = `<li>There are no alerts at this moment</li>`
            } else {
                alertsList.innerHTML = ``
                for (alert of data.alerts) {
                    alertsList.innerHTML += `
                        <li>
                            <h3>${alert.title}</h3>
                            <p>${alert.description}</p>
                        </li>
                    `
                }
            }

            let skycons = new Skycons({"color": "#363636"})
            skycons.set("icon1", data.currently.icon)
            skycons.play()

            initMap(data.latitude, data.longitude)
        }).catch(err => weather.innerHTML = `Oops! Something went wrong at our end ... Please try again`)
    })
    .catch(err => { weather.innerHTML = `${err.message}` })
}

/**
 *  Name: getForecast
 *  Purpose: Function make call to backend enpoint for 5-day forecast and populate the DOM 
 **/
function getWeeklyForecast() {
    currentWeather.classList.remove('is-active')
    fiveDayForecast.classList.add('is-active')
    getLocation()
    .then(coords => {
        fetch(`/forecast/${coords.latitude}/${coords.longitude}`)
        .then(response => response.json())
        .then(forecast => {
            
        })
        .catch(err => console.log(err))
    })
    .catch(err => { weather.innerHTML = `${err.message}` })
}


/**
 *  Name: getLocation
 *  Purpose: Function to get the location from the browser
 **/
function getLocation() {
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

function addSpinner() {
    weather.innerHTML = `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
        <h2>       
            Pinpointing your location ... 
            <img src="images/map.svg" alt="cloud" width="25px" height="25px" />
        </h2>
    `
}

/**
 *  Name: toTitleCase
 *  @param: string
 *  Purpose: Function to turn first letter of all words to uppercase
 **/
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
}