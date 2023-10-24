const route = require('express').Router();

const { PostController } = require('../controllers');
const validateJWT = require('../auth/validateJWT');
const verifyPostBlogPosts = require('../middlewares/verifyPostBlogPosts');
const verifyPutBlogPosts = require('../middlewares/verifyPutBlogPosts');

route.post('/', validateJWT, verifyPostBlogPosts, PostController.createNewPost);
route.get('/', validateJWT, PostController.getAll);
route.get('/:id', validateJWT, PostController.getById);
route.put('/:id', validateJWT, verifyPutBlogPosts, PostController.update);
route.delete('/:id', validateJWT, PostController.exclude);

module.exports = route;