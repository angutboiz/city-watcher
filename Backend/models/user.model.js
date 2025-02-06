const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        reward_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reward',
        },
        notification_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification',
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        displayName: {
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // khi người dùng đăng ký sẽ được gửi mã xác thực, nếu người dùng không xác thực thì không thể sử dụng app
        verify: {
            type: Boolean,
            default: false,
        },
        // khu vực nhà ở của người dùng Bình Dương
        zone: {
            type: String,
            default: 'Tân Uyên',
            enum: [
                'Tân Uyên',
                'Thuận An',
                'Dĩ An',
                'Bến Cát',
                'Phú Giáo',
                'Bầu Bàng',
                'Bắc Tân Uyên',
                'Dầu Tiếng',
                'Thủ Dầu Một',
            ],
        },
        roles: {
            type: String,
            default: 'user',
            required: true,
            enum: ['user', 'admin', 'manager'],
        },
        status: {
            type: Boolean,
            default: true,
        },
        profilePicture: {
            type: String,
            default:
                'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        },
        refreshToken: String, // Lưu refresh token trong DB
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', UserSchema)

// user: người dùng bình thường
// admin: quản trị viên
// manager: người quản lý các sự cố đô thị ở khu vực nhất định
