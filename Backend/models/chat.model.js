const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    }, // Liên kết với cuộc trò chuyện
    sender: { type: String, enum: ['user', 'bot'], required: true }, // Ai gửi tin nhắn
    text: { type: String, required: true }, // Nội dung tin nhắn
    created_at: { type: Date, default: Date.now }, // Thời gian gửi
})

const conversationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // Các tin nhắn trong cuộc trò chuyện
    created_at: { type: Date, default: Date.now }, // Thời gian bắt đầu cuộc trò chuyện
})

// const faqSchema = new mongoose.Schema({
//     question: { type: String, required: true, unique: true }, // Câu hỏi
//     answer: { type: String, required: true }, // Câu trả lời
//     tags: [String], // Từ khóa liên quan
//     created_at: { type: Date, default: Date.now },
// })

// faqSchema.index({ question: "text", tags: "text" });

module.exports = {
    Message: mongoose.model('Message', messageSchema),
    Conversation: mongoose.model('Conversation', conversationSchema),
    // Faq: mongoose.model('Faq', faqSchema),
}
