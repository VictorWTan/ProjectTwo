const mongoose = require('./connection')

const {Schema, model} = mongoose

const articlesSchema = new Schema(
    {
        topic: {type: String, index: true}
    }
)