const route = require('express').Router();

const { CategoryController } = require('../controllers');
const veriryPostNewCategory = require('../middlewares/verifyPostNewCategory');
const validateJWT = require('../auth/validateJWT');

route.post('/', validateJWT, veriryPostNewCategory, CategoryController.createNewCategory);

module.exports = route;