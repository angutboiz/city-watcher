const express = require('express')
const {
    createIncident,
    getIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
    changeStatusIncident,
} = require('../controllers/incident.controller')
const router = express.Router()
router.post('/create', createIncident)
router.get('/', getIncidents)
router.get('/:id', getIncidentById)
router.post('/:id', updateIncident)
router.post('/status/:id', changeStatusIncident)
router.delete('/:id', deleteIncident)
module.exports = router
