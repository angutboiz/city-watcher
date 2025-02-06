const jwt = require('jsonwebtoken')

// Tạo Access Token (hết hạn sau 15 phút)
const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    })
}

// Tạo Refresh Token (hết hạn sau 7 ngày)
const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    })
}

module.exports = { generateAccessToken, generateRefreshToken }
