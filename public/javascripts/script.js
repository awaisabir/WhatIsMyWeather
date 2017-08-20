let weather = document.getElementById('weather')
let tab = document.querySelectorAll('.tabs ul li')
let currentWeather = tab[0]
let fiveDayForecast = tab[1]
let latitude = 0,
    longitude = 0


function getCurrentForecast() {
    fiveDayForecast.classList.remove('is-active')
    currentWeather.classList.add('is-active')
    addSpinner()
    getLocation()
    .then(coords => {
        let {latitude, longitude} = coords

        reverseGeoCode(latitude, longitude)
        .then(address => {

            fetch(`/current/${latitude}/${longitude}`)
            .then(response => response.json())
            .then(data => {
                weather.innerHTML = `
                <div class="display-current">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                                ${address}
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                <canvas id="icon1" width="50" height="50"></canvas>
                                <hr/>
                                <small>
                                    <h1>${Math.ceil(data.currently.temperature)}&deg;C</h1>
                                    <strong>Precip: </strong> ${data.currently.precipProbability*100}% <br/>                                
                                    <strong>Humidity: </strong>${Math.round(data.currently.humidity*100)}% <br/>                                
                                    <strong>Wind: </strong>${data.currently.windSpeed} km/h <br/>
                                    <strong>UV Index: </strong>${data.currently.uvIndex} <br/>                                                                
                                </small>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
                `
    
                let skycons = new Skycons({"color": "#363636"})
                skycons.set("icon1", data.currently.icon)
                skycons.play()
    
                initMap(data.latitude, data.longitude)
            })
        }).catch(err => weather.innerHTML = `${err.message}`)
    })
    .catch(err => weather.innerHTML = `${err.message}`)
}

function getWeeklyForecast() {
    currentWeather.classList.remove('is-active')
    fiveDayForecast.classList.add('is-active')
    addSpinner()
    getLocation()
    .then(coords => {
        fetch(`/weekly/${coords.latitude}/${coords.longitude}`)
        .then(response => response.json())
        .then(weeklyForecast => {
            weather.innerHTML = `<div class="display-weekly"></div>`
            
            let display = document.getElementsByClassName('display-weekly')
            let skycons = new Skycons({"color": "#363636"})            
            weeklyForecast.shift()
            let i = 0
            for (forecast of weeklyForecast) {
                let date = new Date(forecast.time*1000)
                display[0].innerHTML += `
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${dayToString(date.getDay())}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <canvas id="icon${i}" width="50" height="50"></canvas>
                            <p>${forecast.summary}</p>
                            <hr/>
                            <small>
                                <p><strong>Max:</strong> ${Math.ceil(forecast.apparentTemperatureMax)}&deg;C</p>
                                <p><strong>Min:</strong> ${Math.ceil(forecast.apparentTemperatureMin)}&deg;C</p>
                            </small>
                            <hr/>
                        </div>
                    </div>
                </div>
                `
                i++
            }
            addSkyCons(skycons, weeklyForecast)
            skycons.play()
        })
        .catch(err => console.log(err))
    })
    .catch(err => { weather.innerHTML = `${err.message}` })
}

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

function reverseGeoCode(lat, lng) {
    let geocoder = new google.maps.Geocoder
    let latLng = {lat: lat, lng: lng}
    return new Promise((resolve, reject) => {
        geocoder.geocode({'location': latLng}, (results, status) => {
            if (status === 'OK')
                resolve(results[2].formatted_address)
            else
                reject({message: 'Oops! Something went wrong at our end ... Please try again later'})
        })
    })
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

function addSkyCons(skycons, weeklyForecast) {
    skycons.add('icon0', weeklyForecast[0].icon)
    skycons.add('icon1', weeklyForecast[1].icon)
    skycons.add('icon2', weeklyForecast[2].icon)
    skycons.add('icon3', weeklyForecast[3].icon)
    skycons.add('icon4', weeklyForecast[4].icon)
    skycons.add('icon5', weeklyForecast[5].icon)
    skycons.add('icon6', weeklyForecast[6].icon)
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
}

function dayToString(int) {
    if (int === 0) return 'Sun'
    if (int === 1) return 'Mon'
    if (int === 2) return 'Tue'
    if (int === 3) return 'Wed'
    if (int === 4) return 'Thu'
    if (int === 5) return 'Fri'
    if (int === 6) return 'Sat'
}