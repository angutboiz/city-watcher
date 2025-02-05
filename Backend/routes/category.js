const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
  getCategoryById,
} = require("../controllers/categoryController");
const {
  checkAdminMiddleware,
} = require("../middleware/authorizationMiddleWare");
const router = express.Router();
router.post("/create", checkAdminMiddleware, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.delete("/:id", checkAdminMiddleware, deleteCategory);
module.exports = router;
