const isBodyValid = (title, content, categoryIds) => title && content && categoryIds;

const verifyPostBlogPosts = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!isBodyValid(title, content, categoryIds)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = verifyPostBlogPosts;