import React from 'react'
import '../styles/MapComponent.css'
import map from '../assets/marker.svg'

const MapComponent = ({lat, lon}) => {
    if (!lat || !lon) {
        return (
            <div>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
                <h2>       
                    Pinpointing your location ... 
                    <img src={map} alt="cloud" width="25px" height="25px" />
                </h2>
            </div>
        ) 
    }

    return(
        <div>
            The map will be rendered at {lat}, {lon}
        </div>
    )
}

export default MapComponent
