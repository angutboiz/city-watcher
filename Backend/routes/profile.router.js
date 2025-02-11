const express = require('express')
const {
    getAllProfile,
    getProfile,
    findProfileByName,
    getProfileById,
    updateProfile,
    sendMail,
    checkOTP,
    findProfileByManager,
    updateRole,
} = require('../controllers/profile.controller')
const {
    authMiddleware,
    checkAdminMiddleware,
} = require('../middleware/authorizationMiddleWare')
const router = express.Router()

router.get('/admin', authMiddleware, checkAdminMiddleware, getAllProfile)
// router.get('/sendmail', authMiddleware, sendMail)
// router.post('/checkotp', authMiddleware, checkOTP)
router.get('/', authMiddleware, getProfile)
router.get(
    '/manager',
    authMiddleware,
    checkAdminMiddleware,
    findProfileByManager
)
// router.get('/findbyname/:text', authMiddleware, findProfileByName)
// router.get('/:uid', getProfileById)
router.patch('/', authMiddleware, updateProfile)
router.patch('/role', authMiddleware, checkAdminMiddleware, updateRole)

module.exports = router
