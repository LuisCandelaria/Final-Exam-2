const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

let movieSchema = mongoose.Schema({
    movie_ID : {
        type : String,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
    },
    movie_year : {
        type : Number
    },
    movie_rating : {
        type : Number
    }
})

let moviesCollection = new mongoose.Connection( 'movies', movieSchema );

const Movies = {
    addNewMovie: function( movie ) {
        return moviesCollection
                .create( movie )
                .then( response => {
                    return response;
                })
                .catch( err => {
                    return err;
                })
    },
    getAllMovies: function() {
        return moviesCollection
                .find()
                .then( response => {
                    return response;
                })
                .catch( err => {
                    return err;
                })
    }
}

module.exports = {
    Movies
};