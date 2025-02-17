const ErrorResponse = require('../core/error.response')
const SuccessResponse = require('../core/success.response')
const catchAsync = require('../middleware/catchAsync')
const Notification = require('../models/notification.model')

// Tạo thông báo mới
exports.createNotification = catchAsync(async (req, res) => {
    const { user_id, sender_id, type, link, content } = req.body

    if (!user_id || !sender_id || !type || !content) {
        ErrorResponse.badRequest(res, 'Thông tin không đầy đủ!')
    }

    const newNotification = new Notification({
        user_id,
        sender_id,
        type,
        link,
        content,
    })

    await newNotification.save()
    SuccessResponse.created(
        res,
        'Thông báo được tạo thành công!',
        newNotification
    )
})

// Lấy danh sách thông báo của người dùng
exports.getUserNotifications = catchAsync(async (req, res) => {
    const { id } = req.user

    const notifications = await Notification.find({ user_id: id })
        .populate('sender_id', '_id profilePicture displayName')
        .sort({ created_at: -1 })
        .exec()

    // Đếm số lượng thông báo chưa đọc
    const unreadCount = await Notification.countDocuments({
        user_id: id,
        is_read: false,
    })

    SuccessResponse.ok(res, 'Lấy thông báo thành công', {
        notifications,
        unreadCount,
    })
})

// Đánh dấu thông báo là đã đọc
exports.markAsRead = catchAsync(async (req, res) => {
    const { notificationId } = req.params
    const { id } = req.user

    const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { is_read: true },
        { new: true }
    )

    if (!notification) {
        ErrorResponse.notFound(res, 'Thông báo không tồn tại')
    }

    // Đếm số lượng thông báo chưa đọc
    const unreadCount = await Notification.countDocuments({
        recipient: id,
        is_read: false,
    })

    SuccessResponse.ok(res, 'Đánh dấu thông báo là đã đọc', unreadCount)
})

// Xóa thông báo
exports.deleteNotification = catchAsync(async (req, res) => {
    const { notificationId } = req.params

    const notification = await Notification.findByIdAndDelete(notificationId)

    if (!notification) {
        ErrorResponse.notFound(res, 'Thông báo không tồn tại')
    }

    SuccessResponse.ok(res, 'Xóa thông báo thành công')
})
