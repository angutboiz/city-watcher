const ErrorResponse = require('../core/error.response')
const SuccessResponse = require('../core/success.response')
const catchAsync = require('../middleware/catchAsync')
const incidentModel = require('../models/incidents.model')

// Tạo sự cố mới
// const createIncident = catchAsync(async (req, res) => {
//     const { title, desc, category_id, location, reciver_id } = req.body
//     console.log(req.body)
//     if (
//         !title ||
//         !desc ||
//         !category_id ||
//         !location ||
//         !reciver_id ||
//         !longitude ||
//         !latitude
//     ) {
//         return ErrorResponse.badRequest(res, 'Vui lòng điền đầy đủ thông tin!')
//     }
//     const incident = new incidentModel({
//         user_id: req.user.id,
//         location: {
//             type: 'Point',
//             coordinates: [parseFloat(longitude), parseFloat(latitude)],
//         },
//         reciver_id,
//         category_id,
//         title,
//         desc,
//     })
//     await incident.save()
//     if (!incident.title) {
//         return ErrorResponse.notFound(res, 'Không tìm thấy sự cố đã tạo!')
//     }
//     return SuccessResponse.created(
//         res,
//         'Sự cố đã được tạo thành công.',
//         incident
//     )
// })

const createIncident = catchAsync(async (req, res) => {
    const { title, desc, category_id, location, reciver_id } = req.body
    if (!title || !desc || !category_id || !location || !reciver_id) {
        return ErrorResponse.badRequest(res, 'Vui lòng điền đầy đủ thông tin!')
    }

    // Kiểm tra cấu trúc location
    if (
        !location.type ||
        !location.coordinates ||
        !Array.isArray(location.coordinates) ||
        location.coordinates.length !== 2
    ) {
        return ErrorResponse.badRequest(res, 'Định dạng location không hợp lệ!')
    }

    const [longitude, latitude] = location.coordinates
    console.log(longitude, latitude)
    // Validate tọa độ
    if (
        longitude < -180 ||
        longitude > 180 ||
        latitude < -90 ||
        latitude > 90
    ) {
        return ErrorResponse.badRequest(res, 'Tọa độ không hợp lệ!')
    }

    // Tạo incident mới
    const incident = new incidentModel({
        user_id: req.user.id, // Lấy từ auth middleware
        location: {
            type: 'Point',
            coordinates: [longitude, latitude],
        },
        reciver_id,
        category_id,
        title,
        desc,
    })

    // Lưu vào database
    await incident.save()

    // Kiểm tra xem đã tạo thành công chưa
    if (!incident._id) {
        return ErrorResponse.notFound(res, 'Không thể tạo sự cố!')
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

// Lấy sự cố gần đây
// Backend/controllers/incident.controller.js
// Backend/controllers/incident.controller.js
// Lấy sự cố gần đây
const Incident = require('../models/incidents.model')
const geolib = require('geolib')

// Biến để lưu trữ vị trí người dùng gần nhất
let lastUserLocation = null

// Tính khoảng cách và kiểm tra sự cố gần
const checkNearbyIncidents = (parsedLatitude, parsedLongitude, incidents) => {
    return incidents.filter((incident) => {
        const distance = geolib.getDistance(
            { latitude: parsedLatitude, longitude: parsedLongitude },
            {
                latitude: incident.location.coordinates[1],
                longitude: incident.location.coordinates[0],
            }
        )
        return distance <= 1000 // 1 km
    })
}

// Gửi thông báo cho người dùng
const notifyUser = (nearbyIncidents) => {
    // Gửi thông báo cho người dùng (sử dụng WebSocket hoặc FCM)
    // Ví dụ: notifyUsers(nearbyIncidents);
    console.log('Thông báo cho người dùng về sự cố gần:', nearbyIncidents)
}

const getNearbyIncidents = async (req, res) => {
    try {
        const { longitude, latitude } = req.body

        // Kiểm tra tọa độ
        if (!longitude || !latitude) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp tọa độ (longitude và latitude)',
            })
        }

        const parsedLongitude = parseFloat(longitude)
        const parsedLatitude = parseFloat(latitude)

        // Kiểm tra giá trị tọa độ
        if (
            parsedLongitude < -180 ||
            parsedLongitude > 180 ||
            parsedLatitude < -90 ||
            parsedLatitude > 90
        ) {
            return res.status(400).json({
                success: false,
                message: 'Tọa độ không hợp lệ!',
            })
        }

        // Kiểm tra xem vị trí người dùng có thay đổi không
        if (
            lastUserLocation &&
            lastUserLocation.longitude === parsedLongitude &&
            lastUserLocation.latitude === parsedLatitude
        ) {
            return res.status(200).json({
                success: true,
                message: 'Vị trí không thay đổi, không cần kiểm tra lại.',
            })
        }

        // Cập nhật vị trí người dùng
        lastUserLocation = {
            longitude: parsedLongitude,
            latitude: parsedLatitude,
        }

        // Lấy tất cả các sự cố từ cơ sở dữ liệu
        const incidents = await Incident.find()

        // Tính khoảng cách và lọc các sự cố gần
        const nearbyIncidents = checkNearbyIncidents(
            parsedLatitude,
            parsedLongitude,
            incidents
        )

        // Gửi thông báo nếu có sự cố gần
        if (nearbyIncidents.length > 0) {
            notifyUser(nearbyIncidents)
        } else {
            console.log('Không có sự cố nào gần vị trí của bạn.')
        }

        return res.status(200).json({
            success: true,
            data: nearbyIncidents,
            message: 'Lấy danh sách sự cố gần đây thành công',
        })
    } catch (error) {
        console.error('getNearbyIncidents error:', error)
        return res.status(500).json({
            success: false,
            message: 'Lỗi server: ' + error.message,
        })
    }
}

module.exports = {
    createIncident,
    getIncidents,
    getIncidentById,
    updateIncident,
    changeStatusIncident,
    deleteIncident,
    getNearbyIncidents,
}
