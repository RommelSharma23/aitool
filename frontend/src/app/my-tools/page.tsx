'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

interface Tool {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  views: number;
  bookmarks: number;
}

export default function MyTools() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved'>('all');

  // Dummy data - will be replaced with API calls
  const [tools] = useState<Tool[]>([
    {
      id: '1',
      name: 'AI Writing Assistant',
      description: 'Advanced AI tool for content creation',
      status: 'approved',
      submittedDate: '2024-01-15',
      views: 245,
      bookmarks: 23
    },
    {
      id: '2',
      name: 'Image Generator Pro',
      description: 'Create stunning images with AI',
      status: 'pending',
      submittedDate: '2024-02-01',
      views: 0,
      bookmarks: 0
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  const filteredTools = tools.filter(tool => 
    activeTab === 'all' ? true : tool.status === activeTab
  );

  const getStatusBadgeClass = (status: Tool['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Tools</h1>
          <button
            onClick={() => router.push('/submit')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit New Tool
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['all', 'pending', 'approved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'all' | 'pending' | 'approved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tools List */}
        <div className="space-y-6">
          {filteredTools.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <p className="text-gray-500">No tools found</p>
            </div>
          ) : (
            filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white p-6 rounded-lg border hover:border-gray-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Submitted: {new Date(tool.submittedDate).toLocaleDateString()}</span>
                      <span>Views: {tool.views}</span>
                      <span>Bookmarks: {tool.bookmarks}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(tool.status)}`}>
                      {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                    </span>
                    
                    <button 
                      onClick={() => router.push(`/my-tools/edit/${tool.id}`)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}