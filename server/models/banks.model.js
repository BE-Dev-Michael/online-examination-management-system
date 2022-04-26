const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
    title: String,
    questions: {
        question: String,
        choiceA: String,
        choiceB: String,
        choiceC: String,
        choiceD: String,
        answer: String,
        points: Number
    }
})

module.exports = mongoose.model('Banks', bankSchema)