const incidentModel = require("../models/Incidents");
const createIncident = async (req, res) => {
  try {
    const { title, desc, category_id, location } = req.body;
    console.log(req.user);
    const incident = new incidentModel({
      user_id: req.user.id,
      location,
      category_id: category_id,
      title,
      desc,
    });
    res.json(incident);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      errorMessage: error.message,
    });
  }
};

module.exports = { createIncident };
