const mongoose = require('mongoose');

const registerTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    token: String,
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 3600 
    }
})

module.exports = mongoose.model('RegisterToken', registerTokenSchema)