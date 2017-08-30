import { combineReducers } from 'redux'
import locationReducer from './location'
import currentForecastReducer from './current_forecast'
import weeklyForecastReducer from './weekly_forecast'

const rootReducer = combineReducers({
    location: locationReducer,
    currentForecast: currentForecastReducer,
    weeklyForecast : weeklyForecastReducer
})

export default rootReducer