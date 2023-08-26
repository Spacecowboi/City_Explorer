import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Explorer from './components/Explorer';
import axios from 'axios';
import Weather from './components/Weather';
import Movies from './components/Movies';


const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

class App extends React.Component {
  constructor() {
    super();
    this.state= {
      searchQuery: '',
      location: null,
      error: null,
      forecastData: null,
      movies: []
    }
  }

  handleSearch = (e) => {
    console.log('Form Submitted');
    e.preventDefault();
    axios.get(`https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.searchQuery}&format=json`)
    .then(response => {
      console.log('SUCCESS: ', response.data);
        this.setState({ location: response.data[0] });
        const { lat, lon } = response.data[0];
        console.log(`${SERVER_URL}/movies?search=${this.state.searchQuery}`);
      })
      .catch(error => {
        console.error('Error fetching location data: ', error);
        this.setState({ error: error.message });
      });
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  setSearchQuery = (query) => {
    this.setState({ searchQuery: query });
  }

  render() {
    console.log('CITY EXPLORER', this.state);
    return (
      <>
        <header>
          <h1>Welcome to City Explorer!</h1>
        </header>
          <form onSubmit={this.handleSearch}>
            <input placeholder="Explore!" type="text" name="city" onChange={this.handleChange} />
            <button type='submit'>
              Search
            </button>
          </form>
          <Explorer location={this.state.location} query={this.state.searchQuery} />
        {this.state.error
          ? (
            <h2>
              {this.state.error.message}<span onClick={() => this.setState({ error: null })}>X</span>
            </h2>
          )
          : null}
          {this.state.location ? (
            <>
            < Weather location={this.state.location} />
            < Movies searchQuery={this.state.searchQuery}/>
            </>
          ) : null}
      </>
    )
  }
}


export default App


