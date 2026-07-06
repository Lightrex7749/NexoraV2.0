import express from 'express';
import { 
  getHealth, 
  createStatus, 
  getStatus, 
  subscribeNewsletter, 
  submitContact 
} from '../controllers/systemController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Nexora API — From Idea to Impact.", status: "ok" });
});

router.get('/health', getHealth);
router.post('/status', createStatus);
router.get('/status', getStatus);
router.post('/newsletter', subscribeNewsletter);
router.post('/contact', submitContact);

export default router;
