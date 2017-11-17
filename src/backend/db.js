const mongoose = require('mongoose');

const dbUri = require('./dbInfo').dbUri;
const Schema = mongoose.Schema;
/* Connecting to the database */

mongoose.connect('mongodb://' + dbUri);

mongoose.connection.once('open', function() {
  console.log('database is connected');
});

mongoose.connection.on('error', function(error) {
  console.log('database connection error: ' + error);
});
/* Library Schema */

const LibrarySchema = new Schema({
  title: { type: String, unique: true },
  author: String,
  path: { type: String, unique: true }
});

/* Model for Schema */

const Library = mongoose.model('Library', LibrarySchema);

module.exports.Library = Library;


