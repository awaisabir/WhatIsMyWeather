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

export default function geoLocation(location) {
    return {
        type: 'FETCH_GEO_LOCATION',
        payload: getGeoLocation()
    }
}