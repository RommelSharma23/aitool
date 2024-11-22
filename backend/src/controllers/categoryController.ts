// backend/src/controllers/categoryController.ts
import { Request, Response, NextFunction } from 'express';
import { query } from '../config/db';
import { Category, Tool } from '../types';

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await query(`
      WITH RECURSIVE category_tree AS (
        SELECT 
          c.*,
          (SELECT COUNT(*) FROM AUT_tools t WHERE t.category_id = c.id) as tool_count,
          0 as level
        FROM AUT_categories c
        WHERE parent_id IS NULL
        
        UNION ALL
        
        SELECT 
          c.*,
          (SELECT COUNT(*) FROM AUT_tools t WHERE t.category_id = c.id) as tool_count,
          ct.level + 1
        FROM AUT_categories c
        JOIN category_tree ct ON c.parent_id = ct.id
      )
      SELECT * FROM category_tree
      ORDER BY level, name;
    `);

    const categories = result.rows.reduce((acc: Category[], curr: Category) => {
      if (!curr.parent_id) {
        curr.subcategories = result.rows
          .filter(row => row.parent_id === curr.id)
          .map(sub => ({
            ...sub,
            subcategories: []
          }));
        acc.push(curr);
      }
      return acc;
    }, []);

    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const categoryResult = await query(
      'SELECT * FROM AUT_categories WHERE id = $1',
      [id]
    );

    if (categoryResult.rows.length === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    const toolsResult = await query(
      'SELECT * FROM AUT_tools WHERE category_id = $1 AND status = $2',
      [id, 'published']
    );

    const category = {
      ...categoryResult.rows[0],
      tools: toolsResult.rows
    };

    res.json(category);
  } catch (error) {
    next(error);
  }
};