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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API xác thực người dùng
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - displayName
 *               - phoneNumber
 *               - email
 *               - password
 *               - zone
 *             properties:
 *               displayName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               phoneNumber:
 *                 type: string
 *                 unique: true
 *               email:
 *                 type: string
 *                 format: email
 *                 unique: true
 *               password:
 *                 type: string
 *               zone:
 *                 type: string
 *                 enum: [Tân Uyên, Thuận An, Dĩ An, Bến Cát, Phú Giáo, Bầu Bàng, Bắc Tân Uyên, Dầu Tiếng, Thủ Dầu Một]
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/register', registerUser)

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Đăng nhập vào hệ thống
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Sai thông tin đăng nhập
 *       500:
 *         description: Lỗi server
 */
router.post('/login', loginUser)

/**
 * @swagger
 * /api/v1/auth/forget:
 *   post:
 *     summary: Yêu cầu đặt lại mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Yêu cầu đặt lại mật khẩu thành công
 *       400:
 *         description: Số điện thoại không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/forget', authMiddleware, forgetUser)

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Đăng xuất khỏi hệ thống
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *       500:
 *         description: Lỗi server
 */
router.post('/logout', authMiddleware, logoutUser)

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Cấp lại access token từ refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Cấp lại token thành công
 *       400:
 *         description: Refresh token không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/refresh-token', authMiddleware, refreshToken)

/**
 * @swagger
 * /api/v1/auth/change-password:
 *   post:
 *     summary: Đổi mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       400:
 *         description: Mật khẩu cũ không đúng
 *       500:
 *         description: Lỗi server
 */
router.post('/change-password', authMiddleware, changePassword)

module.exports = router
