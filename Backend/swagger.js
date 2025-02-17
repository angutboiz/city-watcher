const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'My API',
        description: 'Tài liệu API tự động cập nhật với swagger-autogen',
        version: '1.0.0',
    },
    host: 'localhost:5000', // Chỉnh sửa theo server thực tế
    schemes: ['http'], // Hoặc ['https'] nếu có SSL
    basePath: '/',
    consumes: ['application/json'],
    produces: ['application/json'],
}

const outputFile = './swagger-output.json' // File JSON Swagger
const endpointsFiles = ['./routes/index.js'] // Chỉ định các file chứa route

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log('Swagger file generated!')
})
