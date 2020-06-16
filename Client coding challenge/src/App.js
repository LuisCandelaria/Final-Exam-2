import React from 'react';
import './App.css';
import Movie from './Movie';
import MovieForm from './MovieForm';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      movies : [],
      fetchMovies : this.handleInput,
      fetchGet : this.handleFetch,
      urlPost : 'http://localhost:8080/api/add-movie/',
      urlGet : 'http://localhost:8080/api/movies/'
    }
  }
  
  handleInput = () => {
    let url = `${this.state.urlPost}`;
    let title = document.getElementById('title').value;
    let rating = document.getElementById('rating').value;
    let year = document.getElementById('year').value;

    let data = {
      movie_title : title,
      movie_rating : rating,
      movie_year : year
    }
    
    let settings = {
      method : 'POST',
      body : JSON.stringify( data )
    }

    fetch( url, settings)
      .then( response => {
        if( response.ok ){
          return response.json();
        }
      })
      .then( responseJSON => {
        console.log( responseJSON );
        this.handleFetch();
      })
      .catch( err => {
        console.log( "An error ocurred in the database." );
      })
  }

  handleFetch = () => {
    let url = `${this.state.urlGet}`;

    let settings = {
      method : 'GET'
    }

    fetch( url, settings)
      .then( response => {
        if( response.ok ){
          return response.json();
        }
      })
      .then( responseJSON => {
        this.setState({
          movies : responseJSON
        })
      })
      .catch( err => {
        console.log( "There are no movies yet." );
      })
  }

  componentDidMount(){
    this.handleFetch();
  }

  render(){
    return (
      <div>
          <MovieForm onclickEvent={this.state.fetchMovies}></MovieForm>
          <div className="movies-container">
            {this.state.movies.map( (movie, index) => {
              return(
                <Movie movieInfo={movie} idx={index}></Movie>
              )
            })}
          </div>
      </div>
    );
  }
}

export default App;
