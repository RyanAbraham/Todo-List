const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('link-to-mongodb', (err, database) => {
  // Start server
});

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
  console.log('listening on 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/add-todo', (req, res) => {
  console.log(req.body);
});

