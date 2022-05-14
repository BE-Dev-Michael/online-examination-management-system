const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    isVerified: Boolean,
    bank: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Banks'
    }],
    exam: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exams'
    }],
})

module.exports = mongoose.model('Users', userSchema)