
// src/app/categories/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryCard from '@/components/CategoryCard';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Category {
  id: number;
  name: string;
  description: string;
  tool_count: number;
  subcategories?: Category[];
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/categories/${categoryId}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">AI Tool Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryCard
              name={category.name}
              toolCount={category.tool_count}
              onClick={() => handleCategoryClick(category.id)}
            />
            
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="mt-4 ml-4 space-y-2">
                {category.subcategories.map((sub) => (
                  <CategoryCard
                    key={sub.id}
                    name={sub.name}
                    toolCount={sub.tool_count}
                    onClick={() => handleCategoryClick(sub.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}