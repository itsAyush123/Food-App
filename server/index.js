// Import necessary modules
const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config();

// Connect to the database
const Connection = require('./database/db');
Connection();

// Create an Express application
const app = express();

// Set the port number
const PORT = process.env.PORT || 8000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON bodies of requests
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send("Hello");
});

// Set CORS headers for all routes under /api
app.use('/api', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route handlers
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/Payment"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
