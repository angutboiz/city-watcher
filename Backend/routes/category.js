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
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.delete("/categories/:id", checkAdminMiddleware, deleteCategory);
module.exports = router;
