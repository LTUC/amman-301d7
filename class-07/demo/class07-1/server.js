'use strict';

// Application Dependecies
const express = require('express');
//CORS = Cross Origin Resource Sharing
const cors = require('cors');
//DOTENV (read our enviroment variable)
require('dotenv').config();
const superagent = require('superagent');


// application Setup
const PORT = process.env.PORT || 3030;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
    response.status(200).send('you did a great job');
});

// Route Definitions
app.get('/location', locationHandler);
// app.get('/weather' , weatherHandler);
app.use('*', notFoundHandler);
app.use(errorHandler);


// Route functions
//http://localhost:3000/location?city=Lynnwood
function locationHandler (req, res) {
    const city = req.query.city;
    console.log(city);
    // const geoData = require('./data/geo.json');
    // console.log(geoData);

    let key = process.env.LOCATION_KEY;
    const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;

    console.log('before the superagent');

    superagent.get(url)
    .then(data => {
        console.log('inside the superagent');
        console.log(data.body);
        const locationData = new Location(city, data.body);
        res.send(locationData);
    })
    .catch(()=>{
        errorHandler('something went wrong in etting the data from locationiq web',req,res)
    })

    console.log('after the superagent');

};

function Location(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}

//http://localhost:3000/weather
// function weatherHandler (req,res) {
//   const geoData = require('./data/weatherbit.json');
//   console.log(geoData);
//   var weatherDaily =[];
//   geoData.data.forEach(val =>{
//       var weatherData = new Weather(val);
//       weatherDaily.push(weatherData);
//   });
//   res.send(weatherDaily);
// };

// function Weather(day) {
//   this.forecast = day.weather.description;
//   this.time = new Date(day.datetime).toString().slice(0,15);
// }

function notFoundHandler (req, res) {
    res.status(404).send('Not Found');
};

function errorHandler (error, req, res) {
    res.status(500).send(error);
};

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
