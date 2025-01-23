const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
    {
        user_report: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //người gửi báo cáo
        },
        location: {
            type: String, //địa điểm bài viết bị báo cáo
            required: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId, // loại vi phạm spam, không phù hợp, khác
            ref: "Category",
        },
        content: {
            type: String, //nội dung báo cáo
            required: true,
            trim: true,
        },
        status: {
            type: String, //trạng thái báo cáo đang chờ xử lí hoặc đã xử lí
            enum: ["pending", "resolved", "rejected", "deleted", "seen"], //pending: chờ xử lí, resolved: đã xử lí, rejected: báo cáo không hợp lệ, deleted: bài viết đã bị xóa, seen: báo cáo đã được xem
            default: "pending",
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

module.exports = mongoose.model("Report", ReportSchema);
