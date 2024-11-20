// src/app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTools, setLoading, setError } from '@/store/index';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import { toolsApi } from '@/utils/api';
import { Tool } from '@/types';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: tools, loading, error } = useAppSelector((state) => state.tools);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTools = async () => {
      try {
        dispatch(setLoading(true));
        const data = await toolsApi.getTools();
        dispatch(setTools(data));
      } catch (err) {
        dispatch(setError('Failed to fetch tools'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTools();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex min-h-screen flex-col items-center pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <h1 className="text-4xl font-bold mb-8">
          Discover AI Tools
        </h1>
        
        {/* Search Section */}
        <div className="mb-12">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search AI tools..."
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Featured Tools Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.id}
                id={tool.id}
                name={tool.name}
                description={tool.description}
                pricingType={tool.pricing_type}
                bookmarkCount={tool.bookmark_count}
                rating={tool.average_rating}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}