import express from 'express';
import { getCommunityPosts, createCommunityPost, toggleLike, getComments, createComment } from '../controllers/communityController.js';

const router = express.Router();

router.get('/', getCommunityPosts);
router.post('/', createCommunityPost);
router.post('/like', toggleLike);
router.get('/comments/:targetType/:targetId', getComments);
router.post('/comments/:targetType/:targetId', createComment);

export default router;
