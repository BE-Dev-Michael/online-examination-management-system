const mongoose = require('mongoose');
const Banks = require('./banks.model')

const questionSchema = mongoose.Schema({
    question: String,
    choices: [],
    answer: String,
    points: Number,
    bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Banks'
    }
})

module.exports = mongoose.model('Questions', questionSchema)