import express from 'express';
import { protect } from '../controllers/authController.js';
import {
  createConversation,
  deleteConversation,
  getAllConversations,
  getOrCreateConversation,
  updateConversation,
} from '../controllers/conversationController.js';

const router = express.Router();

router.use(protect);

router
  .route('')
  .get(getAllConversations)
  .post(createConversation)
  .patch(getOrCreateConversation);
router.route('/:id').patch(updateConversation).delete(deleteConversation);

export default router;
