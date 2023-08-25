import React from "react";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

class Weather extends React.Component {
  constructor() {}
}

const Weather = ({ forecastData }) => {
    return (
      <div className="container">
        <h2>Weather Forecast</h2>
        <div className="row">
          {forecastData.map((forecast, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{forecast.date}</h5>
                  <p className="card-text">{forecast.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  axios.get(`${SERVER_URL}/weather?lat=${lat}&lon=${lon}`)
  .then(response => {
    this.setState({forecastData: response.data});
  })
  .catch(error => {
    console.error('WE HAVE A PROBLEM CHIEF! NO FORECAST DATA!', error)
  });

  export default Weather;