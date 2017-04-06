const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

var db;
var MONGO_URI = process.env.MONGOLAB_URI;

MongoClient.connect(MONGO_URI, (err, database) => {
  if(err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('Listening on 3000');
  });
});

app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  db.collection('todos').find().toArray((err, result) => {
    if(err) return console.log(err);
    res.render('index.ejs', {todos: result})
  });
});

app.post('/add-todo', (req, res) => {
  db.collection('todos').save(req.body, (err, result) => {
    if(err) return console.log(err);
    console.log('Added todo to database');
    res.redirect('/');
  });
});

