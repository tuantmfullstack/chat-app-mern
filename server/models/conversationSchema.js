import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
