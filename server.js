import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import form from './routes/form.js'

dotenv.config();

mongoose.connect(process.env.MONGODB, {
  // Configuration options to remove deprecation warnings, just include them to remove clutter
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

// get the PORT from the environment variables, OR use 4040 as default
const PORT = process.env.PORT || 5050;

// Initialize the Express application
const app = express();

const logging = (request, response, next) => {
  console.log(
    `${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`
  );
  next();
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

app.use("/register", form);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// const port = process.env.PORT || 5050;

// app.use(express.json());


// const mongooseOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   };
  
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB, mongooseOptions)
// .then(() => {
//     // listen for requests
//     const server = app.listen(port, () => {
//       console.log('connected to db & listening on port', port)
//     })
//   })
//   .catch((error) => {
//     console.log(error)
//   })


// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
