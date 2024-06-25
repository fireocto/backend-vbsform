require('dotenv').config()
const express = require('express');
const app = express();
const port = 5050;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, mongooseOptions)
.then(() => {
    // listen for requests
    const server = app.listen(port, () => {
      console.log('connected to db & listening on port', port)
    })
  })
  .catch((error) => {
    console.log(error)
  })


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
