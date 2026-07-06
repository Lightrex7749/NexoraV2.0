import express from 'express';
import { getStartups, getStartupById, updateStartup } from '../controllers/startupController.js';

const router = express.Router();

router.get('/', getStartups);
router.get('/:id', getStartupById);
router.put('/:id', updateStartup);

export default router;
