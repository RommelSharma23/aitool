// frontend/src/app/categories/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import ToolCard from '@/components/ToolCard';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Tool {
  id: number;
  name: string;
  description: string;
  pricing_type: 'free' | 'paid' | 'freemium';
  average_rating: number;
  bookmark_count: number;
}

interface CategoryDetail {
  id: number;
  name: string;
  description: string;
  tools: Tool[];
}

export default function CategoryDetail({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<CategoryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(`/api/categories/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch category');
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="mt-4 text-gray-600">{category.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {category.tools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <ToolCard
                id={tool.id}
                name={tool.name}
                description={tool.description}
                pricingType={tool.pricing_type}
                bookmarkCount={tool.bookmark_count}
                rating={tool.average_rating}
              />
            </div>
          </div>
        ))}
        {category.tools.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tools found in this category
          </div>
        )}
      </div>
    </div>
  );
}