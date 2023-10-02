const { User } = require('../models');

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

module.exports = {
  getByEmail,
  createNewUser,
  getByUserId,
  getAll,
};