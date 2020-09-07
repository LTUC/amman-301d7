'use strict'

// Application Dependencies
const express = require('express');
const pg = require('pg');

// Environment variables
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.urlencoded({ extended: true }));
// Specify a directory for static resources
app.use(express.static('./public'));

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);

// Set the view engine for server-side templating
app.set('view engine', 'ejs');


// API Routes
app.get('/', getTasks);
// /task/1
app.get('/task/:taskId2',viewDetailsTask);
app.get('/showTaskForm',showForm);
app.post('/addTask',addTaskFunc);


// HELPER FUNCTIONS
function getTasks(request, response) {
  let SQL = `SELECT * FROM tasks;`;
  client.query(SQL)
  .then((results)=>{
    // console.log(results.rows);
    response.render('index',{tasksArr:results.rows})
  })
}

//GET -> ?city=amman (req.query)  // /task/:taskId (req.params)
//POST -> req.body
// app.get('/task/:taskId',viewDetailsTask);
function viewDetailsTask(req,res) {
  let SQL = `SELECT * FROM tasks WHERE id=$1`;
  // console.log(req.params);
  let task_id = req.params.taskId2;
  let values = [task_id];
  client.query(SQL,values)
  .then(results=>{
    // console.log(results.rows);
    res.render('taskDetails',{task: results.rows[0]});

  })
}

function showForm (req,res) {
  res.render('taskFrom');
}

function addTaskFunc(req,res) {
  console.log(req.body);
  // let title = req.body.title;
  // let description = req.body.description;
  // let category = req.body.category;
  // let contact = req.body.contact;
  // let status = req.body.status;
  let {title, description, category, contact, status} = req.body;
  let SQL = `INSERT INTO tasks (title, description, category, contact, status) VALUES ($1,$2,$3,$4,$5);`;
  let safeValues = [title,description,category,contact,status];
  client.query(SQL,safeValues)
  .then(()=>{
    res.redirect('/');
  })
}


app.get('*', (req, res) => {
  res.status(404).send('This route does not exist')
});

function errorHandler(error, request, response) {
  response.status(500).send(error);
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })



