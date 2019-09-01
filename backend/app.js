// Connecting to remote mongoDB with mongooseand define the db access
// functions.
const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/posts');
const mongoose = require('mongoose');

const app = express();
// Connect to mongoDb
mongoose
.connect("mongodb+srv://sun:omri1234@cluster0-b9vlj.mongodb.net/MEAN?retryWrites=true&w=majority")
.then(() => {
  console.log("Connection to database successfull");
}).catch(() => {
  console.log("Connection to database failed");
});

// Use the json parsing of body parser
app.use(bodyParser.json());

// Define CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
   "*");
   res.setHeader("Access-Control-Allow-Methods",
   "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

// Add a new post
app.post('/api/posts',(req, res, next) => {
  // A new field added by body parser
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // write post to db
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'success',
      postId: createdPost._id
    });
  });
});

// Get posts from DB
app.get('/api/posts',(req, res, next) => {
  // Get all posts
  Post.find().then(documents => {
    res.status(200).json(
      {message: 'success',
      posts: documents});
     });
});

// Delete one post by id
app.delete("/api/posts/:id", (req, res, next) => {
  // Delete a post from db
  Post.deleteOne({_id: req.params.id})
  .then(result => {
    res.status(200).json({message: 'posts deleted!!'});
  })
});

module.exports = app;
