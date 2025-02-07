const express = require('express')
const {
    createCategory,
    getCategories,
    deleteCategory,
    getCategoryById,
    updateCategory,
} = require('../controllers/category.controller')
const {
    checkAdminMiddleware,
} = require('../middleware/authorizationMiddleWare')
const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/', checkAdminMiddleware, createCategory)
router.patch('/:id', checkAdminMiddleware, updateCategory)
router.delete('/:id', checkAdminMiddleware, deleteCategory)

module.exports = router
