import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import geoLocationActionCreator  from '../actions/geoLocation_actionCreator'

import CurrentForecastComponent    from '../components/CurrentForecast'
import WeeklyForecastListComponent from '../components/WeeklyForecastList'
import MapComponent from '../components/MapComponent'

import sun from '../assets/sun.svg'
import cloudSun from '../assets/cloud-sun.svg'
import '../styles/App.css'

class App extends Component {
	componentDidMount() {
		this.props.getLocation()
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
							<li><NavLink to="/current" activeStyle={{ color:'#00d1b2' }}>Current Forecast</NavLink></li>
							<li><NavLink to="/weekly" activeStyle={{ color:'#00d1b2' }}>Weekly Forecast</NavLink></li>
							</ul>
						</div>
						
				
							<div>
							<Route exact path="/current" component={CurrentForecastComponent} />
							<Route exact path="/weekly" component={WeeklyForecastListComponent} />
							</div>
						</div>
				
						<MapComponent lat={this.props.location.latitude} lon={this.props.location.longitude}/>
					</div>
				</Router>
			</div>
		) 
	}
}

function mapStateToProps(state) {
  return {location : state.geoLocation.location}
}

function mapDispatchToProps(dispatch) {
  
    return bindActionCreators({
      getLocation: geoLocationActionCreator
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
