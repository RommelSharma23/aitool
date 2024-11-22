// backend/src/routes/categoryRoutes.ts
import express from 'express';
import { Category, Tool } from '../types';
import { getAllCategories, getCategoryById } from '../controllers/categoryController';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

export default router;