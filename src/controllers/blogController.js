const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const asyncHandler = require('../utils/asyncHandler');

const getPosts = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find()
    .populate('author', 'username email')
    .sort({ createdAt: -1 });
  res.json(posts);
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id).populate('author', 'username email');

  if (!post) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  const comments = await Comment.find({ post: post._id })
    .populate('author', 'username email')
    .sort({ createdAt: -1 });

  const data = post.toObject();
  data.comments = comments;

  res.json(data);
});

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Title and content are required');
  }

  const post = await BlogPost.create({
    title,
    content,
    author: req.user._id,
  });

  res.status(201).json(await post.populate('author', 'username email'));
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Only the author can update this post');
  }

  if (typeof req.body.title !== 'undefined') {
    post.title = req.body.title;
  }

  if (typeof req.body.content !== 'undefined') {
    post.content = req.body.content;
  }

  const updated = await post.save();
  res.json(await updated.populate('author', 'username email'));
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Only the author can delete this post');
  }

  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();

  res.json({ message: 'Blog post removed' });
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
