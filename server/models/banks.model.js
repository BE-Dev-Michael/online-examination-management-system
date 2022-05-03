const mongoose = require('mongoose');
const Questions = require('./questions.model');

const bankSchema = mongoose.Schema({
    title: String,
    questions: [{
        //* This is how mongoose sets relationships between collections
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Questions'
    }]
})

module.exports = mongoose.model('Banks', bankSchema)