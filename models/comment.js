const mongoose = require('./connection')

const {Schema, model} = mongoose

const commentsSchema = new Schema({
    username: String,
    body: String,
}, {
    timestamps: true,
})

const Comment = model('Comment', commentsSchema)

module.exports = Comment