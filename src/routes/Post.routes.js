const route = require('express').Router();

const { PostController } = require('../controllers');
const validateJWT = require('../auth/validateJWT');
const verifyPostBlogPosts = require('../middlewares/verifyPostBlogPosts');

route.post('/', validateJWT, verifyPostBlogPosts, PostController.createNewPost);
route.get('/', validateJWT, PostController.getAll);

module.exports = route;