const { User, BlogPost } = require('../models');

const getByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  return user;
};

const createNewUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const getByUserId = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: 'password' },
  });

  return user;
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: 'password' },
  });

  return users;
};

const exclude = async (id) => {
  await BlogPost.destroy({ where: { userId: id } });
  await User.destroy({ where: { id } });
};

module.exports = {
  getByEmail,
  createNewUser,
  getByUserId,
  getAll,
  exclude,
};