interface CategoryCardProps {
    name: string;
    toolCount: number;
    onClick?: () => void;
  }
  
  const CategoryCard = ({ name, toolCount, onClick }: CategoryCardProps) => {
    return (
      <div 
        onClick={onClick}
        className="p-6 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all"
      >
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{toolCount}+ tools</p>
      </div>
    );
  };
  
  export default CategoryCard;