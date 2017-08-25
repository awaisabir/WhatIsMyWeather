import React, { Component } from 'react'
import cloudSun from '../assets/cloud-sun.svg'

class CurrentForecastComponent extends Component {
    render() {
        if (this.props.lon == null 
            || this.props.lat == null 
            || Object.keys(this.props.forecast).length === 0
        )
            return (
                <div>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                    <h2>       
                        Fetching weather ... 
                        <img src={cloudSun} alt="cloud" width="25px" height="25px" />
                    </h2>
                </div>
            )


        return (
            <div>
                <h1>{this.props.forecast.currently.apparentTemperature}</h1>
            </div>
        )
    }
}

export default CurrentForecastComponent