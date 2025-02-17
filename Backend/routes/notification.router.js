const express = require('express')
const {
    createIncident,
    getIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
    changeStatusIncident,
} = require('../controllers/incident.controller')
const {
    createNotification,
    getUserNotifications,
    markAsRead,
    deleteNotification,
} = require('../controllers/notification.controller')
const { checkAdmin, verifyToken } = require('../middleware/auth.middleware.js')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Incident
 *     description: API quản lý báo cáo sự cố
 *   - name: Notification
 *     description: API quản lý thông báo
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
 *               category_id:
 *                 type: string
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               severity:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 default: low
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Báo cáo sự cố được tạo thành công
 */
router.post('/incident/create', createIncident)

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
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của báo cáo sự cố
 */
router.get('/incident/:id', getIncidentById)

/**
 * @swagger
 * /api/v1/notify:
 *   post:
 *     summary: Tạo thông báo mới
 *     tags: [Notification]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - sender_id
 *               - type
 *               - content
 *             properties:
 *               user_id:
 *                 type: string
 *               sender_id:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [new_report, report_approved, report_rejected, report_confirmed, system]
 *               link:
 *                 type: string
 *               content:
 *                 type: string
 */
router.post('/notify', verifyToken, createNotification)

/**
 * @swagger
 * /api/v1/notify/{notificationId}:
 *   get:
 *     summary: Đánh dấu thông báo là đã đọc
 *     tags: [Notification]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông báo đã được đánh dấu là đã đọc
 */
router.get('/notify/:notificationId', verifyToken, markAsRead)

/**
 * @swagger
 * /api/v1/notify/{notificationId}:
 *   delete:
 *     summary: Xóa thông báo
 *     tags: [Notification]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông báo đã bị xóa
 */
router.delete('/notify/:notificationId', verifyToken, deleteNotification)

module.exports = router
