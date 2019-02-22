# Liri-node-app

This is a command line application that allows us to find information on either a song, a movie, or a musicians upcoming concert. The app uses spotify API, OMDB API and Bands in Town API to compiles the data and cleanly displays it in terminal.

## Demo

Start the app by running

```
node liri.js 
```
The following prompt should appear

![start prompt](/images/startPrompt.png)

Using the arrow keys you are able to choose what topic you would like to search, just press *ENTER* when you made your choice.

## concert-this
This is a function that will take a Artist/Band input and return with the next upcoming concert from that Artist/Band.
When you select this option you will be presented with another prompt to input the Artist/Band you want to search.

![concert](/images/concertSearch.png)

## spotify-this
This is a function that will take a Song input and return Title, Artist, Album, and a Preview Link for that song.
Same as the concert function, you will be prompt to input a song name.
If you can't think of a song, it will default search "I'll Be Around" by The Spinners by simply pressing ENTER.

![spotify](/images/spotifySearch.png)

For the demo I did not use the default and search "Tiny Dancer" instead.

## movie-this
This function like the others will prompt you to input a movie title, which it will then return a whole list of info about that movie.
This also has a default search of "Mr. Nobody"

![movie1](/images/movie1.png)

![movie2](/images/movie2.png)

![movie3](/images/movie3.png)

## do-what-it-says
This function will take 2 arguments from a text file and use the nessecary function to find the desired information.

![whatItSays](/images/whatItSays.png)


### Each search is also logged to another text to track search history.

## Built With

* node.js
* Request
* Moment
* Node Spotify API
* Bands in Town Events API
* OMDB API