import React from 'react'
import cloudSun from '../assets/cloud-sun.svg'

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
    <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '50px', flexWrap: 'wrap'}}>
      {forecast.map(item => {
          return (
            <div className="card" style={{marginTop: '10px'}}>
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
                    <h1>{item.summary}</h1>                                                         
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

export default WeeklyForecastList