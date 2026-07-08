import express from 'express';
import multer from 'multer';
import { getJobs, createJob, applyToJob } from '../controllers/jobController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getJobs);
router.post('/', upload.single('file'), createJob);
router.post('/:jobId/apply', applyToJob);

export default router;
