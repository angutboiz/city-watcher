const mongoose = require("mongoose");
// bảng sự cố
const IncidentsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //người gửi báo cáo
        },
        location: {
            type: String, //kinh độ vĩ độ điểm xảy ra sự cố VD: 11.003140572358017, 106.67487293570176
            required: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category", //loại báo cáo
            required: true,
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
            enum: ["pending", "resolved", "rejected", "deleted", "seen"], //pending: chờ xử lí, resolved: đã xử lí, rejected: báo cáo không hợp lệ, deleted: bài viết đã bị xóa, seen: báo cáo đã được xem
            default: "pending",
        },
        severity: {
            type: String, //mức độ nghiêm trọng của báo cáo
            enum: ["low", "medium", "high"], //low: thấp, medium: trung bình, high: cao
            default: "low",
        },
        resolved_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //người giải quyết báo cáo (admin hoặc manager)
        },
        resolved_date: {
            type: Date, // ngày giải quyết báo cáo
        },
        resolved_content: {
            type: String, // nội dung giải quyết báo cáo
            trim: true,
        },
        is_violated: {
            type: Boolean, // đánh dấu báo cáo có hợp lệ hay không
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Report", IncidentsSchema);
