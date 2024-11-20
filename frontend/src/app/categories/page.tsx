import CategoryCard from '@/components/CategoryCard';

const categories = [
  { name: 'Writing & Content', toolCount: 20 },
  { name: 'Image Generation', toolCount: 20 },
  { name: 'Development', toolCount: 20 },
  { name: 'Business', toolCount: 20 },
  { name: 'Audio & Music', toolCount: 15 },
  { name: 'Video & Animation', toolCount: 18 },
  { name: 'Research & Analysis', toolCount: 12 },
  { name: 'Education & Learning', toolCount: 16 },
  { name: 'Productivity', toolCount: 25 },
  { name: 'Customer Service', toolCount: 10 },
  { name: 'Marketing', toolCount: 22 },
  { name: 'Design', toolCount: 19 }
];

export default function Categories() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Categories</h1>
          <p className="text-gray-600">Browse AI tools by category to find the perfect solution for your needs.</p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              toolCount={category.toolCount}
            />
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Suggest a Category</h2>
          <p className="text-gray-600 mb-4">
            Don't see a category that fits your needs? Let us know what you're looking for.
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Suggest Category →
          </button>
        </div>
      </div>
    </main>
  );
}