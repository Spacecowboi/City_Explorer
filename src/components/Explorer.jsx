import React from 'react';
import weather from '../assets/weather.json';


let API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

class Explorer extends React.Component {

  render() {

    let { location } = this.props;  
    let lat = location ? location.lat : '';
    let lon = location ? location.lon : '';

    
    let staticMapUrl = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${lon}$zoom=9`;

    return (
      <main>
        <section>
          <h2>Maps</h2>
          <p>{this.props.query}</p>
          <p>City: {location ? location.display_name : 'No location set'}</p>
          <p>URL FOR MAP: PLACEHOLDER</p>
          <img src={location ? staticMapUrl : "https://placehold.co/600x400" }alt="" />
        </section>
        <section>
          <ul>
          {weather.data.map((dailyForcast, index) => (
            <li key={index}>
              <p>{dailyForcast.datetime}</p>
              <p>{dailyForcast.temp}</p>
            </li>
          ))}
          </ul>
        </section>
      </main>
    )
  }
}

export const test = 'banana';

export default Explorer;
