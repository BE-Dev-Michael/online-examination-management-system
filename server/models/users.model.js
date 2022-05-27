const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    fullName: { type: String, default: ''},
    picture: { type: String, default: 'placeholder.png'},
    password: String,
    role: String,
    isVerified: Boolean,
    bank: [{ //* Faculty relationship to question banks
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Banks'
    }],
    exam: [{ //* Faculty relationship to exam
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exams'
    }],
    studentExam: [{ //* Student relationship to exam
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exams'
    }],
    result: [{ //* Student relationship to exam result
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    }]
})

module.exports = mongoose.model('Users', userSchema)