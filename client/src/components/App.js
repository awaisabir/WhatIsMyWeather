import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'

import CurrentForecastComponent    from '../components/CurrentForecast'
import WeeklyForecastListComponent from '../components/WeeklyForecastList'
import MapComponent from '../components/MapComponent'

import sun from '../assets/sun.svg'
import cloudSun from '../assets/cloud-sun.svg'
import map from '../assets/marker.svg'
import '../styles/App.css'

class App extends Component {

	componentWillMount() {
		this.props.fetchGeoLocation()
	}

	componentDidUpdate(prevProps) {
		let {location, fetchWeeklyForecast, fetchCurrentForecast} = this.props
		if(prevProps.location.fetched !== location.fetched) {
			let {latitude, longitude} = location.location
			fetchCurrentForecast(latitude, longitude)
			fetchWeeklyForecast(latitude, longitude)
		}
	}

	currentForecastClickHandler(latitude, longitude) {
		let {currentForecast, fetchCurrentForecast} = this.props
		if (!currentForecast.fetched) {
			fetchCurrentForecast(latitude, longitude)
		}
	}

	weeklyForecastClickHandler(latitude, longitude) {
		let {weeklyForecast, fetchWeeklyForecast} = this.props
		if (!weeklyForecast.fetched) {
			fetchWeeklyForecast(latitude, longitude)
		}
	}
	
	render() {
		let {location, currentForecast, weeklyForecast, fetchCurrentForecast, fetchWeeklyForecast} = this.props
		let {latitude, longitude} = location.location
		
		return (
			<div>
				<Router>
					<div>
						<h1>
							<img src={sun} alt="cloud" width="50px" height="50px"/>
							<strong>Weather</strong>
							<img src={cloudSun} alt="cloud-sun" width="50px" height="50px"/>
						</h1>
				
						<div className="container">
							<div className="tabs is-centered">
								<ul>
									<li onClick={() => this.currentForecastClickHandler(latitude, longitude)}>
										<NavLink to="/current" activeStyle={{ color:'#00d1b2' }}>Current Forecast</NavLink>
									</li>
									<li onClick={() => this.weeklyForecastClickHandler(latitude, longitude)}>
										<NavLink to="/weekly" activeStyle={{ color:'#00d1b2' }}>Weekly Forecast</NavLink>
									</li>
								</ul>
							</div>

							<div>
								<Route exact path="/current"
									render={() => 
										<CurrentForecastComponent 
											forecast={currentForecast.forecast}
										/>
									} 
								/>
								<Route exact path="/weekly"
									render={() =>
										<WeeklyForecastListComponent 
											forecast={weeklyForecast.forecast}
										/>
									}
								/>
							</div>

							{location.fetched ? 
								<MapComponent lat={latitude} lon={longitude}
									containerElement={
										<div style={{ height: `320px`, marginTop: '50px'}} />
									}
									mapElement={
										<div style={{ height: `250px` }} />
									}
								/> :
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
							}
						</div>
					</div>
				</Router>
			</div>
		) 
	}
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
