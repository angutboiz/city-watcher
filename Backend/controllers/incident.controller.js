const ErrorResponse = require('../core/error.response')
const SuccessResponse = require('../core/success.response')
const catchAsync = require('../middleware/catchAsync')
const incidentModel = require('../models/incidents.model')

// Tạo sự cố mới
const createIncident = catchAsync(async (req, res) => {
    const { title, desc, category_id, location, reciver_id } = req.body
    console.log(req.body)
    if (!title || !desc || !category_id || !location || !reciver_id) {
        return ErrorResponse.badRequest(res, 'Vui lòng điền đầy đủ thông tin!')
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
        return ErrorResponse.notFound(res, 'Không tìm thấy sự cố đã tạo!')
    }
    return SuccessResponse.created(
        res,
        'Sự cố đã được tạo thành công.',
        incident
    )
})

// Lấy danh sách tất cả các sự cố
const getIncidents = catchAsync(async (req, res) => {
    const findModel = await incidentModel.find().lean()
    if (!findModel || findModel.length === 0) {
        return ErrorResponse.notFound(res, 'Không có sự cố nào được tìm thấy!')
    }
    return SuccessResponse.ok(res, 'Lấy danh sách sự cố thành công!', findModel)
})

// Lấy sự cố theo ID
const getIncidentById = catchAsync(async (req, res) => {
    const { id } = req.params
    const findModel = await incidentModel.findById(id).lean()
    if (!findModel) {
        return ErrorResponse.notFound(res, 'Không tìm thấy sự cố này!')
    }
    return SuccessResponse.ok(res, 'Lấy thông tin sự cố thành công!', findModel)
})

// Cập nhật sự cố
const updateIncident = catchAsync(async (req, res) => {
    const { id } = req.params
    const { title, desc, category_id, location, reciver_id } = req.body

    if (!title || !desc || !category_id || !location || !reciver_id) {
        return ErrorResponse.badRequest(
            res,
            'Vui lòng điền đầy đủ thông tin để cập nhật!'
        )
    }

    const findModel = await incidentModel.findByIdAndUpdate(
        id,
        { title, desc, category_id, location, reciver_id },
        { new: true }
    )
    if (!findModel) {
        return ErrorResponse.notFound(
            res,
            'Không tìm thấy sự cố này để cập nhật!'
        )
    }
    return SuccessResponse.updated(res, 'Cập nhật sự cố thành công!', findModel)
})

// Xóa sự cố
const deleteIncident = catchAsync(async (req, res) => {
    const { id } = req.params
    const findModel = await incidentModel.findByIdAndDelete(id)
    if (!findModel) {
        return ErrorResponse.notFound(res, 'Không tìm thấy sự cố này để xóa!')
    }
    return SuccessResponse.deleted(res, 'Xóa sự cố thành công!', findModel)
})
const changeStatusIncident = catchAsync(async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const findModel = await incidentModel.findByIdAndUpdate(id, { status })
    return SuccessResponse.updated(
        res,
        'Cập nhật trạng thái sự cố thành công!',
        findModel
    )
})

module.exports = {
    createIncident,
    getIncidents,
    getIncidentById,
    updateIncident,
    changeStatusIncident,
    deleteIncident,
}
