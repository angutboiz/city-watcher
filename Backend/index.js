const express = require('express')
const cors = require('cors')
const { requestLogger } = require('./core/logger')
const errorHandler = require('./middleware/errorHandler')

const connectDB = require('./config/db')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const ErrorResponse = require('./core/error.response')

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

// dùng để log ra các request đến server
app.use(morgan('dev'))

// dùng để mã hóa body của request, bảo vệ dữ liệu
app.use(helmet())

// dùng để nén dữ liệu trước khi gửi về client
app.use(compression())

// Middleware ghi lại request của người dùng xuống file requests.log
app.use(requestLogger)

app.use(require('./routes/index'))

// Middleware bắt route không tồn tại
app.use((req, res, next) => {
    next(
        new ErrorResponse(
            404,
            `Cannot ${req.method} ${req.originalUrl} - Route not found`
        )
    )
})

// Middleware xử lý lỗi
app.use(errorHandler)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
