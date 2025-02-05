const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        comment: {
            type: String,
            required: true,
        },
        image: String,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Comment', CommentSchema)
