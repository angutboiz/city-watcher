const express = require("express");
const { createIncident } = require("../controllers/incidentController");
const router = express.Router();
router.post("/create", createIncident);
module.exports = router;
