const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        phoneNumber: {
            type: Number,
            required: true,
            max: 10,
            unique: true,
        },
        password: {
            type: String,
            min: 6,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        zone: {
            type: String,
            default: "Tan Uyen",
        },
        roles: {
            type: String,
            default: "user",
            enum: ["user", "admin", "manager"],
        },
        status: {
            type: Boolean,
            default: true,
        },
        profilePicture: {
            type: String,
            default: "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
