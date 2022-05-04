const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
    title: String,
    desc: String,
    timeLimit: Number,
    startDate: Date,
    endDate: Date,
    examCode: String,
    questions: [{ //* For adding questions directly to exam
        //* This is how mongoose sets relationships between collections
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Questions'
    }],
    groups: [{ //* For adding questions by pulling questions from question bank
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
    }],
    isPublished: Boolean
})

module.exports = mongoose.model('Exams', examSchema)