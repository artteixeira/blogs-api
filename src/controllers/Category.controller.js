const { CategoryService } = require('../services');

const createNewCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = await CategoryService.createNewCategory(name);
  
  return res.status(201).json(newCategory);
};

module.exports = {
  createNewCategory,
};