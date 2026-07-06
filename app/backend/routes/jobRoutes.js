import express from 'express';
import { getJobs, createJob, applyToJob } from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getJobs);
router.post('/', createJob);
router.post('/:jobId/apply', applyToJob);

export default router;
