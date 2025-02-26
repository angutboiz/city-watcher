const jwt = require('jsonwebtoken')
const validator = require('validator')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const HTML_TEMPLATE = require('../services/html-template')
const {
    sendForgetPasswordMail,
    sendOTPMail,
} = require('../services/nodemailer')

const {
    generateAccessToken,
    generateRefreshToken,
} = require('../utils/generateToken')
const SuccessResponse = require('../core/success.response')
const ErrorResponse = require('../core/error.response')
const catchAsync = require('../middleware/catchAsync')

const registerUser = catchAsync(async (req, res) => {
    const { email, password, zone } = req.body
    if (!email || !password) {
        return ErrorResponse.badRequest(
            res,
            'Vui lòng không bỏ trống tên, email, password'
        )
    }

    if (!validator.isEmail(email)) {
        return ErrorResponse.badRequest(res, 'Email không hợp lệ')
    }
    let isEmail = await User.findOne({ email }).lean()
    if (isEmail) return ErrorResponse.badRequest(res, 'Email đã được sử dụng')

    // let isPhone = await User.findOne({ phoneNumber }).lean()
    // if (isPhone)
    //     return ErrorResponse.badRequest(res, 'Số điện thoại đã được sử dụng')

    if (password.length < 6) {
        return res.status(400).json({ message: 'Mật khẩu phải trên 6 kí tự' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    //   tạo ngẫu nhiên mã otp
    const otp = Math.floor(100000 + Math.random() * 900000)

    const newUser = new User({
        // displayName,
        // phoneNumber,
        email,
        password: hashedPassword,
        zone: zone.value,
        otp,
        expire_otp: Date.now() + 1000 * 60 * 10, // thời hạn 10 phút
    })

    // tạo token
    const accessToken = generateAccessToken(newUser._id)
    const refreshToken = generateRefreshToken(newUser._id)

    // lưu refresh token vào db
    newUser.refreshToken = refreshToken

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })

    await newUser.save()
    await sendOTPMail(newUser)

    return SuccessResponse.created(res, 'Đăng ký thành công', {
        accessToken,
        refreshToken,
        newUser,
    })
})

const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    if (!email && !password) {
        return ErrorResponse.badRequest(res, 'Vui lòng điền đẩy đủ')
    }

    let user = await User.findOne({ email })

    if (!user) {
        return ErrorResponse.notFound(res, 'Người dùng không tồn tại')
    }

    if (!user.status) {
        return ErrorResponse.badRequest(res, 'Tài khoản chưa xác thực OTP')
    }
    //Nhớ mở lại
    // if (!user.verify) {
    //     return ErrorResponse.unauthorized(
    //         res,
    //         'Tài khoản chưa được xác thực, vui lòng kiểm tra email của bạn'
    //     )
    // }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch || !user) {
        return ErrorResponse.badRequest(
            res,
            'Tài khoản hoặc mật khẩu không đúng'
        )
    }

    // tạo token
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    // lưu refresh token vào db
    user.refreshToken = refreshToken
    await user.save()

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })

    return SuccessResponse.ok(res, 'Đăng nhập thành công', {
        accessToken,
        refreshToken,
        user,
    })
})

// Refresh Token để cấp lại Access Token mới
const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.body
    console.log('refreshToken:::', refreshToken)
    if (!refreshToken)
        return ErrorResponse.unauthorized(res, 'Không có Refresh Token')

    const user = await User.findOne({ refreshToken })
    if (!user)
        return ErrorResponse.unauthorized(res, 'Refresh Token không hợp lệ')

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err)
                ErrorResponse.unauthorized(res, 'Refresh Token không hợp lệ')

            const newAccessToken = generateAccessToken(decoded.id)
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })
            SuccessResponse.ok(
                res,
                'Cấp lại Access Token thành công',
                newAccessToken
            )
        }
    )
})

// Đăng xuất
const logoutUser = catchAsync(async (req, res) => {
    const { refreshToken } = req.body

    const user = await User.findOne({ refreshToken })
    if (user.refreshToken !== refreshToken) {
        return ErrorResponse.unauthorized(
            res,
            'Refresh Token không hợp lệ, không thể đăng xuất'
        )
    }

    user.refreshToken = null
    await user.save()
    res.cookie('accessToken', '', { httpOnly: true, expires: new Date(0) })
    res.cookie('refreshToken', '', { httpOnly: true, expires: new Date(0) })
    SuccessResponse.ok(res, 'Đăng xuất thành công')
})

const forgetUser = catchAsync(async (req, res) => {
    const { email } = req.body
    console.log(email)
    if (!email) {
        return ErrorResponse.badRequest(res, 'Vui lòng điền email của bạn')
    }

    let user = await User.findOne({ email })
    if (!user) {
        return ErrorResponse.badRequest(res, 'Email không tồn tại')
    }

    if (!user.status) {
        return ErrorResponse.unauthorized(res, 'Tài khoản đã bị khoá')
    }

    const new_password = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(new_password, 10)
    user.password = hashedPassword
    await user.save()

    await sendForgetPasswordMail(user, new_password)

    return SuccessResponse.ok(
        res,
        'Gửi thành công, vui lòng kiểm tra email của bạn'
    )
})

const changePassword = catchAsync(async (req, res) => {
    const { old_password, new_password, re_new_password } = req.body
    const { id } = req.user
    if (!old_password || !new_password || !re_new_password) {
        return ErrorResponse.badRequest(res, 'Vui lòng điền đẩy đủ')
    }

    if (new_password !== re_new_password) {
        return ErrorResponse.badRequest(res, 'Mật khẩu mới không trùng khớp')
    }

    if (new_password.length < 6) {
        return ErrorResponse.badRequest(res, 'Mật khẩu phải trên 6 kí tự')
    }

    let user = await User.findById(id)
    if (!user) {
        return ErrorResponse.notFound(res, 'Tài khoản đã bị khoá')
    }

    if (!user.status) {
        return ErrorResponse.forbidden(res, 'Tài khoản đã bị khoá')
    }

    const isMatch = await bcrypt.compare(old_password, user.password)

    //kiểm tra xem mật khẩu mới có trùng với mật khẩu hiện tại hay không
    const isMatchNew = await bcrypt.compare(new_password, user.password)
    if (isMatchNew) {
        return ErrorResponse.unauthorized(
            res,
            'Mật khẩu mới không được trùng với mật khẩu cũ'
        )
    }

    if (!isMatch) {
        return ErrorResponse.unauthorized(res, 'Mật khẩu cũ không đúng')
    }

    const hashedPassword = await bcrypt.hash(new_password, 10)
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)
    user.password = hashedPassword
    user.refreshToken = refreshToken

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })

    await user.save()
    return SuccessResponse.ok(res, 'Cập nhật mật khẩu thành công', {
        accessToken,
        refreshToken,
        user,
    })
})

const checkOTP = catchAsync(async (req, res) => {
    const { otp } = req.body
    const { id } = req.user

    if (!otp) {
        return ErrorResponse.badRequest(res, 'Vui lòng điền mã OTP')
    }
    const findUser = await User.findById(id).lean()

    if (!findUser) {
        return ErrorResponse.badRequest(res, 'Email không tồn tại')
    }

    if (findUser.otp != otp)
        return ErrorResponse.badRequest(res, 'Mã OTP không đúng')

    findUser.status = true
    await findUser.save()
    return SuccessResponse.ok(res, 'Xác thực thành công')
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    forgetUser,
    changePassword,
    checkOTP,
}
