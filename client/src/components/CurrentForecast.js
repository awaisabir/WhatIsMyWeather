import React, { Component } from 'react'
import cloudSun from '../assets/cloud-sun.svg'

class CurrentForecastComponent extends Component {
    render() {
        if (Object.keys(this.props.forecast).length === 0) {
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
        }


    return (
			<div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '50px'}}>
				<div className="card">
					<header className="card-header">
						<p className="card-header-title">
							Location
						</p>
					</header>
					<div className="card-content">
						<div className="content">
							{/* <canvas id="icon1" width="50" height="50"></canvas> */}
							<hr/>
							<small>
								<h1>{Math.ceil(this.props.forecast.currently.apparentTemperature)}&deg;C</h1>
								<strong>Precip: </strong> {this.props.forecast.currently.precipProbability*100}% <br/>                                
								<strong>Humidity: </strong>{Math.round(this.props.forecast.currently.humidity*100)}% <br/>                                
								<strong>Wind: </strong>{this.props.forecast.currently.windSpeed} km/h <br/>
								<strong>UV Index: </strong>{this.props.forecast.currently.uvIndex} <br/>                                                                
							</small>
							<hr/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CurrentForecastComponent