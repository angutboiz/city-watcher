// const cloudinary = require('cloudinary').v2
// const multer = require('multer')
// const { CloudinaryStorage } = require('multer-storage-cloudinary')
// require('dotenv').config()
// // Cấu hình Cloudinary
// cloudinary.config({
//     // cloud_name: process.env.CLOUD_NAME,
//     // api_key: process.env.API_KEY_CLOUD,
//     // api_secret: process.env.API_SECRET_CLOUD,
//     cloud_name: 'dhluga71q',
//     api_key: '187681384547831',
//     api_secret: '1Y_Ogy0JBvLU1ygmUSq3mWbRSVM',
// })
// // Cấu hình Multer với Cloudinary Storage
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'uploads', // Tên thư mục trong Cloudinary
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Định dạng cho phép
//     },
// })

// const upload = multer({ storage: storage })
// const uploadImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' })
//         }

//         const file = req.file

//         res.status(200).json({
//             message: 'File uploaded successfully',
//             originalUrl: file.path,
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Upload failed', error: error.message })
//     }
// }

// module.exports = { upload, uploadImage }

const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
require('dotenv').config()

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: 'dhluga71q',
    api_key: '187681384547831',
    api_secret: '1Y_Ogy0JBvLU1ygmUSq3mWbRSVM',
})

// Cấu hình Multer Storage tạm thời trên server
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const uploadImage = async (req, res) => {
    try {
        console.log(req.file)
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        // Nén ảnh bằng sharp
        const compressedImagePath = path.join(
            __dirname,
            'compressed-' + Date.now() + '.webp'
        )
        await sharp(req.file.buffer)
            .resize({ width: 1024 }) // Điều chỉnh kích thước hợp lý
            .webp({ quality: 80 }) // Chất lượng nén 80%
            .toFile(compressedImagePath)

        // Upload ảnh đã nén lên Cloudinary
        const result = await cloudinary.uploader.upload(compressedImagePath, {
            folder: 'uploads',
            format: 'webp',
        })

        // Xóa file tạm
        fs.unlinkSync(compressedImagePath)

        res.status(200).json({
            message: 'File uploaded successfully',
            originalUrl: result.secure_url,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Upload failed', error: error.message })
    }
}

const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        // Đảm bảo upload_stream nhận buffer đúng cách
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'uploads', // Lưu vào thư mục "uploads"
                    resource_type: 'video',
                    format: 'mp4',
                    transformation: [
                        { quality: 'auto', fetch_format: 'auto' }, // Tự động tối ưu chất lượng
                        { video_codec: 'auto' }, // Dùng codec tối ưu nhất
                        { bit_rate: '500k' }, // Giới hạn bitrate để giảm dung lượng
                    ],
                },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            )

            // Chuyển buffer thành Readable stream và pipe vào upload_stream
            const { Readable } = require('stream')
            const fileStream = Readable.from(req.file.buffer)
            fileStream.pipe(stream)
        })

        res.status(200).json({
            message: 'Video uploaded successfully',
            videoUrl: result.secure_url,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Upload failed', error: error.message })
    }
}

module.exports = { upload, uploadImage, uploadVideo }
