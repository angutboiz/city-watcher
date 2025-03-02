// Backend/models/incidents.model.js
const mongoose = require('mongoose');

// Định nghĩa schema cho sự cố
const IncidentsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // người gửi báo cáo
        },
        reciver_id: {
            type: String,
            ref: 'User', // người nhận báo cáo để giải quyết vấn đề (admin hoặc manager)
        },
        location: {
            type: {
                type: String,
                enum: ['Point'], // chỉ định loại là Point
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
                validate: {
                    validator: function (coordinates) {
                        return (
                            coordinates.length === 2 &&
                            coordinates[0] >= -180 &&
                            coordinates[0] <= 180 &&
                            coordinates[1] >= -90 &&
                            coordinates[1] <= 90
                        );
                    },
                    message: 'Tọa độ không hợp lệ!',
                },
            },
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category', // loại báo cáo
            required: true,
        },
        comment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
        title: {
            type: String, // tiêu đề báo cáo
            required: true,
        },
        desc: {
            type: String, // mô tả chi tiết
            required: true,
        },
        status: {
            type: String, // trạng thái báo cáo đang chờ xử lí hoặc đã xử lí
            enum: ['pending', 'resolved', 'rejected', 'deleted', 'seen'], // trạng thái
            default: 'pending',
        },
        severity: {
            type: String, // mức độ nghiêm trọng của báo cáo
            enum: ['low', 'medium', 'high'], // mức độ nghiêm trọng
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
            type: Boolean, // báo cáo có công khai không
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Xuất mô hình
module.exports = mongoose.model('Incident', IncidentsSchema);