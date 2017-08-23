import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import CurrentForecast    from '../components/CurrentForecast'
import WeeklyForecastList from '../components/WeeklyForecastList'
import MapContainer from '../components/MapContainer'

import sun from '../assets/sun.svg'
import cloudSun from '../assets/cloud-sun.svg'
import '../styles/App.css'

const App = () => {
  return (
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
              <Route exact path="/current" component={CurrentForecast} />
              <Route exact path="/weekly" component={WeeklyForecastList} />
            </div>
        </div>

        <MapContainer />
      </div>
    </Router>
  )
}

export default App
