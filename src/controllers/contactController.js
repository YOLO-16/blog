const Message = require('../models/Message');
const asyncHandler = require('../utils/asyncHandler');

const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Name, email, and message are required');
  }

  const saved = await Message.create({ name, email, message });
  res.status(201).json({ message: 'Message received', id: saved._id });
});

module.exports = { createMessage };
