const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    isVerified: Boolean
})

module.exports = mongoose.model('Users', userSchema)