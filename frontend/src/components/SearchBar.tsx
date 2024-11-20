// src/components/SearchBar.tsx
interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }
  
  const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
    return (
      <div className="mb-12">
        <input 
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Search..."}
          className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
    );
  };
  
  export default SearchBar;