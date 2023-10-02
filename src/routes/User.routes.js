const route = require('express').Router();

const { UserController } = require('../controllers');
const verifyPostNewUser = require('../middlewares/verifyPostNewUser');
const validateJWT = require('../auth/validateJWT');

route.post('/', verifyPostNewUser, UserController.createNewUser);

route.get('/', validateJWT, UserController.getAllUsers);

route.get('/:id', validateJWT, UserController.getById);

module.exports = route;