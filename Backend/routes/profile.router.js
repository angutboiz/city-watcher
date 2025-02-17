const express = require('express')
const {
    getAllProfile,
    getProfile,
    findProfileByManager,
    updateProfile,
    updateRole,
} = require('../controllers/profile.controller')
const {
    authMiddleware,
    checkAdminMiddleware,
} = require('../middleware/authorizationMiddleWare')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API quản lý hồ sơ người dùng
 */

/**
 * @swagger
 * /api/v1/profile/admin:
 *   get:
 *     summary: Lấy danh sách tất cả hồ sơ (Chỉ Admin)
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách hồ sơ người dùng
 */
router.get('/admin', authMiddleware, checkAdminMiddleware, getAllProfile)

/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Lấy hồ sơ cá nhân của người dùng
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin hồ sơ cá nhân
 */
router.get('/', authMiddleware, getProfile)

/**
 * @swagger
 * /api/v1/profile/manager:
 *   get:
 *     summary: Lấy danh sách hồ sơ theo khu vực quản lý (Chỉ Admin)
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách hồ sơ theo khu vực quản lý
 */
router.get(
    '/manager',
    authMiddleware,
    checkAdminMiddleware,
    findProfileByManager
)

/**
 * @swagger
 * /api/v1/profile:
 *   patch:
 *     summary: Cập nhật hồ sơ cá nhân
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               zone:
 *                 type: string
 *                 enum: [Tân Uyên, Thuận An, Dĩ An, Bến Cát, Phú Giáo, Bầu Bàng, Bắc Tân Uyên, Dầu Tiếng, Thủ Dầu Một]
 *               profilePicture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hồ sơ cá nhân đã được cập nhật
 */
router.patch('/', authMiddleware, updateProfile)

/**
 * @swagger
 * /api/v1/profile/role:
 *   patch:
 *     summary: Cập nhật vai trò người dùng (Chỉ Admin)
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               roles:
 *                 type: string
 *                 enum: [user, admin, manager]
 *     responses:
 *       200:
 *         description: Vai trò người dùng đã được cập nhật
 */
router.patch('/role', authMiddleware, checkAdminMiddleware, updateRole)

module.exports = router
