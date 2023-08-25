import React from 'react';
import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

class Movies extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            error: null,
        }
    }

    componentDidMount = () => {
        this.handleMovies();
    }

    handleMovies = async () => {

        axios.get(`${SERVER_URL}/movies?city=${this.props.searchQuery}`)
        .then(response => {
            this.setState({ movies: response.data });
        })
        .catch(error => {
            console.error('Cant show the movies right now please eat popcorn: ', error);
            this.setState({ error: error.message });
        });
    }

    render() {
        let { movies } = this.state;
        console.log(this.state);
        return (
          <div>
            <h2>Movies</h2>
            {movies.map((movie, idx) => (
              <div key={idx} className="card">
                <img src={movie.image_url} className="card-img-top" alt={movie.title} />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
    }
}

export default Movies;