// src/types/index.ts
export interface Tool {
    id: number;
    name: string;
    description: string;
    url: string;
    category_id: number;
    pricing_type: 'free' | 'paid' | 'freemium';
    status: string;
    average_rating: number;
    total_ratings: number;
    bookmark_count: number;
  }
  
  export interface Category {
    id: number;
    name: string;
    description: string;
    parent_id: number | null;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }