const initialState = {
    location: {},
    fetching_location: false,
    fetched_location: false,
    current_forecast: {},
    five_day_forecast: [],
    errors: [],
    fetching_forecast: false,
    fetched_forecast: false,
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case 'FETCH_GEO_LOCATION_PENDING':
            return {
                ...state,
                fetching_location: true,
            }

        case 'FETCH_GEO_LOCATION_FULFILLED':
            return {
                ...state,
                fetching_location: false,
                fetched_location: true,
                location: {...action.payload},
            }

        case 'FETCH_GEO_LOCATION_REJECTED':
            return {
                ...state,
                fetching_location: false,
                fetched_location: false,
                errors: [...action.payload]
            }
        
        case 'FETCH_CURRENT_FORECAST_PENDING':
            return {
                ...state,
                fetching_forecast: true,
            }

        case 'FETCH_CURRENT_FORECAST_FULFILLED':
            return {
                ...state,
                fetching_forecast: false,
                fetched_forecast: true,
                current_forecast: {...action.payload.data},
            }

        case 'FETCH_CURRENT_FORECAST_REJECTED':
            return {
                ...state,
                fetching_forecast: false,
                fetched_forecast: false,
                errors: [...action.payload.data]
            }
        
        case 'FETCH_WEEK_FORECAST_PENDING':
            return {
                ...state,
                fetching_forecast: true,
                fetched_forecast: false,
            }
        case 'FETCH_WEEK_FORECAST_FULFILLED':
            return {
                ...state,
                fetching_forecast: false,
                fetched_forecast: true,
                five_day_forecast: [...action.payload.data]
            }
        case 'FETCH_WEEK_FORECAST_REJECTED':
            return {
                ...state,
                fetching_forecast: false,
                fetched_forecast: false,
                errors: [...action.payload.data]
            }
        default:
            return state
    }
}