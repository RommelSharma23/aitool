// src/components/ToolCard.tsx
'use client';
import { useRouter } from 'next/navigation';

interface ToolCardProps {
  id: number;  // Add this line
  name: string;
  description: string;
  pricingType: 'free' | 'paid' | 'freemium';
  bookmarkCount: number;
  rating: number | string | null;
}

const ToolCard = ({ id, name, description, pricingType, bookmarkCount, rating }: ToolCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tool/${id}`);
  };

  const getPricingTagStyle = (type: string) => {
    switch (type) {
      case 'free':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'freemium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatRating = (rating: number | string | null): string => {
    if (rating === null) return '0.0';
    const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    return Number.isNaN(numRating) ? '0.0' : numRating.toFixed(1);
  };

  return (
    <div 
      onClick={handleClick}
      className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all cursor-pointer hover:shadow-md"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${getPricingTagStyle(pricingType)}`}>
          {pricingType.charAt(0).toUpperCase() + pricingType.slice(1)}
        </span>
      </div>
      
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <span className="text-yellow-400">★</span>
          <span className="text-gray-600">{formatRating(rating)}</span>
        </div>
        
        <div className="flex items-center space-x-1">
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
          <span className="text-gray-600">{bookmarkCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;