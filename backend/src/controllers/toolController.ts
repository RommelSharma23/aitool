import { Request, Response } from 'express';
import { query } from '../config/db';

export const getTools = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM AUT_tools WHERE status = $1', ['published']);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};