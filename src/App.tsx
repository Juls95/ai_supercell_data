import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Results } from './components/Results';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ClinderImage } from './components/ClinderImage';
import { SearchResult } from './types';

function App() {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Header />
          <SearchBar onSearch={handleSearch} />
          <ClinderImage show={!results && !isLoading} />
          <div className="mt-8">
            <Results results={results} isLoading={isLoading} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;