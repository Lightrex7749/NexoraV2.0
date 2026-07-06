import express from 'express';
import { getDocuments, uploadDocument } from '../controllers/documentController.js';

const router = express.Router();

router.get('/', getDocuments);
router.post('/', uploadDocument);

export default router;
