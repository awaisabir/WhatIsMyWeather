const initialState = {
  location: {},
  forecast: {},
  fetching: false,
  fetched: false,
  errors: [],
}

export default (state=initialState, action) => {
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
              forecast: {...action.payload.data},
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