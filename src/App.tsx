import React from 'react';
import { SearchLayout } from './layouts/SearchLayout';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <SearchLayout />
    </AppProvider>
  );
}

export default App;