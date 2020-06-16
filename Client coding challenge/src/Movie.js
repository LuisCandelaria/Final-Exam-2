import React from 'react';
import './Movie.css';

function Movie( props ){
    return(
        <div key={props.idx} className="movieInfo">
            <div className="movie-title">
                Title : {props.movieInfo.movie_title}
            </div>
            <div className="movie-year">
                Year : {props.movieInfo.movie_year}
            </div>
            <div className="movie-rating">
                Rating : {props.movieInfo.movie_rating}
            </div>
        </div>
    );
}

export default Movie;