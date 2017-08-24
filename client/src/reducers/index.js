import { combineReducers } from 'redux'
import fetchCurrentForecast from './fetchCurrentForecast_reducer'
import fetchGeoLocation     from './fetchGeoLocation_reducer'

const ROOT_REDUCER = combineReducers({
    currentForecast: fetchCurrentForecast,
    geoLocation: fetchGeoLocation
})

export default ROOT_REDUCER