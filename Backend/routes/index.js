const express = require("express");

const router = express.Router();

const authRoutes = require("./auth");
// const profileRoutes = require("./profile");
const ChatRoutes = require("./chat");
const uploadRoutes = require("./upload");
const notifyRoutes = require("./notification");
const categoryRoutes = require("./category");
const incidentRoutes = require("./incident");
const {
  authMiddleware,
  checkAdminMiddleware,
} = require("../middleware/authorizationMiddleWare");
router.use("/api/v1/auth", authRoutes);
// router.use("/api/v1/profile", profileRoutes);
// router.use("/api/v1/admin", AdminRoutes);
router.use("/api/v1/chat", authMiddleware, ChatRoutes);
router.use("/api/v1/upload", authMiddleware, uploadRoutes);
router.use("/api/v1/notify", authMiddleware, notifyRoutes);
router.use("/api/v1/category", authMiddleware, categoryRoutes);
router.use("/api/v1/incident", authMiddleware, incidentRoutes);

module.exports = router;
