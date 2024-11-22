// src/app/admin/components/AddTool.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Category {
  id: number;
  name: string;
}

export default function AddTool() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category_id: '',
    pricing_type: 'free'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Sending data:', formData);
      const response = await fetch('http://localhost:3001/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add tool');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Tool added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        url: '',
        category_id: '',
        pricing_type: 'free'
      });
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Failed to add tool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Tool</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-2">URL</label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <select
            value={formData.category_id}
            onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Pricing Type</label>
          <select
            value={formData.pricing_type}
            onChange={(e) => setFormData({...formData, pricing_type: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="freemium">Freemium</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Adding...' : 'Add Tool'}
        </button>
      </form>
    </Card>
  );
}