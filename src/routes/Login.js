const route = require('express').Router();

const { Login } = require('../controllers');

route.post('/', Login);

module.exports = route;