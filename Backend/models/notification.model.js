const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người nhận thông báo thường là người dùng
        sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người gửi thông báo: khi manager xác nhận báo cáo, thông báo sẽ có người gửi là manager
        type: {
            type: String,
            enum: ["new_report", "report_approved", "report_rejected", "report_confirmed", "system"],
            required: true,
        }, // Các loại thông báo
        link: {
            type: String, // Đường dẫn tới trang cần đến khi click vào thông báo
        },
        content: {
            type: String, // Nội dung thông báo
            required: true,
            trim: true,
        },
        is_read: {
            type: Boolean, // Trạng thái đã đọc hay chưa
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Notification", NotificationSchema);

// Loại	Ý nghĩa
// "new_report"	Người dùng gửi báo cáo chưa được xem, thông báo cho manager.
// "report_approved"	Manager đã duyệt báo cáo, thông báo cho user.
// "report_rejected"	Báo cáo bị từ chối, thông báo cho user.
// "report_confirmed"	Manager đã xác nhận đã giải quyết vấn đề thành công , , thông báo cho user.
// "system"	Thông báo hệ thống chung, ví dụ: cập nhật, bảo trì.
