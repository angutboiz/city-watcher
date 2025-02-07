const express = require('express')
const { createIncident } = require('../controllers/incident.controller')
const router = express.Router()
router.post('/create', createIncident)
module.exports = router
