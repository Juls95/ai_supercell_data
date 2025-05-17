import React from 'react';
import { Search } from '../components/Search';
import { Results } from '../components/Results';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';
import { useAppContext } from '../context/AppContext';

export const SearchLayout: React.FC = () => {
  const { isLoading } = useAppContext();
  
  return (
    <div className="min-h-screen hero-pattern">
      <div className="min-h-screen glass-effect">
        <div className="container mx-auto px-4 py-8">
          <header className="flex flex-col items-center mb-12 pt-4 text-center">
            <Logo />
            <img 
              src="https://images.pexels.com/photos/7130561/pexels-photo-7130561.jpeg"
              alt="Clash of Clans Banner"
              className="mt-8 rounded-xl shadow-lg max-w-2xl w-full object-cover h-48"
            />
          </header>
          
          <main className="max-w-4xl mx-auto">
            <Search />
            
            <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
              <Results />
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};