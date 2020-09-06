'use strict';

require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    // res.status(200).send('home page');
    //redirect .. render
    res.render('index');
})

app.get('/peopleList',(req,res)=>{
    let people = ['ahmad','mohammad','abed'];
    res.render('list',{data:people}); //key:value
});

app.get('/booksList',(req,res)=>{
    //url+key
    let url = `https://www.googleapis.com/books/v1/volumes?q=cat`;
    superagent.get(url)
    .then(result =>{
        // res.json(result.body);

        res.render('books',{booksArr:result.body.items});
    })
})

function Book (data) {
    // this.url = data.items.url || 'jggj';
}

app.listen(PORT,()=>{
    console.log(`Listening on PORt ${PORT}`);
})
