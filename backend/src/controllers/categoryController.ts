// src/controllers/categoryController.ts
import { Request, Response } from 'express';
import { query } from '../config/db';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM AUT_categories ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};