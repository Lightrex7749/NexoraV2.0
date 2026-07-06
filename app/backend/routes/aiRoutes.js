import express from 'express';
import { runValidation } from '../controllers/aiController.js';

const router = express.Router();

router.post('/validate-idea', runValidation);

export default router;
