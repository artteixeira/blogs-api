const { PostService, CategoryService } = require('../services');

const verifyCategoryId = async (categories) => {
  const categoryPromises = categories.map(async (categoryId) => {
    const category = await CategoryService.getById(categoryId);
    
    if (!category) return false;
    return categoryId;
  });

  const errors = await Promise.all(categoryPromises);

  const solved = errors.every((value) => value);

  return solved;
};

const createNewPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  const categoryErro = await verifyCategoryId(categoryIds);
  if (!categoryErro) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const newPost = await PostService.createNewPost(title, content, id, categoryIds);

  return res.status(201).json(newPost);
};

const getAll = async (_req, res) => {
  const posts = await PostService.getAll();

  return res.status(200).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const post = await PostService.getById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
};

module.exports = {
  createNewPost,
  getAll,
  getById,
};