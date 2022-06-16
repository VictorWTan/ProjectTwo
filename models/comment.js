const mongoose = require('./connection')

const {Schema, model} = mongoose

const commentsSchema = new Schema({
    username: {type: Schema.Types.ObjectId, ref: 'User'},
    body: String,
    issue: {type: Schema.Types.ObjectId}, ref: 'Issue',
}, {
    timestamps: true,
})

const Comment = model('Comment', commentsSchema)

module.exports = Comment