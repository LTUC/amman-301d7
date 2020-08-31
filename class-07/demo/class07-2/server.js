'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('Home Page!');
});

// Route Definitions
app.get('/location', locationHandler);
app.use('*', notFoundHandler);
app.use(errorHandler);


// Route Handlers

function locationHandler(request, response) { 
    let city = request.query.city;
    // let locationData = getLocation(city);
    // console.log(locationData);
    // response.status(200).json(locationData);
    getLocation(city)
    .then(locationData => response.status(200).json(locationData)); 
 
}

function getLocation(city) {
  let key = process.env.GEOCODE_API_KEY;
  const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;
  console.log('-------getting the data');

  return superagent.get(url)
  .then(data => {
    console.log('-------location got recieved');
   const location = new Location(city, data.body);
    return location;
  });

  console.log('------function is over');
}



function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}



function notFoundHandler(request, response) {
  response.status(404).send('huh?');
}

function errorHandler(error, request, response) {
  response.status(500).send(error);
}

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
