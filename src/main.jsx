import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GlobalStyles } from './GlobalStyles';

// 1. Імпорт для роутингу
import { BrowserRouter } from 'react-router-dom';

// 2. Імпорти для Redux
import { Provider } from 'react-redux';
import store from './redux/store'; // Перевір, чи файл store.js існує!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Обгортаємо ВСЕ в Provider, щоб працював Redux */}
    <Provider store={store}>
      
      {/* 4. Обгортаємо в BrowserRouter, щоб працювали Link і Route */}
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
      
    </Provider>
  </React.StrictMode>,
);