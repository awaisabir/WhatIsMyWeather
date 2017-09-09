import axios from 'axios'


export const fetchWeeklyForecast = (latitude, longitude) => {
  return {
      type: 'FETCH_WEEK_FORECAST',
      payload: axios.get(`https://localhost:3001/weekly/${latitude}/${longitude}`)
  }
}

export const fetchGeoLocation = location => {
  return {
      type: 'FETCH_GEO_LOCATION',
      payload: getGeoLocation()
  }
}

export const fetchCurrentForecast = (latitude, longitude) => {
    return {
        type: 'FETCH_CURRENT_FORECAST',
        payload: axios.get(`https://localhost:3001/current/${latitude}/${longitude}`)
    }
}

export const fetchReversedGeoLocation = (latitude, longitude) => {
    return {
        type: 'FETCH_REVERSED_LOCATION',
        payload: reverseGeoCode(latitude, longitude)
    }
}

const getGeoLocation = () => {
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

const reverseGeoCode = (lat, lng) => {
    return new Promise((resolve, reject) => {
        if (lat === undefined || lng === undefined)
            reject('No ...')

        let geocoder = new window.google.maps.Geocoder
        let latLng = {lat, lng}
        geocoder.geocode({'location': latLng}, (results, status) => {
            if (status === 'OK') 
                resolve(results[2].formatted_address)
            else
                reject('No ...')
        })
    })	
}
