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
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exams'
    },
    kd: String,
    cpd: String
})

module.exports = mongoose.model('Questions', questionSchema)