const mongoose = require('mongoose');

const examResultSchema = mongoose.Schema({
    score: Number,
    remark: String,
    percentage: Number,
    timeSpent: String,
    completedDate: String,
    answers: [],
    correctAnswers: [],
    exam: { //* Exam result relationship with exam
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exams'
    },
    student: { //* Exam result relationship with student
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

module.exports = mongoose.model('Result', examResultSchema)