const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(conn.connection.host)
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDatabase