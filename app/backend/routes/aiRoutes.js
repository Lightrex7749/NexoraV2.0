import express from 'express';
import multer from 'multer';
import { runValidation, generatePlan, generateRoadmap, chat, generateRecommendations, checkAiHealth, getChatSessions, getSingleSession, deleteSession } from '../controllers/aiController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/health', checkAiHealth);
router.post('/validate-idea', runValidation);
router.post('/generate-plan', generatePlan);
router.post('/generate-roadmap', generateRoadmap);
router.post('/generate-recommendations', generateRecommendations);
router.get('/chat/sessions', getChatSessions);
router.get('/chat/sessions/:id', getSingleSession);
router.delete('/chat/sessions/:id', deleteSession);
router.post('/chat', upload.single('file'), chat);

export default router;
