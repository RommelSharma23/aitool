// backend/src/routes/toolRoutes.ts
import express from 'express';
import { getTools, getToolById, addTool } from '../controllers/toolController';

const router = express.Router();

router.get('/', getTools);
router.get('/:id', getToolById);
router.post('/', addTool);

export default router;