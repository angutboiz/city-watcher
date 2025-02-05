const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      //   enum: ["Đèn đường", "Cây xanh", "Giao thông", "Đường hỏng", "Khác"],
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
