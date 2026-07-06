import express from 'express';
import { getProfile, updateProfile, followUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/follow', followUser);

export default router;
