const { CategoryService } = require('../services');

const createNewCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = await CategoryService.createNewCategory(name);
  
  return res.status(201).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const categories = await CategoryService.getAll();

  return res.status(200).json(categories);
};

module.exports = {
  createNewCategory,
  getAllCategories,
};