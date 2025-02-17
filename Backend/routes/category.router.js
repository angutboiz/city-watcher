const express = require('express')
const {
    createCategory,
    getCategories,
    deleteCategory,
    getCategoryById,
    updateCategory,
} = require('../controllers/category.controller')
const { checkAdmin, verifyToken } = require('../middleware/auth.middleware.js')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API quản lý danh mục sự cố
 */

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Lấy danh sách danh mục sự cố
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Danh sách các danh mục
 */
router.get('/', getCategories)

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một danh mục
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục cần lấy
 *     responses:
 *       200:
 *         description: Thông tin danh mục
 */
router.get('/:id', getCategoryById)

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Tạo danh mục mới (Chỉ Admin)
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên danh mục
 *               desc:
 *                 type: string
 *                 description: Mô tả danh mục
 *     responses:
 *       201:
 *         description: Danh mục được tạo thành công
 */
router.post('/', checkAdmin, createCategory)

/**
 * @swagger
 * /api/v1/category/{id}:
 *   patch:
 *     summary: Cập nhật danh mục (Chỉ Admin)
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên danh mục mới
 *               desc:
 *                 type: string
 *                 description: Mô tả danh mục mới
 *     responses:
 *       200:
 *         description: Danh mục được cập nhật thành công
 */
router.patch('/:id', checkAdmin, updateCategory)

/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Xóa danh mục (Chỉ Admin)
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục cần xóa
 *     responses:
 *       200:
 *         description: Danh mục được xóa thành công
 */
router.delete('/:id', checkAdmin, deleteCategory)

module.exports = router
