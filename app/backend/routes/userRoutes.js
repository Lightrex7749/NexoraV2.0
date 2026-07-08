import express from 'express';
import { getProfile, updateProfile, followUser, getAllUsers, connectUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/follow', followUser);
router.get('/all', getAllUsers);
router.post('/connect/:targetId', connectUser);

export default router;
