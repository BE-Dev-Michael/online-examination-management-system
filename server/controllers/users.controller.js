const argon2 = require('argon2');
const Users = require('../models/users.model')
//* HTTP Method => GET
//* Route endpoint => /api/users/:id
const getUser = (req, res) => {
    console.log('Get user')
    res.send('Get user')
}

//* HTTP Method => GET
//* Route endpoint => /api/users/all
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find({}, 'email username')
        res.send(allUsers)
    } catch (error) {
        console.error(error)
    }
}

//* HTTP Method => POST
//* Route endpoint => /api/users/signup
const signUpUser = async (req, res) => {
    const { username, email, password, role } = req.body
    try {
        const hashedPword = await argon2.hash(password, { type: argon2.argon2id })
        console.log(hashedPword)
        const response = await Users.create({
            username: username,
            email: email,
            password: hashedPword,
            role: role
        })
        console.log(response)
    } catch (error) {
        console.error(error)
    }
    res.send('Registered!')
}

//* HTTP Method => POST
//* Route endpoint => /api/users/login
const loginUser = (req, res) => {
    console.log('Login user')
    res.send('Login')
}


module.exports = { getUser, getAllUsers, signUpUser, loginUser }