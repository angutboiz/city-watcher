const express = require('express')
const {
    createIncident,
    getIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
    changeStatusIncident,
    getNearbyIncidents,
} = require('../controllers/incident.controller')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Incident
 *   description: API quản lý báo cáo sự cố
 */

/**
 * @swagger
 * /api/v1/incident/create:
 *   post:
 *     summary: Tạo một báo cáo sự cố mới
 *     tags: [Incident]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - category_id
 *               - title
 *               - desc
 *             properties:
 *               location:
 *                 type: string
 *                 description: Vị trí xảy ra sự cố (kinh độ, vĩ độ)
 *               category_id:
 *                 type: string
 *                 description: ID danh mục của sự cố
 *               title:
 *                 type: string
 *                 description: Tiêu đề báo cáo sự cố
 *               desc:
 *                 type: string
 *                 description: Mô tả chi tiết về sự cố
 *               severity:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 default: low
 *                 description: Mức độ nghiêm trọng
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Ảnh minh họa của sự cố
 *     responses:
 *       201:
 *         description: Báo cáo sự cố được tạo thành công
 */
router.post('/create', createIncident)

/**
 * @swagger
 * /api/v1/incident:
 *   get:
 *     summary: Lấy danh sách tất cả các báo cáo sự cố
 *     tags: [Incident]
 *     responses:
 *       200:
 *         description: Danh sách báo cáo sự cố
 */
router.get('/', getIncidents)

/**
 * @swagger
 * /api/v1/incident/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một báo cáo sự cố
 *     tags: [Incident]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của báo cáo sự cố cần lấy
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của báo cáo sự cố
 */
router.get('/:id', getIncidentById)

/**
 * @swagger
 * /api/v1/incident/{id}:
 *   patch:
 *     summary: Cập nhật thông tin báo cáo sự cố
 *     tags: [Incident]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của báo cáo sự cố cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tiêu đề mới của sự cố
 *               desc:
 *                 type: string
 *                 description: Mô tả mới của sự cố
 *               severity:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: Cấp độ nghiêm trọng mới
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Ảnh cập nhật của sự cố
 *     responses:
 *       200:
 *         description: Cập nhật báo cáo sự cố thành công
 */
router.patch('/:id', updateIncident)

/**
 * @swagger
 * /api/v1/incident/status/{id}:
 *   patch:
 *     summary: Cập nhật trạng thái của báo cáo sự cố
 *     tags: [Incident]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của báo cáo sự cố cần cập nhật trạng thái
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, resolved, rejected, deleted, seen]
 *                 description: Trạng thái mới của báo cáo sự cố
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái báo cáo sự cố thành công
 */
router.patch('/status/:id', changeStatusIncident)

/**
 * @swagger
 * /api/v1/incident/{id}:
 *   delete:
 *     summary: Xóa một báo cáo sự cố
 *     tags: [Incident]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của báo cáo sự cố cần xóa
 *     responses:
 *       200:
 *         description: Xóa báo cáo sự cố thành công
 */
router.delete('/:id', deleteIncident)

router.post('/nearby', getNearbyIncidents)

module.exports = router
