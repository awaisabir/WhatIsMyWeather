const initialState = {
    fetched: false,
    location: '',
    errors: []
}

export default (state=initialState, action) => {
    switch (action.type) {
      case 'FETCH_REVERSED_LOCATION_PENDING':
          return {
              ...state
          }
    
      case 'FETCH_REVERSED_LOCATION_FULFILLED':
          return {
              ...state,
              fetched: true,
              location: action.payload,
          }
    
      case 'FETCH_REVERSED_LOCATION_REJECTED':
          return {
              ...state,
              fetched: false,
              errors: [...action.payload]
          }
      default:
          return state
    }
  }