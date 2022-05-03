const mongoose = require('mongoose');
const Banks = require('./banks.model')

const questionSchema = mongoose.Schema({
    question: String,
    choiceA: String,
    choiceB: String,
    choiceC: String,
    choiceD: String,
    answer: String,
    points: Number,
    bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Banks'
    }
})

module.exports = mongoose.model('Questions', questionSchema)