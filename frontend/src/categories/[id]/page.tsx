// src/app/categories/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import ToolCard from '@/components/ToolCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Tool } from '@/types';

interface CategoryDetails {
  id: number;
  name: string;
  description: string;
  tools: Tool[];
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<CategoryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(`/api/categories/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch category details');
        const data = await response.json();
        setCategory(data);
      } catch (err) {
        setError('Failed to load category details');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!category) return <div>Category not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.tools.map((tool) => (
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
    </div>
  );
}