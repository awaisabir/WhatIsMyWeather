const initialState = {
    fetching: false,
    fetched: false,
    location: {},
    current_forecast: {},
    five_day_forecast: [],
    errors: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case 'FETCH_GEO_LOCATION_PENDING':
            return {
                ...state,
                fetching: true,
            }

        case 'FETCH_GEO_LOCATION_FULFILLED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                location: {...action.payload},
            }

        case 'FETCH_GEO_LOCATION_REJECTED':
            return {
                ...state,
                fetching: false,
                fetched: false,
                errors: [...action.payload]
            }
        
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
                current_forecast: {...action.payload.data},
            }

        case 'FETCH_CURRENT_FORECAST_REJECTED':
            return {
                ...state,
                fetching: false,
                fetched: false,
                errors: [...action.payload.data]
            }
    
        default:
            return state
    }
}