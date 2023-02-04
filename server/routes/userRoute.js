import express from 'express';
import {
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);

router.route('').get(getAllUsers).delete(deleteAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
