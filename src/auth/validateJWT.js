const jwt = require('jsonwebtoken');

const { UserService } = require('../services');

const extractToken = (bearerToken) => bearerToken.split(' ')[1];

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserService.getByEmail(decoded.data.email);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};