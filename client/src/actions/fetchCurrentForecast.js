import axios from 'axios'

export default function(latitude, longitude) {
    return {
        type: 'FETCH_CURRENT_FORECAST',
        payload: axios.get(`http://localhost:3001/current/${latitude}/${longitude}`)
    }
}