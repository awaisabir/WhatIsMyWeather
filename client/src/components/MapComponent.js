import React from 'react'

const MapComponent = ({lat, lon}) => {
    if (!lat || !lon) {
        return <div>Loading ...</div> 
    }

    return(
        <div>
            Render the map with props!
        </div>
    )
}

export default MapComponent
