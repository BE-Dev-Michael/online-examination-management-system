const express = require('express');
const router = express.Router();
const { getUser, getAllUsers, signUpUser, loginUser } = require('../../controllers/users.controller')

router.get('/:id', getUser)
router.get('/', getAllUsers)
router.post('/signup', signUpUser)
router.post('/login', loginUser)

module.exports = router 