const express = require('express')
const {
    uploadImage,
    upload,
    uploadVideo,
} = require('../controllers/upload.controller')
const { verifyToken } = require('../middleware/auth.middleware.js')

const router = express.Router()

router.post('/image', verifyToken, upload.single('image'), uploadImage)
router.post('/video', verifyToken, upload.single('video'), uploadVideo)

module.exports = router
