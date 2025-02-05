const categoryModel = require("../models/Category");
const createCategory = async (req, res) => {
  try {
    const { name, desc } = req.body;
    if (!name || name.length < 3) {
      return res.status(400).json("Vui lòng điền đúng category!");
    }
    const category = new categoryModel({ name, desc });
    await category.save();
    return res.status(201).json({
      message: "Tạo category thành công!",
      metadata: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      errorMessage: error.message,
    });
  }
};
const getCategories = async (req, res) => {
  try {
    const category = await categoryModel.find();
    // console.log(category);
    res.status(200).json({
      message: "Get categories success!",
      metadata: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      errorMessage: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    console.log(categoryId);
    const deletedCategory = await categoryModel.findOneAndDelete({
      _id: categoryId,
    });
    if (!deletedCategory) {
      return res.status(400).json({
        status: "error",
        message: "Category not found!",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Delete category successful",
      metadata: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      errorMessage: error.message,
    });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const getById = await categoryModel.findOne({
      _id: categoryId,
    });
    if (!getById) {
      return res.status(400).json({
        status: "error",
        message: "Category not found!",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Get category success!",
      metadata: getById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      errorMessage: error.message,
    });
  }
};
module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  getCategoryById,
};
