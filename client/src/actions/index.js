import axios from 'axios'


export const fetchWeeklyForecast = (latitude, longitude) => {
  return {
      type: 'FETCH_WEEK_FORECAST',
      payload: axios.get(`http://localhost:3001/weekly/${latitude}/${longitude}`)
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
        payload: axios.get(`http://localhost:3001/current/${latitude}/${longitude}`)
    }
}

function getGeoLocation() {
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