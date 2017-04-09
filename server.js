const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

const port = 3000;

dotenv.config();

var db;
var MONGO_URI = process.env.MONGOLAB_URI;

// Establish connection to database
MongoClient.connect(MONGO_URI, (err, database) => {
  if(err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log('Listening on port ' + port);
  });
});

app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Get request to get an entry from the database
app.get('/', (req, res) => {
  db.collection('todos').find().toArray((err, result) => {
    if(err) return console.log(err);
    // Serve index.ejs to the client
    res.render('index.ejs', {todos: result})
  });
});

// Post request to add an entry to the database
app.post('/todos', (req, res) => {
  db.collection('todos').save(req.body, (err, result) => {
    if(err) return console.log(err);
    console.log('Added todo to database');
    res.redirect('/');
  });
});

// Put request to modify an entry in the database
app.put('/todos', (req, res) => {
  // Find an entry with category "Work" and change its category and todo
  db.collection('todos').findOneAndUpdate({category: 'Work'}, {
    $set: {
      category: req.body.category,
      todo: req.body.todo
    }
  }, {
    sort: {_id: -1},
    upsert: true  // Adds a new entry if the fetch can't be found
  }, (err, result) => {
    if(err) return res.send(err);
    res.send(result);
  })
});

// Delete request to delete an entry from the database
app.delete('/todos', (req, res) => {
  // Search for an entry by category and delete the first occurence
  db.collection('todos').findOneAndDelete({
    category: req.body.category
  },
  (err, result) => {
    if(err) return res.send(500, err);
    res.send('Removed a todo');
  });
});
