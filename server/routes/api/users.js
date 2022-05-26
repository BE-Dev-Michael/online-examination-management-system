const express = require('express');
const router = express.Router();
const { getUser, getAllUsers, signUpUser, verifyUser, loginUser, updateUserData, createDummyUser } = require('../../controllers/users.controller')
const protectRoute = require('../../middleware/auth')

router.get('/user', protectRoute, getUser)
router.get('/', getAllUsers)
router.post('/signup', signUpUser)
router.post('/dummy', createDummyUser)
router.get('/:id/verify/:token', verifyUser)
router.post('/login', loginUser)
router.patch('/:id', updateUserData)

module.exports = router 