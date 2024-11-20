// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const toolsApi = {
  getTools: async () => {
    const response = await api.get('/tools');
    return response.data;
  },
  getToolById: async (id: string) => {
    const response = await api.get(`/tools/${id}`);
    return response.data;
  },
  getComments: async (toolId: string) => {
    const response = await api.get(`/tools/${toolId}/comments`);
    return response.data;
  },
  addComment: async (toolId: string, content: string) => {
    const response = await api.post(`/tools/${toolId}/comments`, { content });
    return response.data;
  },
};

export const categoriesApi = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

export default api;