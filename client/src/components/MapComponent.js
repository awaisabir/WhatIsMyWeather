import React, {Component} from 'react'
import '../styles/MapComponent.css'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class MapComponent extends Component {
    render() {
        const markers = this.props.markers || []
        if (!this.props.lat || !this.props.lon) {
            return null
        }
    
        return(
            <div className="map">
							<GoogleMap
								defaultZoom={9}
								defaultCenter={{ lat: this.props.lat, lng: this.props.lon}}>
								{markers.map((marker, index) => <Marker {...marker} />)}
							</GoogleMap>
            </div>
        )
    }
}

export default withGoogleMap(MapComponent)
