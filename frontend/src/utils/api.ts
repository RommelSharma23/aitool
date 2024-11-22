// src/utils/api.ts
const BASE_URL = 'http://localhost:3001';

export const toolsApi = {
  async getTools() {
    try {
      const response = await fetch(`${BASE_URL}/api/tools`);
      if (!response.ok) throw new Error('Failed to fetch tools');
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch tools');
    }
  },
  
  async getTool(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/api/tools/${id}`);
      if (!response.ok) throw new Error('Failed to fetch tool');
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch tool');
    }
  }
};