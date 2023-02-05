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

conversationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'senderId',
    select: 'email avatar name',
  }).populate({
    path: 'receiverId',
    select: 'email avatar name',
  });

  next();
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
