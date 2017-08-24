const initialState = {
    fetching: false,
    fetched: false,
    current_forecast: {},
    errors: []
}

export function fetchCurrentForecast(state=initialState, action) {
    switch (action.type) {
        case 'FETCH_CURRENT_FORECAST_PENDING':
            return {
                ...state,
                fetching: true,
            }

        case 'FETCH_CURRENT_FORECAST_FULFILLED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                current_forecast: {...action.payload},
            }

        case 'FETCH_CURRENT_FORECAST_REJECTED':
            return {
                ...state,
                fetching: false,
                fetched: false,
                errors: [...action.payload]
            }
    
        default:
            return state
    }
}

export default fetchCurrentForecast