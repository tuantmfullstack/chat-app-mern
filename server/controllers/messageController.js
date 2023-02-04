import catchAsync from '../utils/catchAsync.js';
import Message from '../models/messageSchema.js';

export const getMessagesByConversation = catchAsync(async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  }).limit(10);

  res.status(200).json({
    status: 'success',
    data: { messages },
  });
});

export const createMessage = catchAsync(async (req, res) => {
  const user = req.user;

  const { conversationId, text } = req.body;

  const message = await Message.create({
    conversationId,
    senderId: user._id,
    text,
  });

  res.status(200).json({
    status: 'success',
    data: { message },
  });
});

// Update in the future
export const deleteMessages = catchAsync(async (req, res) => {});
