const mongoose = require('./connection')

const {Schema, model} = mongoose

const commentsSchema = new Schema({
    username: {type: Schema.Types.ObjectId, ref: 'User'},
    body: String,
    createdOn: {type: Date, default:Date.now},
    updatedOn: {type: Date, default:Date.now}
})

const Comment = model('Comment', commentsSchema)

module.exports = Comment