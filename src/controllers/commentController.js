const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');
const asyncHandler = require('../utils/asyncHandler');

const getCommentsForPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate('author', 'username email')
    .sort({ createdAt: -1 });

  res.json(comments);
});

const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { body } = req.body;

  if (!body) {
    res.status(400);
    throw new Error('Comment body is required');
  }

  const postExists = await BlogPost.exists({ _id: postId });

  if (!postExists) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  const comment = await Comment.create({
    body,
    post: postId,
    author: req.user._id,
  });

  res.status(201).json(await comment.populate('author', 'username email'));
});

module.exports = {
  getCommentsForPost,
  createComment,
};
