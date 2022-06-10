// Require Dependencies
const mongoose = require("./connection")

// Taking schema and model from mongoose
const { Schema, model } = mongoose

// Create user Schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

// Creating a user model
const User = model("User", userSchema)

module.exports = User