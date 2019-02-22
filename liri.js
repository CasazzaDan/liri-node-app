require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");
var inquirer = require("inquirer");
var axios = require("axios");

// Action Functions ("spotifyTask", "concertTask", "movieTask")
function concertTask(artist) {

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
        .then(function (response) {

            console.log("\nThe Concert Venue: \n" + response.data[0].venue.name);
            console.log("\nThe Venue Location: \n" + response.data[0].venue.city + ", " + response.data[0].venue.region);

            let showTime = response.data[0].datetime;
            showTime = moment(showTime, "YYYY/MM/DD hh:mm:ss").format("dddd, MMMM Do YYYY, h:mm a");
            console.log("The Concert Date: " + showTime + "\n");

            let newConcert = "\nArtist:   " + artist + "\nThe Concert Venue:   " + response.data[0].venue.name + "\nThe Venue Location:  " + response.data[0].venue.city + "\nThe Concert Date:   " + showTime + "\n";
            fs.appendFile("log.txt", newConcert, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        })
};

function spotifyTask(song) {

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secrect
    });

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("\nArtist:\n" + data.tracks.items[0].artists[0].name);
        console.log("\nSong Name: \n" + data.tracks.items[0].name);
        console.log("\nAlbum Name:\n" + data.tracks.items[0].album.name);
        console.log("\nSpotify Preview Link:\n" + data.tracks.items[0].preview_url + "\n");

        let newSong = "\nArtist:  " + data.tracks.items[0].artists[0].name + "\nSong Name:   " + data.tracks.items[0].name + "\nAlbum Name:   " + data.tracks.items[0].album.name + "\nSpotify Preview Link:    " + data.tracks.items[0].external_urls.spotify + "\n";
        fs.appendFile("log.txt", newSong, function (err) {
            if (err)
                console.log(err)
        })
    })
};

function movieTask(movie) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    // output: Title, year, IMDB rating, R.T rating, Country produced in, Language, Plot, List of actors.
    axios.get(queryUrl)
        .then(function (response) {

            console.log("\nMOVIE TITLE:\n" + response.data.Title);
            console.log("\nRELEASE YEAR:\n" + response.data.Year);
            console.log("\nIMDB Rating:\n" + response.data.imdbRating);
            console.log("\nROTTEN TOMATOES RATING!: \n" + response.data.Ratings[1].Value);
            console.log("\nTHE MOVIE WAS PRODUCED IN:\n" + response.data.Country);
            console.log("\nLANGUAGES USED IN THE MOVIE:\n" + response.data.Language);
            console.log("\nMOVIE PLOT:\n" + response.data.Plot);
            console.log("\nLEADING ACTORS/ACTRESSES:\n" + response.data.Actors + "\n");

            let newMovie = "\nMOVIE TITLE:   " + response.data.Title + "\nRELEASE YEAR:   " + response.data.Year + "\nIMDB Rating:   " + response.data.imdbRating + "\nROTTEN TOMATOES RATING!:   " + response.data.Ratings[1].Value + "\nTHE MOVIE WAS PRODUCED IN:  " + response.data.Country + "\nLANGUAGES USED IN THE MOVIE:    " + response.data.Language + "\nMOVIE PLOT:  " + response.data.Plot + "\nLEADING ACTORS/ACTRESSES:   " + response.data.Actors + "\n";
            fs.appendFile("log.txt", newMovie, function (err) {
                if (err) {
                    return console.log(err);


                }
            });
        })
};
// inquire inputs to seclect what api to call
// "list" "choices"
inquirer
    .prompt([
        {
            type: "list",
            message: "Choose a Topic to Search",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "topic"
        },
    ])
    .then(function (inquirerResponse) {

        // if choice is concert-this 
        if (inquirerResponse.topic === "concert-this") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What artist would you like to search?",
                        name: "artist"
                    },
                ])
                .then(function (inquirerResponse) {

                    concertTask(inquirerResponse.artist);

                })
        }
        // if choice is spotify-this-song     
        // DEFAULT SONG - The Sign by Ace of Base
        else if (inquirerResponse.topic === "spotify-this-song") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What song would you like to search?",
                        name: "song",
                        default: "I'll Be Around, The Spinners"
                    }
                ])
                .then(function (inquirerResponse) {

                    spotifyTask(inquirerResponse.song);
                });
        }
        // if choice is  movie-this   
        // DEFAULT MOVIE - Mr Nobody
        else if (inquirerResponse.topic === "movie-this") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What movie would you like to search?",
                        name: "movie",
                        default: "Mr Nobody"
                    }

                ])
                .then(function (inquirerResponse) {

                    movieTask(inquirerResponse.movie);
                })
        }
        // if choice is do-what-it-says
        else if (inquirerResponse.topic === "do-what-it-says") {

            fs.readFile('random.txt', 'UTF8', function (error, data) {
                if (error) {
                    return console.log(error);
                }
                let dataArray = data.split(",");

                //EACH STATEMENT WORK DEPENDING WHAT IS IN RANDOM.TXT
                if (dataArray[0] === 'spotify-this-song') {
                    spotifyTask(dataArray[1]);
                }
                else if (dataArray[0] === 'concert-this') {
                    concertTask(dataArray[1]);
                }
                else if (dataArray[0] === 'movie-this') {
                    movieTask(dataArray[1]);
                }
            })
        }
    });

