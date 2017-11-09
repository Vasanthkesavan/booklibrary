const bodyParser = require('body-parser');
const express = require('express');
const Library = require('./db').Library;
const app = express();
const fs = require('fs');

app.listen(process.env.PORT || 3000);
// app.use(express.static(path.join(__dirname, 'dist')));

/* parse incoming request */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* List of Routes */

app.get('/api/saveBooks', saveBooks);
app.get('/api/getBooks', getBooks);

/* Helper functions */

function ltrim(str) {
  if(str === null) return null;
  return str.replace(/^\s+/g, '');
}

function saveToDatabase(obj) {
  let book = new Library(obj);
  book.save((err) => console.log(err));
}

function parseBook(pathStr) {
  let bookDetails = [];
  let myArray = [];
  let titleAuthor;

  let rl = require('readline').createInterface({
    input: require('fs').createReadStream(pathStr)
  });

  rl.on('line', function (line) {
    myArray.push(line);
  });

  rl.on('close', function () {
    titleAuthor = myArray.shift();
    bookDetails.push({title: titleAuthor.split(',')[0], author: titleAuthor.split(',')[1], path: pathStr});
    saveToDatabase(bookDetails[0]);
  });

}


/* callback functions */

function saveBooks(req, res) {
  let pathArray = [];

  /* display all the file in the given path */
  fs.readdir('./src/backend/books', (err, files) => {
    files.forEach(file => {
      pathArray.push('./src/backend/books/' + file);
    });

    for(let i = 0; i < pathArray.length; i++) {
      parseBook(pathArray[i]);
    }
    res.send('saved successfully');
  });
}

function getBooks(req, res) {
  Library.find({}, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.send(data);
    }
  })
}
