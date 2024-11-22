// backend/src/controllers/toolController.ts
import { RequestHandler } from 'express';
import { query } from '../config/db';

export const getTools: RequestHandler = async (_req, res, next) => {
  try {
    const result = await query('SELECT * FROM AUT_tools WHERE status = $1', ['published']);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getToolById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT t.*, c.name as category_name FROM AUT_tools t LEFT JOIN AUT_categories c ON t.category_id = c.id WHERE t.id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Tool not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const addTool: RequestHandler = async (req, res, next) => {
  try {
    const { name, description, url, category_id, pricing_type } = req.body;
    const result = await query(
      'INSERT INTO AUT_tools (name, description, url, category_id, pricing_type, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, url, category_id, pricing_type, 'published']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};