require("dotenv").config();

var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");
var inquirer = require("inquirer");
var axios = require("axios");

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

    .then(function(inquirerResponse) {
        console.log(inquirerResponse);

        // if choice is concert-this 
        if (inquirerResponse.topic === "concert-this"){
            inquirer   
                .prompt ([
                    {
                    type: "input",
                    message: "What artist would you like to search?",
                    name: "artist"
                    },
                ])
                // search Bands in Town API for: Name of Venue, Venue Location, Date(MM/DD/YYYY)
                .then(function(inquirerResponse) {
                    var artist = inquirerResponse.artist;
                    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
                    
                    axios.get(queryURL)
                    .then(function(response) {
                        console.log(response.data);
                        console.log("The Concert Venue: " + response.data[0].venue.name);
                        console.log("The Venue Location: " + response.data[0].venue.city +", " +response.data[0].venue.region);

                        let showTime = response.data[0].datetime;
                        showTime = moment(showTime, "YYYY/MM/DD hh:mm:ss").format("MM/DD/YYYY");

                        console.log("The Concert Date: " + showTime);
                    })
                })
        }    
        // if choice is spotify-this-song 
        // search Spotify API for: Artist, Song Name, Spoify preview link, song album. 
        // DEFAULT SONG - The Sign by Ace of Base
        else if (inquirerResponse.topic === "spotify-this-song"){
            inquirer
                .prompt ([
                    {
                    type: "input",
                    message: "What song would you like to search?",
                    name: "name"
                    }
                ])
        }
        // if choice is  movie-this 
        
        // DEFAULT MOVIE - Mr Nobody
        else if (inquirerResponse.topic === "movie-this"){
            inquirer
                .prompt ([
                    {
                    type: "input",
                    message: "What movie would you like to search?",
                    name: "movie",
                    default: "Mr Nobody"
                    }

                ])
                .then(function(inquirerResponse) {
                    var movie = inquirerResponse.movie;
                    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

                    // output: Title, year, IMDB rating, R.T rating, Country produced in, Language, Plot, List of actors.
                    axios.get(queryUrl)
                    .then(function(response){
                        // console.log(response.data);
                        console.log("\nMOVIE TITLE:\n" + response.data.Title);
                        console.log("\nRELEASE YEAR:\n"+ response.data.Year);
                        console.log("\nIMDB Rating:\n" + response.data.imdbRating);
                        console.log("\nROTTEN TOMATOES RATING!: \n" + response.data.Ratings[1].Value);
                        console.log("\nTHE MOVIE WAS PRODUCED IN:\n" + response.data.Country);
                        console.log("\nLANGUAGES USED IN THE MOVIE:\n" + response.data.Language);
                        console.log("\nMOVIE PLOT:\n" + response.data.Plot);
                        console.log("\nLEADING ACTORS/ACTRESSES:\n" + response.data.Actors);
                    })
                })
        }
        // if choice is do-what-it-says
        else if (inquirerResponse.topic === "do-what-it-says"){
            
        }
    });
    







