require("dotenv").config();

var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");
var inquirer = require("inquirer");


// inquire inputs to seclect what api to call
// "list" "choices"

inquirer
    .prompt ([
        {
          type: "list",
          message: "Choose a Topic to Search",
          choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
          name: "topic"
        },
    
    ])
    

// if argv[2] = concert-this '<artist name here>'
// search Bands in Town API for: Name of Venue, Venue Location, Date(MM/DD/YYYY)

// if argv[2] = spotify-this-song '<song name here>'
// search Spotify API for: Artist, Song Name, Spoify preview link, song album. 
// DEFAULT SONG - The Sign by Ace of Base

// if argv[2] = movie-this '<movie name here>'
// output: Title, year, IMDB rating, R.T rating, Country produced in, Language, Plot, List of actors.
// DEFAULT MOVIE - Mr Nobody

// if argv[2] = do-what-it-says
