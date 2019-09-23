// Connecting to database

const mongoose = require('mongoose');

// Create data blueprint to mongoDB
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  folder: { type: String, required: false }
});

// export the data model
module.exports = mongoose.model('Post', postSchema);
