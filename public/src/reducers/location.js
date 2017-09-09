const initialState = {
  fetched: false,
  fetching: false,
  location: {}
}

export default (state=initialState, action) => {
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
    default:
        return state
  }
}