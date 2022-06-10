const mongoose = require('./connection')

const {Schema, model} = mongoose

const issuesSchema = new Schema({
    name: {type: String, required: true},
    comments: {type: Schema.Types.ObjectId, ref: 'Comment'},
    createdOn: {type: Date, default: Date.now},
    updatedOn: {type: Date, default: Date.now},
    creator: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Issue = model('Issue', issuesSchema)

module.exports = Issue