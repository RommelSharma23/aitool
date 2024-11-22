// backend/src/types/index.ts
export interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  category_id: number;
  subcategory_id: number | null;
  pricing_type: 'free' | 'paid' | 'freemium';
  status: string;
  average_rating: number | null;
  total_ratings: number;
  bookmark_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  parent_id: number | null;
  tool_count: number;
  level: number;
  subcategories?: Category[];
}

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  tools: Tool[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
  created_at: Date;
}