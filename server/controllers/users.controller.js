const argon2 = require('argon2');
const crypto = require('crypto');
const Users = require('../models/users.model')
const RegisterToken = require('../models/token.model')
const sendEmail = require('../utils/sendEmail');

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
    console.log(req.body);
    try {
        const hashedPword = await argon2.hash(password, { type: argon2.argon2id })
        console.log(hashedPword)
        const userData = await Users.create({
            username: username,
            email: email,
            password: hashedPword,
            role: role,
            isVerified: false
        })

        //* Generate user registration token
        const token = await RegisterToken.create({
            userId: userData._id,
            token: crypto.randomBytes(32).toString("hex")
        })
        //* Url for verifying user account
        const verificationUrl = `${process.env.BASE_URL}/api/users/${userData.id}/verify/${token.token}`;
        //* Function for sending email verification
        await sendEmail(userData.email, 'Verify your email', verificationUrl)

        res.send('A verification email was sent to your email address.')
        
    } catch (error) {
        console.error(error)
    }
}

const verifyUser = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid url" });

        const token = await RegisterToken.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid url" });

        await Users.updateOne({ _id: user._id, isVerified: true });
        await token.remove();
        console.log('Email verification is successful')
        res.status(200).send("Email verification is successful");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//* HTTP Method => POST
//* Route endpoint => /api/users/login
const loginUser = (req, res) => {
    console.log('Login user')
    res.send('Login')
}


module.exports = { getUser, getAllUsers, signUpUser, verifyUser, loginUser }