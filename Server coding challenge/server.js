const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const cors = require( './middleware/cors' );
const uuid = require( 'uuid' );
const {Movies} = require('./models/moviedex-model');

const app = express();

app.use( cors );

/* 
    Your code goes here 
*/

app.get('/api/movies/', (req, res) => {
    Movies
        .getAllMovies()
            .then( response => {
                if( response != null ) {
                    return res.status( 200 ).json( response );
                }
                else {
                    res.statusMessage = "No movies found in the moviedex.";
                    return res.status( 404 ).end();
                }
            })
            .catch( err => {
                console.log( "error" );
            })
})

app.post('/api/add-movie/', jsonParser, (req, res) => {
    let movieTitle = req.body.movie_title;
    let movieYear = req.body.movie_year;
    let movieRating = req.body.movie_rating;
    let movieID = uuid.v4();

    if( !movieTitle || !movieRating || !movieYear ) {
        res.statusMessage = "You need to send all movie fields to add the movie to the movie list";
        return res.status( 403 ).end();
    }

    let data = {
        movie_ID : movieID,
        movie_title : movieTitle,
        movie_rating : movieRating,
        movie_year : movieYear
    }

    Movies
        .addNewMovie( data )
            .then( response => {
                return res.status( 201 ).json( response );
            })
            .catch( err => {
                console.log( "error" );
            })

})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});