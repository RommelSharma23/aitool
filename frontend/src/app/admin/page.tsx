// src/app/admin/page.tsx
import AddTool from './components/AddTool';
import AddCategory from './components/AddCategory';

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Tool</h2>
          <AddTool />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Category</h2>
          <AddCategory />
        </div>
      </div>
    </div>
  );
}