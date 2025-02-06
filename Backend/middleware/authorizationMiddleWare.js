const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const ErrorResponse = require('../core/error.response')

// kiểm tra token và lấy thông tin user từ token
const authMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies
    if (!accessToken)
        return ErrorResponse.unauthorized(
            res,
            'Không có Access Token, cần đăng nhập lại'
        )

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) // Xác thực token
        const user = await User.findById(decoded.id)

        req.user = { id: user._id.toString(), role: user.roles }

        next()
    } catch (error) {
        console.log(error)
        ErrorResponse.unauthorized(res, 'Token không hợp lệ')
    }
}

const checkAdminMiddleware = (req, res, next) => {
    if (req.user.role === 'admin') {
        next()
    } else {
        ErrorResponse.forbidden(res, 'Bạn không có quyền truy cập')
    }
}

module.exports = { authMiddleware, checkAdminMiddleware }
