const mongoose = require('mongoose')

const Schema = mongoose.Schema

const setSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    terms: {
        type: [String],
        required: true
    },
    definitions: {
        type: [String],
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Set', setSchema)

