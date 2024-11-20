import express from 'express';
import { getTools } from '../controllers/toolController';

const router = express.Router();

router.get('/', getTools);

export default router;