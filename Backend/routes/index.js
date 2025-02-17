// const express = require('express')

// const router = express.Router()

// const authRoutes = require('./auth.router')
// const profileRoutes = require('./profile.router')
// const ChatRoutes = require('./chat.router')
// const uploadRoutes = require('./upload.router')
// const notifyRoutes = require('./notification.router')
// const categoryRoutes = require('./category.router')
// const incidentRoutes = require('./incident.router')
// const {
//     authMiddleware,
//     checkAdminMiddleware,
// } = require('../middleware/authorizationMiddleWare')

// router.use('/api/v1/auth', authRoutes)
// router.use('/api/v1/profile', profileRoutes)
// // router.use("/api/v1/admin", AdminRoutes);
// router.use('/api/v1/chat', authMiddleware, ChatRoutes)
// router.use('/api/v1/upload', authMiddleware, uploadRoutes)
// router.use('/api/v1/notify', authMiddleware, notifyRoutes)
// router.use('/api/v1/category', authMiddleware, categoryRoutes)
// router.use('/api/v1/incident', authMiddleware, incidentRoutes)

// module.exports = router

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
const {
    authMiddleware,
    checkAdminMiddleware,
} = require('../middleware/authorizationMiddleWare')

// Cấu hình Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Tài liệu API cho ứng dụng của bạn',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], // Chỉ định đường dẫn chứa file route
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

// Sử dụng Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Thêm các route vào API
router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/profile', profileRoutes)
router.use('/api/v1/chat', authMiddleware, ChatRoutes)
router.use('/api/v1/upload', authMiddleware, uploadRoutes)
router.use('/api/v1/notify', authMiddleware, notifyRoutes)
router.use('/api/v1/category', authMiddleware, categoryRoutes)
router.use('/api/v1/incident', authMiddleware, incidentRoutes)

module.exports = router
