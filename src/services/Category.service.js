const { Category } = require('../models');

const createNewCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return newCategory;
};

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getById = async (id) => {
  const category = await Category.findOne({
    where: { id },
  });

  return category;
};

module.exports = {
  createNewCategory,
  getAll,
  getById,
};