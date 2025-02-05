const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        comment_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Comment',
        },
        title: {
            type: String,
            required: true,
        },
        desc: String,
        image: [String],
        helpful: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Post', PostSchema)
