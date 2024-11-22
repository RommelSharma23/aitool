// src/app/tool/[id]/page.tsx
import React from 'react';
import { Share2, ArrowRight, Bookmark } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  pricing_type: 'free' | 'paid' | 'freemium';
  category_name: string;
}

async function getToolDetails(id: string): Promise<Tool> {
  try {
    const res = await fetch(`http://localhost:3001/api/tools/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Failed to fetch tool details:', error);
    throw error;
  }
}

const ToolDetail = async ({ params }: { params: { id: string } }) => {
  try {
    const tool = await getToolDetails(params.id);

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
              <div className="flex gap-3 mb-6">
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                  tool.pricing_type === 'free' ? 'bg-green-100 text-green-800' :
                  tool.pricing_type === 'paid' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {tool.pricing_type.charAt(0).toUpperCase() + tool.pricing_type.slice(1)}
                </span>
                <span className="px-4 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {tool.category_name}
                </span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <p className="text-lg text-gray-600 mb-8">{tool.description}</p>
          
          <Link 
            href={tool.url} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Visit Tool
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Alert variant="destructive">Failed to load tool details. Please try again later.</Alert>
      </div>
    );
  }
};

export default ToolDetail;