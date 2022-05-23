const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    groupName: String,
    noOfQuestions: Number,
    bankName: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
    }],
})

module.exports = mongoose.model('Groups', groupSchema)