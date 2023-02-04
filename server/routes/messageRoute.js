import express from 'express';
import { protect } from '../controllers/authController.js';
import {
  createMessage,
  deleteMessages,
  getMessagesByConversation,
} from '../controllers/messageController.js';

const router = express.Router();

router.use(protect);

router.post('', createMessage);
router.get('/:conversationId', getMessagesByConversation);
router.delete('/:id', deleteMessages);

export default router;
