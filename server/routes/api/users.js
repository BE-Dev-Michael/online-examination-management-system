const express = require('express');
const router = express.Router();
const { getUser, getAllUsers, signUpUser, verifyUser, loginUser, updateUserData, changePassword, updateProfilePicture, createDummyUser } = require('../../controllers/users.controller')
const protectRoute = require('../../middleware/auth')
const upload = require('../../middleware/upload')

router.get('/user', protectRoute, getUser)
router.get('/', getAllUsers)
router.post('/signup', signUpUser)
router.post('/dummy', createDummyUser)
router.get('/:id/verify/:token', verifyUser)
router.post('/login', loginUser)
router.patch('/:id', updateUserData)
router.patch('/change-password/:id', changePassword)
router.patch('/profile-picture/:id', upload.single('picture'), updateProfilePicture)

module.exports = router 