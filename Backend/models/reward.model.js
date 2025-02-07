const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema(
    {
        point: {
            type: Number,
            default: 0,
        },
        completed_reports: {
            // Số vụ đã hoàn thành
            type: Number,
            default: 0,
        },
        rank: {
            type: String,
            default: "Newbie",
            enum: ["Tập sự", "Đồng", "Bạc", "Vàng", "Kim cương"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Reward", RewardSchema);

// Mỗi lần người dùng báo cáo một sự cố và sự cố đó được xử lý thành công bởi chính quyền (chuyển trạng thái từ Pending hoặc In Progress sang Resolved), người dùng sẽ được cộng điểm.

// Newbie → Bronze: 5 vụ hoàn thành.
// Bronze → Silver: 15 vụ hoàn thành.
// Silver → Gold: 30 vụ hoàn thành.
// Gold → Platinum: 50 vụ hoàn thành.
// Platinum → Diamond: 100 vụ hoàn thành.

// có thể kết hợp với các nhà tài trợ bên ngoài hoặc gây quỹ từ thiện
