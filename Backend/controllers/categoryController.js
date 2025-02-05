const ErrorResponse = require('../core/error.response')
const SuccessResponse = require('../core/success.response')
const catchAsync = require('../middleware/catchAsync')
const categoryModel = require('../models/Category')

const getCategories = catchAsync(async (req, res) => {
    const category = await categoryModel.find().lean()
    SuccessResponse.ok(res, 'Get categories success!', category)
})

const getCategoryById = catchAsync(async (req, res) => {
    const categoryId = req.params.id
    const getById = await categoryModel.findOne({
        _id: categoryId,
    })
    if (!getById) {
        return ErrorResponse.notFound(res, 'Category not found!')
    }
    return SuccessResponse.ok(res, 'Get category success!', getById)
})

const createCategory = catchAsync(async (req, res) => {
    const { name, desc } = req.body
    if (!name || name.length < 3) {
        return res.status(400).json('Vui lòng điền đúng category!')
    }
    // tìm xem category đã tồn tại chưa
    const find = await categoryModel.findOne({ name }).lean()
    if (find) {
        return ErrorResponse.conflict(res, 'Thể loại này đã tồn tại!')
    }

    const category = new categoryModel({ name, desc })
    await category.save()

    SuccessResponse.created(res, 'Create category success!', category)
})

const updateCategory = catchAsync(async (req, res) => {
    const { id } = req.params
    const { name, desc } = req.body

    if (!name || name.length < 3) {
        return ErrorResponse.badRequest(res, 'Vui lòng điền trường name!')
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        { name, desc },
        { new: true }
    )
    if (!updatedCategory) {
        return ErrorResponse.notFound(res, 'Không tìm thấy thể loại này!!')
    }
    return SuccessResponse.updated(
        res,
        'Cập nhật thành công category!',
        updatedCategory
    )
})

const deleteCategory = catchAsync(async (req, res) => {
    const { id } = req.params
    const deletedCategory = await categoryModel.findByIdAndDelete(id)
    if (!deletedCategory) {
        return ErrorResponse.notFound(res, 'Không tìm thấy thể loại này!!')
    }
    return SuccessResponse.deleted(
        res,
        'Xóa thành công category!',
        deletedCategory
    )
})

module.exports = {
    getCategoryById,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}
