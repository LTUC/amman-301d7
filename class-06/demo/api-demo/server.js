'use strict';

const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

// handle the main route
app.get('/',(request,response)=>{
    response.status(200).send('you are doing great');
});

// localhost:3030/location?city=lynwood
app.get('/location',(req,res)=>{
    const geoData = require('./data/geo.json');
    console.log(geoData);
    const cityData = req.query.city;
    console.log(cityData);
    // {
    //     "search_query": "seattle",
    //     "formatted_query": "Seattle, WA, USA",
    //     "latitude": "47.606210",
    //     "longitude": "-122.332071"
    //   }
    let locationData = new Location(cityData,geoData);
    res.send(locationData);

})

function Location (cityData,geoData) {
    this.search_query=cityData;
    this.formatted_query=geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;

}




app.use('*',(req,res)=>{
    res.status(404).send('NOT FOUND');
})

app.use((error,req,res)=>{
    res.status(500).send(error);
})

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})