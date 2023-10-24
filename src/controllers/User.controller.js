const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const createNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const user = await UserService.getByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  await UserService.createNewUser(displayName, email, password, image);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email } }, process.env.JWT_SECRET, jwtConfig);

  res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await UserService.getAll();

  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getByUserId(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
};

const exclude = async (req, res) => {
  const { id } = req.user;

  await UserService.exclude(id);

  return res.status(204).end();
};

module.exports = {
  createNewUser,
  getAllUsers,
  getById,
  exclude,
};