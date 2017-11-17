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
app.post('/api/getBookContents', getBookContents);

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

function cleanString(input) {
  var output = "";
  for (var i=0; i<input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
  }
  return output;
}

function forHomer(str) {
  for(let j = 0; j < str.length; j++) {
    if(str[j] === 'Homer') {
      return true;
    }
  }
  return false;
}

function aliceCheck(title) {
  title = title.join('').split(' ');

  for(let i = 0; i < title.length; i++) {
    if(title[i] === 'Wonderland') {
      return true;
    }
  }
  return false;
}
function forAlice(title) {
  if(aliceCheck(title)) {
    for(let i = 0; i < title.length; i++) {
      if(title[i] === '’') {
        return true;
      }
    }
  }
  return false;
};

function getBookContents(req, res) {
  let bookTitle1 = cleanString(req.body[0].replace("\r", "").replace("\n", "").split(' ').join(' ').split(' ').join('')).trim();
  let bookTitle2 = cleanString(req.body[1].replace("\r", "").replace("\n", "").split(' ').join(' ').split(' ').join('')).trim();
  let bookTitle3 = cleanString(req.body[2].replace("\r", "").replace("\n", "").split(' ').join(' ').split(' ').join('')).trim();

  Library.find({}, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      let path = [];

      for(let i = 0; i < data.length; i++) {
        if(forHomer(data[i]['title'].split(' '))) {
          let str = data[i]['title'].split(' ');
          str.splice(-2, 2);
          str = str.join(' ');
          data[i]['title'] = str;
        }
        if(forAlice(data[i]['title'].split(''))) {
          let str = data[i]['title'].split('');
          for(let i = 0; i < str.length; i++) {
            if(str[i] === '’') {
              str[i] = "'";
            }
          }
          data[i]['title'] = str.join('');
        }
        if(cleanString(data[i]['title'].split(' ').join('').split(' ')[0]) === bookTitle1) {
          console.log('YES')
          path.push(data[i]['path']);
        }
        if(cleanString(data[i]['title'].split(' ').join('').split(' ')[0]) === bookTitle2) {
          path.push(data[i]['path']);
        }
        if(cleanString(data[i]['title'].split(' ').join('').split(' ')[0]) === bookTitle3) {
          path.push(data[i]['path']);
        }
      }
      res.send(JSON.stringify(path))
    }
  })
}
