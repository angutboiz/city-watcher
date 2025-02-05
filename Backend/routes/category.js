const express = require('express')
const {
    createCategory,
    getCategories,
    deleteCategory,
    getCategoryById,
    updateCategory,
} = require('../controllers/categoryController')
const {
    checkAdminMiddleware,
} = require('../middleware/authorizationMiddleWare')
const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/', createCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
