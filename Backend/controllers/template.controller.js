const templateModel = require('../models/category.model')
const ErrorResponse = require('../core/error.response')
const SuccessResponse = require('../core/success.response')
const catchAsync = require('../middleware/catchAsync')

const get = catchAsync(async (req, res) => {
    const findModel = await templateModel.find().lean()
    SuccessResponse.ok(res, 'Get templateModel success!', findModel)
})

const getById = catchAsync(async (req, res) => {
    const { id } = req.params
    const findModel = await templateModel.findById(id).lean()
    if (!findModel) {
        return ErrorResponse.notFound(res, 'Không tìm thấy templateModel!')
    }
    return SuccessResponse.ok(
        res,
        'Lấy danh sách templateModel thành công!',
        findModel
    )
})

const create = catchAsync(async (req, res) => {
    const { name, desc } = req.body
    if (!name || name.length < 3) {
        return res.status(400).json('Vui lòng không bỏ trống!')
    }
    // tìm xem templateModel đã tồn tại chưa
    const findModel = await templateModel.findOne({ name }).lean()
    if (findModel) {
        return ErrorResponse.conflict(res, 'templateModel này đã tồn tại!')
    }

    const newModel = new templateModel({ name, desc })
    await newModel.save()

    SuccessResponse.created(res, 'Tạo templateModel thành công!', newModel)
})

const update = catchAsync(async (req, res) => {
    const { id } = req.params
    const { name, desc } = req.body

    if (!name || name.length < 3) {
        return ErrorResponse.badRequest(res, 'Vui lòng không bỏ trống!')
    }

    const findModel = await templateModel.findByIdAndUpdate(
        id,
        { name, desc },
        { new: true }
    )
    if (!findModel) {
        return ErrorResponse.notFound(res, 'Không tìm thấy templateModel này!!')
    }
    return SuccessResponse.updated(
        res,
        'Cập nhật thành công templateModel!',
        findModel
    )
})

const deleteModel = catchAsync(async (req, res) => {
    const { id } = req.params
    const findModel = await templateModel.findByIdAndDelete(id)
    if (!findModel) {
        return ErrorResponse.notFound(res, 'Không tìm thấy templateModel này!!')
    }
    return SuccessResponse.deleted(
        res,
        'Xóa thành công templateModel!',
        findModel
    )
})

module.exports = {
    getById,
    get,
    create,
    update,
    deleteModel,
}
