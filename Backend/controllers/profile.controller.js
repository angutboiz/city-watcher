const ErrorResponse = require('../core/error.response')
const SuccessResponse = require('../core/success.response')
const catchAsync = require('../middleware/catchAsync')
const User = require('../models/user.model')
// const HTML_TEMPLATE = require('../services/html-template')
// const SENDMAIL = require('../services/mail')
const getAllProfile = catchAsync(async (req, res) => {
    const user = await User.find()
        .sort({ created_at: -1 })
        .select('-password')
        .populate('displayName profilePicture')
    if (!user) {
        return ErrorResponse.notFound(
            res,
            'Không tìm thấy danh sách người dùng!'
        )
    }
    return SuccessResponse.ok(res, 'Lấy danh sách người dùng thành công!', user)
})

const getProfile = catchAsync(async (req, res) => {
    const { id } = req.user
    const user = await User.findById(id)
        .select('-password')
        .populate('displayName profilePicture')
    if (!user) {
        return ErrorResponse.notFound(res, 'Người dùng không tìm thấy')
    }
    return SuccessResponse.ok(res, 'Lấy thông tin thành công!', user)
})

const findProfileByManager = catchAsync(async (req, res) => {
    // Sử dụng $regex để tìm kiếm gần đúng và $options: 'i' để không phân biệt chữ hoa thường
    const managers = await User.find({
        roles: 'manager',
    })
        .select('-password')
        .populate('displayName profilePicture')
    if (!managers) {
        return ErrorResponse.notFound(res, 'Không tìm thấy người quản lý!')
    }
    return SuccessResponse.ok(res, 'Lấy thông tin người quản lý thành công!', {
        managers,
    })
})

const updateProfile = catchAsync(async (req, res) => {
    const { status, profilePicture, verify, displayName } = req.body
    const { id } = req.user
    const updateFields = {} // Tạo đối tượng rỗng để chứa các trường cần cập nhật

    const user = await User.findById(id)

    if (!user) {
        return ErrorResponse.notFound(res, 'Người dùng không tồn tại')
    }

    if (displayName !== undefined) updateFields.displayName = displayName
    if (profilePicture !== undefined)
        updateFields.profilePicture = profilePicture
    if (verify !== undefined) updateFields.verify = verify
    if (role !== undefined) updateFields.role = role
    if (status !== undefined) updateFields.status = status

    const update_profile = await User.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
    )
    if (!update_profile) {
        return ErrorResponse.badRequest(
            res,
            'Cập nhật thông tin không thành công'
        )
    }
    return SuccessResponse.ok(res, 'Cập nhật thành công', update_profile)
})
const updateRole = catchAsync(async (req, res) => {
    const { id, roles } = req.body
    if (!id || !roles)
        return ErrorResponse.notFound(res, 'Vui lòng điền đủ thông tin!')
    console.log(roles)
    const updateRole = await User.findByIdAndUpdate(
        id,
        { $set: { roles: roles } },
        { new: true }
    )
    if (!updateRole) {
        return ErrorResponse.badRequest(res, 'Cập nhật quyền không thành công')
    }
    return SuccessResponse.ok(res, 'Cập nhật quyền thành công', updateRole)
})
module.exports = {
    getAllProfile,
    getProfile,
    findProfileByManager,
    updateProfile,
    updateRole,
}
