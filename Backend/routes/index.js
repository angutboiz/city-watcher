const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const router = express.Router()

const authRoutes = require('./auth.router')
const profileRoutes = require('./profile.router')
const ChatRoutes = require('./chat.router')
const uploadRoutes = require('./upload.router')
const notifyRoutes = require('./notification.router')
const categoryRoutes = require('./category.router')
const incidentRoutes = require('./incident.router')
const { checkAdmin, verifyToken } = require('../middleware/auth.middleware.js')
const swaggerOptions = require('../config/swagger.config')

const swaggerDocs = swaggerJsdoc(swaggerOptions)
// Cấu hình options cho swagger-ui-express
const swaggerUiOptions = {
    customSiteTitle: 'CityWatcher API Documentation',
    swaggerOptions: {
        persistAuthorization: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/assets/favicon.ico',
    swaggerUrl: '/swagger.json',
}

// Sử dụng Swagger UI
router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocs, swaggerUiOptions))
// Thêm các route vào API
router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/profile', profileRoutes)
// router.use('/api/v1/chat', verifyToken, ChatRoutes)
router.use('/api/v1/upload', verifyToken, uploadRoutes)
router.use('/api/v1/notify', verifyToken, notifyRoutes)
router.use('/api/v1/category', verifyToken, categoryRoutes)
router.use('/api/v1/incident', verifyToken, incidentRoutes)

module.exports = router
