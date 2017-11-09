const bodyParser = require('body-parser');
const express = require('express');
const db = require('./db').mongoose;
const app = express();
const fs = require('fs');
const path = require('path');

app.listen(process.env.PORT || 3001);
// app.use(express.static(path.join(__dirname, 'dist')));

/* parse incoming request */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* List of Routes */
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/api/saveBooks', saveBooks);

/* callback functions */

function saveBooks(req, res) {
  let bookArray;
  console.log(process.cwd());
  bookArray = fs.readFileSync('./src/backend/books/11-0.txt', 'utf-8');

  res.send(JSON.stringify(bookArray[1]));
}
