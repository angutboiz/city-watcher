const express = require('express')
const {
    registerUser,
    loginUser,
    forgetUser,
    changePassword,
    logoutUser,
    refreshToken,
} = require('../controllers/auth.controller')
const { authMiddleware } = require('../middleware/authorizationMiddleWare')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forget', authMiddleware, forgetUser)
router.post('/logout', authMiddleware, logoutUser)
router.post('/refresh-token', authMiddleware, refreshToken)
router.post('/change-password', authMiddleware, changePassword)

module.exports = router
