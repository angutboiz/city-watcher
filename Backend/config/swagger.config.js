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
            {
                url: 'https://city-watcher.vercel.app',
                description: 'Production server',
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
module.exports = swaggerOptions
