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

	componentDidUpdate() {
		if (this.props.fetched_location && !this.props.fetched_forecast)
			this.props.fetchCurrentForecast(this.props.latitude, this.props.longitude)
	}

	render() {
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
									<li onClick={() => this.props.fetchCurrentForecast(this.props.latitude, this.props.longitude)}>
										<NavLink to="/current" activeStyle={{ color:'#00d1b2' }}>Current Forecast</NavLink>
									</li>
									<li>
										<NavLink to="/weekly" activeStyle={{ color:'#00d1b2' }}>Weekly Forecast</NavLink>
									</li>
								</ul>
							</div>
							<div>
								<Route exact path="/current"
									render={() => 
										<CurrentForecastComponent 
											lat={this.props.latitude} 
											lon={this.props.longitude} 
											forecast={this.props.currentForecast}
										/>
									} 
								/>
								<Route exact path="/weekly" component={WeeklyForecastListComponent} />
							</div>
							{this.props.fetched_location ? 
								<MapComponent lat={this.props.latitude} lon={this.props.longitude}
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

const mapStateToProps = state => {
	let {latitude, longitude} = state.location
	return {
		latitude,longitude,
		currentForecast : state.current_forecast,
		fetching_forecast : state.fetching_forecast,
		fetched_forecast : state.fetched_forecast,
		fetching_location : state.fetching_location,
		fetched_location : state.fetched_location,
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
