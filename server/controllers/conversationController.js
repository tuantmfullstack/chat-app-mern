import catchAsync from '../utils/catchAsync.js';
import Conversation from '../models/conversationSchema.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const getAllConversations = catchAsync(async (req, res) => {
  const user = req.user;

  const conversations = await Conversation.find({
    $or: [{ senderId: ObjectId(user._id) }, { receiverId: ObjectId(user._id) }],
  })
    .populate({
      path: 'senderId',
      select: 'email avatar',
    })
    .populate({
      path: 'receiverId',
      select: 'email avatar',
    });

  res.status(200).json({
    status: 'success',
    length: conversations.length,
    data: { conversations },
  });
});

export const createConversation = catchAsync(async (req, res) => {
  const user = req.user;
  const { receiverId } = req.body;

  const conversation = await Conversation.create({
    senderId: user._id,
    receiverId,
  });

  res.status(200).json({
    status: 'success',
    data: { conversation },
  });
});

// FUTURE
// Update name, avatar of a conversation
export const updateConversation = catchAsync(async (req, res) => {});

export const deleteConversation = catchAsync(async (req, res) => {});
