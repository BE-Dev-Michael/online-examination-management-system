const jwt = require('jsonwebtoken')
const Users = require('../models/users.model')

const protectRoute = async (req, res, next) => {
    try {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1]

                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

                // Get user from the token
                req.user = await Users.findOne({_id: decoded._id}).select('-password')
                
                next()
            } catch (error) {
                console.log(error)
                res.status(401).send('Not authorized')
            }
        }

        if (!token) {
            res.status(401).send('No token')
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = protectRoute