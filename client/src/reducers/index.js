import { combineReducers } from 'redux'
import locationReducer from './location'
import currentForecastReducer from './current_forecast'
import weeklyForecastReducer from './weekly_forecast'
import reversedGeoLocation from './reversedGeoLocation'

const rootReducer = combineReducers({
    location: locationReducer,
    currentForecast: currentForecastReducer,
    weeklyForecast : weeklyForecastReducer,
    reversedGeoLocation
})

export default rootReducer