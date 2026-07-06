import express from 'express';
import { getCommunityPosts, createCommunityPost, toggleLike } from '../controllers/communityController.js';

const router = express.Router();

router.get('/', getCommunityPosts);
router.post('/', createCommunityPost);
router.post('/like', toggleLike);

export default router;
