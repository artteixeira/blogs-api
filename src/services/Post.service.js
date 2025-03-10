const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config[process.env.NODE_ENV]);
const { BlogPost, PostCategory, User, Category } = require('../models');

const createNewPost = async (title, content, userId, categories) => {
  const transaction = await sequelize.transaction();
  try {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction });

    const categoryPromises = categories.map(async (category) => {
      await PostCategory.create({ postId: newPost.id, categoryId: category }, { transaction });
    });

    await Promise.all(categoryPromises);

    await transaction.commit();
    return newPost;
  } catch (e) {
    await transaction.rollback();

    console.error(e);
    throw e;
  }
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });

  return post;
};

const update = async (title, content, id) => {
  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id }, returning: true },
  );
  
  const updatedPost = getById(id);
  
  return updatedPost;
};

const exclude = async (id) => {
  const post = await BlogPost.destroy({ where: { id } });

  return post;
};

const search = async (query) => {
  const posts = await BlogPost.findAll({
    where: { [Sequelize.Op.or]: [
      { title: { [Sequelize.Op.like]: `%${query}%` } },
      { content: { [Sequelize.Op.like]: `%${query}%` } },
    ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });

  return posts;
};

module.exports = {
  createNewPost,
  getAll,
  getById,
  update,
  exclude,
  search,
};