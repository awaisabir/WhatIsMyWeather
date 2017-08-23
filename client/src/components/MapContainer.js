import React, { Component } from 'react'
import MapComponent from './MapComponent'

class MapContainer extends Component {
    render() {
        return (
            <div>
                <h1>Map Container</h1>
                <MapComponent lat={32} lon={24}/>
            </div>
        )
    }
}

export default MapContainer

