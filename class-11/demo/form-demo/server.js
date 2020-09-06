'use strict';

require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3030;

// specify a public directory for accessing static resources
app.use(express.static('./public'));

// Middleware (access the data form (Form Data header))
app.use(express.urlencoded());


// app.get('/getDataFromForm',(req,res)=>{
//     console.log(req.query);
//     // res.status(200).send('okkk');
//     res.redirect('welcome.html');
// })

app.post('/getDataFromForm',(req,res)=>{
    console.log(req.body);
    // res.status(200).send('okkk');
    res.redirect('welcome.html');
})

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})