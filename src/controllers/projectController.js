const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .populate('user', 'username email')
    .sort({ createdAt: -1 });
  res.json(projects);
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('user', 'username email');

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.json(project);
});

const createProject = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Title and description are required');
  }

  const project = await Project.create({
    title,
    description,
    imageUrl,
    repoUrl,
    liveUrl,
    user: req.user._id,
  });

  res.status(201).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You are not allowed to modify this project');
  }

  const updatableFields = ['title', 'description', 'imageUrl', 'repoUrl', 'liveUrl'];

  updatableFields.forEach((field) => {
    if (typeof req.body[field] !== 'undefined') {
      project[field] = req.body[field];
    }
  });

  const updated = await project.save();
  res.json(updated);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You are not allowed to delete this project');
  }
  await project.deleteOne();

  res.json({ message: 'Project removed' });
});

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
