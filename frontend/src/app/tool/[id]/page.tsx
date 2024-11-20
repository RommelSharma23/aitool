// src/app/tool/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Tool } from '@/types';
import { toolsApi } from '@/utils/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import CommentSection from '@/components/CommentSection';

export default function ToolDetail() {
  const params = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        setLoading(true);
        const data = await toolsApi.getToolById(params.id as string);
        setTool(data);
      } catch (err) {
        console.error('Error fetching tool:', err);
        setError('Failed to fetch tool details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTool();
    }
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!tool) return <div className="text-center py-8">Tool not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tool Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
              <span className={`px-4 py-2 rounded-full text-sm ${
                tool.pricing_type === 'free' ? 'bg-green-100 text-green-800' :
                tool.pricing_type === 'paid' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {tool.pricing_type.charAt(0).toUpperCase() + tool.pricing_type.slice(1)}
              </span>
            </div>
            
            <p className="mt-4 text-gray-600">{tool.description}</p>
            
            {/* Tool Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-b border-gray-200 py-4">
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="mt-1 font-semibold flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  {typeof tool.average_rating === 'number' 
                    ? tool.average_rating.toFixed(1) 
                    : '0.0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Ratings</p>
                <p className="mt-1 font-semibold">{tool.total_ratings}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bookmarks</p>
                <p className="mt-1 font-semibold">{tool.bookmark_count}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex space-x-4">
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700 transition-colors"
              >
                Visit Website
              </a>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                  />
                </svg>
                <span className="ml-2">Bookmark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <CommentSection toolId={tool.id} />
        </div>
      </div>
    </div>
  );
}