import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Clash of Clans strategies..."
          className="flex-1 px-4 py-2 rounded-lg bg-[#1E2A59] border border-[#3A4B80] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5793B] focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#F5793B] text-white rounded-lg hover:bg-[#F5793B]/90 focus:outline-none focus:ring-2 focus:ring-[#F5793B] focus:ring-offset-2 focus:ring-offset-[#0F172A] transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}; 