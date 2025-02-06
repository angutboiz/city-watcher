const ErrorResponse = require('../core/error.response')
const SuccessResponse = require('../core/success.response')
const catchAsync = require('../middleware/catchAsync')
const incidentModel = require('../models/incidents.model')
const createIncident = catchAsync(async (req, res) => {
    const { title, desc, category_id, location, reciver_id } = req.body
    if (!title || !desc || !category_id || !location || !reciver_id) {
        ErrorResponse.notFound(res, 'Vui lòng điền đầy đủ dữ liệu!')
    }
    const incident = new incidentModel({
        user_id: req.user.id,
        location,
        reciver_id,
        category_id,
        title,
        desc,
    })
    await incident.save()
    if (!incident.title) {
        ErrorResponse.notFound(res, 'Không tìm thấy sự cố đã tạo!')
    }
    SuccessResponse.created(res, 'Sự cố đã được tạo thành công.', incident)
})
module.exports = { createIncident }
