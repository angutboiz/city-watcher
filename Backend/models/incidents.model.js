const mongoose = require('mongoose')
// bảng sự cố
const IncidentsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', //người gửi báo cáo
        },
        reciver_id: {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
            ref: 'User', //người nhận báo cáo để giải quyết vấn đề (admin hoặc manager)
        },
        location: {
            type: String, //kinh độ vĩ độ điểm xảy ra sự cố VD: 11.003140572358017, 106.67487293570176
            required: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category', //loại báo cáo
            required: true,
        },
        comment_id: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: 'Comment',
        },
        title: {
            type: String, //tiêu đề báo cáo
            required: true,
        },
        desc: {
            type: String, //mô tả chi tiết
            required: true,
        },
        status: {
            type: String, //trạng thái báo cáo đang chờ xử lí hoặc đã xử lí
            enum: ['pending', 'resolved', 'rejected', 'deleted', 'seen'], //pending: chờ xử lí, resolved: đã xử lí, rejected: báo cáo không hợp lệ, deleted: bài viết đã bị xóa, seen: báo cáo đã được xem
            default: 'pending',
        },
        severity: {
            type: String, //mức độ nghiêm trọng của báo cáo
            enum: ['low', 'medium', 'high'], //low: thấp, medium: trung bình, high: cao
            default: 'low',
        },
        helpful: {
            type: Number,
            default: 0,
        },
        image: {
            type: [String],
        },
        resolved_content: {
            type: String, // nội dung giải quyết báo cáo
            trim: true,
        },
        is_public: {
            type: Boolean, //báo cáo có công khai không
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Incident', IncidentsSchema)
