const ErrorResponse = require('../core/error.response')
const { logError } = require('../core/logger')

//wrapper function để không phải viết try-catch trong mỗi controller:
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            logError(err, req)
            // res.status(500).json({ message: 'Internal Server Error' })
            next(new ErrorResponse(500, 'Internal Server Error', err))
        })
    }
}

module.exports = catchAsync
