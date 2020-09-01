'use strict';

//load the dependencies
const express = require('express');
// Load Environment Variables from the .env file
require('dotenv').config(); 
const cors = require('cors');
// prepare the connection between the postgres server and the express server
//pg: npm library that allows us to connect to POSTGRES server
const pg = require('pg');

//Application setup
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);

// client.connect();

// ROUTES
app.get('/test', testHandler);
app.get('/people', getAllPeople);
app.get('/add', addPeople);
app.get('/delete',deletePeople);
app.use('*', notFoundHandler); // Error Handler
app.use(errorHandler);

function testHandler (request, response) {
    response.status(200).send('ok'); 
};

// localhost:3000/people
function getAllPeople(req,res) {
    let SQL = `SELECT * FROM people`;
    client.query(SQL)
    .then(results =>{
        res.status(200).json(results.rows);
    })
    .catch (error => errorHandler(error,req,res))
}

//localhost:3000/people?last=quran
// function getAllPeople(req,res) {
//     let SQL = `SELECT * FROM people WHERE last_name=$1;`;
//     let lastName = req.query.last;
//     let safeValue = [lastName];
//     client.query(SQL,safeValue)
//     .then(results =>{
//         res.status(200).json(results.rows);
//     })
//     .catch (error => errorHandler(error,req,res))
// }

//localhost:3000/add?first=aya&last=aqrabawi
function addPeople (req,res) {
    console.log(req.query);
    let firstName = req.query.first;
    let lastName = req.query.last;
    let safeValues = [firstName,lastName]
    // let SQL =  `INSERT INTO people VALUES ($1,$2);`;
    let SQL =  `INSERT INTO people (first_name,last_name) VALUES ($1,$2);`;
    client.query(SQL,safeValues)
    .then(results=>{
        // res.status(200).send(results);
        res.status(200).send('your data has been added successfully')
    })
    .catch (error => errorHandler(error,req,res))

}

//localhost:3000/delete?last=quran
function deletePeople(req,res) {
    let lastName = req.query.last;
    let SQL = `DELETE FROM people WHERE last_name=$1;`
    let safeValue = [lastName];
    client.query(SQL,safeValue)
    .then (()=>{
        res.status(200).send('your data has been deleted successfully')
    })
    .catch(error => errorHandler(error,req,res))
}

function notFoundHandler(request,response) { 
    response.status(404).send('huh????');
}

function errorHandler(error, request, response) {
    response.status(500).send(error);
}

client.connect()
.then(()=>{
    app.listen(PORT, () =>
    console.log(`listening on ${PORT}`)
    );
})


