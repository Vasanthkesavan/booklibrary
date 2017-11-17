const express = require('express');
const bodyParser = require('body-parser');
const Library = require('./db').Library;
const app = express();
const fs = require('fs');
const path = require('path');

app.listen(process.env.PORT || 3000);

/* parse incoming request */
//app.disable('etag');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(path.resolve(__dirname, '../../dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
// });

/* List of Routes */

app.get('/api/saveBooks', saveBooks);
app.get('/api/getBooks', getBooks);


/* Helper functions */

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
    titleAuthor = myArray.shift().split(',');

    if(titleAuthor[0]) {
      if(titleAuthor[1] === undefined) {
        titleAuthor[1] = 'by Homer'
      }
      bookDetails.push({title: titleAuthor[0], author: titleAuthor[1], path: pathStr});
    }
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
    res.status(200).send('saved successfully');
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

