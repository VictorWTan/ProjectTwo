// Require dependencies
require('dotenv').config()
const mongoose = require('mongoose')

// Set up database connection
const MONGODB_URI = process.env.MONGODB_URI;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(MONGODB_URI, CONFIG);

// When the connection opens, closes, or errors, log them
mongoose.connection
.on("open", () => console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error));

module.exports = mongoose