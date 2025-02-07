const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const winston = require('winston')

// Tạo thư mục logs nếu chưa tồn tại
const logDirectory = path.join(__dirname, '../logs/')
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory)
}

// Cấu hình Winston để ghi log lỗi
const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDirectory, 'errors.log'),
        }),
    ],
})

// Hàm ghi log lỗi
const logError = (err, req) => {
    errorLogger.error({
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
    })
}

// Cấu hình Morgan để ghi log request
const requestLogStream = fs.createWriteStream(
    path.join(logDirectory, 'requests.log'),
    { flags: 'a' }
)

const requestLogger = morgan(
    ':remote-addr - :method :url :status :res[content-length] - :response-time ms',
    { stream: requestLogStream }
)

module.exports = { logError, requestLogger }
