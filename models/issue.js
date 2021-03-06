const mongoose = require('./connection')

const {Schema, model} = mongoose

const issuesSchema = new Schema({
    title: {type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    publishedAt: {type: Date, default: Date.now},
    content:{type: String},
    author: {type: String},
    url: {type: String},
    urlToImage: {type: String},
    issue: {type: String, index: true}
})

const Issue = model('Issue', issuesSchema)

module.exports = Issue