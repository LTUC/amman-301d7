'use strict'

// Application Dependencies
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');

// Environment variables
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.urlencoded({ extended: true }));
// Specify a directory for static resources
app.use(express.static('./public'));
app.use(methodOverride('_method'));

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
app.put('/updateTask/:taskID',updateTask);
app.delete('/deleteTask/:taskID',deleteTask);


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

function updateTask (req,res) {
  // collect the data from the form
  // update the DB with the new collected data
  // redirect to the same page
  let {title, description, category, contact, status} = req.body;
  let SQL = `UPDATE tasks SET title=$1,description=$2,category=$3,contact=$4,status=$5 WHERE id=$6;`;
  let safeValues = [title, description, category, contact, status,req.params.taskID];
  client.query(SQL,safeValues)
  .then(()=>{
    res.redirect(`/task/${req.params.taskID}`);
  })
}


// app.delete('/deleteTask/:taskID',deleteTask);
function deleteTask (req,res) {
  let SQL = `DELETE FROM tasks WHERE id=$1;`;
  let values = [req.params.taskID];
  client.query(SQL,values)
  .then(()=>{
    res.redirect('/')
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



