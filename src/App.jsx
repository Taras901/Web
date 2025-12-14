import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Імпорти компонентів
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';

const App = () => {
  return (
    <>
      {/* Хедер буде видно на всіх сторінках */}
      <Header />
      
      {/* Тут змінюється контент залежно від адреси */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<ItemPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
};

export default App;