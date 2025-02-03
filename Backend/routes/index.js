const express = require("express");

const router = express.Router();

const authRoutes = require("./auth");
// const profileRoutes = require("./profile");
const ChatRoutes = require("./chat");
const uploadRoutes = require("./upload");
const notifyRoutes = require("./notification");

router.use("/api/v1/auth", authRoutes);
// router.use("/api/v1/profile", profileRoutes);
// router.use("/api/v1/admin", AdminRoutes);
router.use("/api/v1/chat", ChatRoutes);
router.use("/api/v1/upload", uploadRoutes);
router.use("/api/v1/notify", notifyRoutes);

module.exports = router;
