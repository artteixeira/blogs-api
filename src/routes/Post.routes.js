const route = require('express').Router();

const { PostController } = require('../controllers');
const validateJWT = require('../auth/validateJWT');
const verifyPostBlogPosts = require('../middlewares/verifyPostBlogPosts');

route.post('/', validateJWT, verifyPostBlogPosts, PostController.createNewPost);
route.get('/', validateJWT, PostController.getAll);
route.get('/:id', validateJWT, PostController.getById);

module.exports = route;