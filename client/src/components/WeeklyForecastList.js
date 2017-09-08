import React from 'react'
import cloudSun from '../assets/cloud-sun.svg'
import '../styles/WeeklyForecast.css'

const WeeklyForecastList = ({forecast}) => {
  if (Object.keys(forecast).length === 0) {
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
    <div className="display-weekly">
      {forecast.map(item => {
          return (
            <div className="card" style={{marginTop: '10px'}}>
              <header className="card-header">
                <p className="card-header-title">
                  { dayToString((new Date(item.time*1000).getDay())) }
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  {/* <canvas id="icon1" width="50" height="50"></canvas> */}
                  <hr/>
                  <small>
                    <h3>{item.summary}</h3>                                                         
                  </small>
                  <hr/>
                  <small>
                      <p><strong>Max:</strong> {Math.ceil(item.apparentTemperatureMax)}&deg;C</p>
                      <p><strong>Min:</strong> {Math.ceil(item.apparentTemperatureMin)}&deg;C</p>
                  </small>
                  <hr/>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

const dayToString = int => {
  if (int === 0) return 'Sun'
  if (int === 1) return 'Mon'
  if (int === 2) return 'Tue'
  if (int === 3) return 'Wed'
  if (int === 4) return 'Thu'
  if (int === 5) return 'Fri'
  if (int === 6) return 'Sat'
}

export default WeeklyForecastList