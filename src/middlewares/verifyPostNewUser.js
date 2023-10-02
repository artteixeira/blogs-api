const verifyDisplayName = (displayName) => displayName && displayName.length >= 8;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const verifyPassword = (password) => password && password.length >= 6;

const verifyPostNewUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (!verifyDisplayName(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' }); 
  } 

  if (!emailRegex.test(email)) {
    return res.status(400)
      .json({ message: '"email" must be a valid email' });
  }

  if (!verifyPassword(password)) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

module.exports = verifyPostNewUser;